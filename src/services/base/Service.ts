import { ServiceError } from "./ServiceError";

// Define our own types to replace Axios types
type Method = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface RequestConfig {
  headers?: Record<string, string>;
  timeout?: number;
  params?: Record<string, unknown>;
  responseType?: string;
  signal?: AbortSignal;
  body?: any;
  method?: string;
}

export interface ResponseData<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: RequestConfig;
}

export class Service {
  url: string;
  token: string | undefined = process.env.API_TOKEN;
  config: RequestConfig;
  abortController: AbortController;

  constructor(url: string) {
    this.url = url;
    this.abortController = new AbortController();
    this.config = {
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      timeout: 60000,
      signal: this.abortController.signal,
    };
  }

  initialize() {
    if (!this.config || !this.url) {
      throw this.handleError(new Error("Failed to initialize service."));
    }
  }

  handleError(error: Response | Error | unknown) {
    const serviceError = new ServiceError(
      -1,
      "Sorry, it looks like there is a network issue."
    );

    if (error instanceof Response) {
      serviceError.code = error.status || serviceError.code;
      return serviceError;
    }

    if (error instanceof Error) {
      serviceError.message = error.message;
      return serviceError;
    }

    return serviceError;
  }

  async parseResponse(response: Response): Promise<ResponseData> {
    let data;
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else if (this.config.responseType === 'arraybuffer') {
      data = await response.arrayBuffer();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const error = new Error(data.message || response.statusText) as any;
      error.response = { status: response.status, data };
      throw error;
    }

    const headers: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    return {
      data,
      status: response.status,
      statusText: response.statusText,
      headers,
      config: this.config
    };
  }

  buildUrl(url: string, params?: Record<string, unknown>): string {
    if (!params) return url;

    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });

    const queryString = searchParams.toString();
    return queryString ? `${url}?${queryString}` : url;
  }

  async fetchWithTimeout(url: string, options: RequestConfig = {}): Promise<Response> {
    const { timeout, ...fetchOptions } = options;

    if (!timeout) {
      return fetch(url, fetchOptions as RequestInit);
    }

    const controller = new AbortController();
    const signal = controller.signal;

    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal
      } as RequestInit);
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  async download(
    method: Method,
    param: Record<string, unknown>,
    additionalConfig?: RequestConfig,
  ) {
    this.config = {
      ...this.config,
      ...additionalConfig,
      timeout: undefined, // Infinity equivalent
    };

    switch (method.toLowerCase()) {
      case "get":
        return this.get(param);
      case "post":
        return this.post(param);
      default:
        throw new Error(
          "Invalid method is used. You should use get or post method only."
        );
    }
  }

  async get(param: Record<string, unknown>) {
    this.initialize();

    if (!this.token) {
      throw this.handleError(new Error("No token provided. Exiting."));
    }

    try {
      const url = this.buildUrl(this.url, param);
      const response = await this.fetchWithTimeout(url, {
        method: 'GET',
        headers: this.config.headers,
        signal: this.config.signal,
        timeout: this.config.timeout
      });

      return this.parseResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getFile(opts: RequestConfig = { responseType: "arraybuffer" }) {
    this.initialize();

    if (!this.token) {
      throw this.handleError(new Error("No token provided. Exiting."));
    }

    this.config = {
      ...this.config,
      ...opts,
    };

    try {
      const response = await this.fetchWithTimeout(this.url, {
        method: 'GET',
        headers: this.config.headers,
        signal: this.config.signal,
        timeout: this.config.timeout
      });

      return this.parseResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getWithoutToken(param: Record<string, unknown>) {
    this.config.headers = {
      ...this.config.headers,
      Accept: "application/json;odata=nometadata",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    };

    try {
      const url = this.buildUrl(this.url, param);
      const response = await this.fetchWithTimeout(url, {
        method: 'GET',
        headers: this.config.headers,
        signal: this.config.signal,
        timeout: this.config.timeout
      });

      return this.parseResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async post(
    param: FormData | Record<string, unknown>,
    additionalConfig: RequestConfig = {},
  ) {
    this.initialize();

    if (!this.token) {
      throw this.handleError(new Error("No token provided. Exiting."));
    }

    this.config = {
      ...this.config,
      ...additionalConfig,
      headers: {
        ...this.config.headers,
        ...(additionalConfig.headers || {}),
      },
    };

    try {
      const body = param instanceof FormData
        ? param
        : JSON.stringify(param);

      const response = await this.fetchWithTimeout(this.url, {
        method: 'POST',
        headers: this.config.headers,
        body,
        signal: this.config.signal,
        timeout: this.config.timeout
      });

      return this.parseResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async postWithoutToken(param: Record<string, unknown>) {
    this.initialize();

    try {
      const response = await this.fetchWithTimeout(this.url, {
        method: 'POST',
        headers: this.config.headers,
        body: JSON.stringify(param),
        signal: this.config.signal,
        timeout: this.config.timeout
      });

      return this.parseResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async put(param: Record<string, unknown>) {
    this.initialize();

    if (!this.token) {
      throw this.handleError(new Error("No token provided. Exiting."));
    }

    try {
      const response = await this.fetchWithTimeout(this.url, {
        method: 'PUT',
        headers: this.config.headers,
        body: JSON.stringify(param),
        signal: this.config.signal,
        timeout: this.config.timeout
      });

      return this.parseResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async patch<T>(payload: T) {
    this.initialize();

    if (!this.token) {
      throw this.handleError(new Error("No token provided. Exiting."));
    }

    try {
      const response = await this.fetchWithTimeout(this.url, {
        method: 'PATCH',
        headers: this.config.headers,
        body: JSON.stringify(payload),
        signal: this.config.signal,
        timeout: this.config.timeout
      });

      return this.parseResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete() {
    this.initialize();

    if (!this.token) {
      throw this.handleError(new Error("No token provided. Exiting."));
    }

    try {
      const response = await this.fetchWithTimeout(this.url, {
        method: 'DELETE',
        headers: this.config.headers,
        signal: this.config.signal,
        timeout: this.config.timeout
      });

      return this.parseResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }
}
