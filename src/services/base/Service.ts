import type { AxiosRequestConfig, Method } from "axios";
import axios, { AxiosError } from "axios";

import { ServiceError } from "./ServiceError";

const { CancelToken } = axios;
const source = CancelToken.source();

export class Service {
  url: string;
  token: string = import.meta.env.API_TOKEN;
  config: AxiosRequestConfig;

  constructor(url: string, token?: string) {
    this.url = url;
    this.token = token || import.meta.env.API_TOKEN;
    this.config = {
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      timeout: 60000,
      cancelToken: source.token,
    };
  }

  initialize() {
    if (!this.config || !this.url) {
      throw this.handleError(new Error("Failed to initialize service."));
    }
  }

  handleError(
    error:
      | AxiosError<{ statusCode: number; message: string }>
      | Error
      | unknown,
  ) {
    const serviceError = new ServiceError(
      -1,
      "Sorry, it looks like there is a network issue.",
    );

    if (error instanceof AxiosError) {
      serviceError.code = error.response?.status || serviceError.code;

      if (error?.response?.data) {
        serviceError.message = error.response.data.message;
      }

      return serviceError;
    }

    if (error instanceof Error) {
      serviceError.message = error.message;
      return serviceError;
    }

    if (!(error instanceof AxiosError)) {
      return serviceError;
    }
  }

  async download(
    method: Method,
    param: Record<string, unknown>,
    additionalConfig?: AxiosRequestConfig,
  ) {
    this.config = {
      ...this.config,
      ...additionalConfig,
      timeout: Infinity,
    };

    switch (method.toLowerCase()) {
      case "get":
        return this.get(param);
      case "post":
        return this.post(param);
      default:
        throw new Error(
          "Invalid method is used. You should use get or post method only.",
        );
    }
  }

  async get(param: Record<string, unknown>) {
    this.initialize();

    if (!this.token) {
      throw this.handleError(new Error("No token provided. Exiting."));
    }

    if (param) this.config.params = param;

    try {
      return await axios.get(this.url, this.config);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getFile(opts: AxiosRequestConfig = { responseType: "arraybuffer" }) {
    this.initialize();

    if (!this.token) {
      throw this.handleError(new Error("No token provided. Exiting."));
    }

    this.config = {
      ...this.config,
      ...opts,
    };

    return axios.get(this.url, this.config).catch((e) => {
      throw this.handleError(e);
    });
  }

  async getWithoutToken(param: Record<string, unknown>) {
    this.config.headers = {
      ...this.config.headers,
      Accept: "application/json;odata=nometadata",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    };

    if (param) {
      this.config.params = param;
    }

    try {
      return await axios.get(this.url, this.config);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async post(
    param: FormData | Record<string, unknown>,
    additionalConfig: AxiosRequestConfig = {},
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
        ...additionalConfig.headers,
      },
    };

    try {
      return await axios.post(this.url, param, this.config);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async postWithoutToken(param: Record<string, unknown>) {
    this.initialize();

    try {
      return await axios.post(this.url, param, this.config);
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
      return await axios.put(this.url, param, this.config);
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
      return await axios.patch(this.url, payload, this.config);
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
      return await axios.delete(this.url, this.config);
    } catch (error) {
      throw this.handleError(error);
    }
  }
}
