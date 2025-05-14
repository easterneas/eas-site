/// <reference types="astro/client" />

// Add this declaration for process.env
declare namespace NodeJS {
  interface ProcessEnv {
    readonly PUBLIC_API_URL: string;
    readonly PUBLIC_SITE_URL: string;
    readonly PUBLIC_SITE_NAME: string;

    // ? server-only readable env
    readonly API_TOKEN: string;
    readonly NODE_ENV: 'development' | 'production' | 'test';
  }
}

interface ImportMetaEnv {
  readonly PUBLIC_API_URL: string;
  readonly PUBLIC_SITE_URL: string;
  readonly PUBLIC_SITE_NAME: string;

  // ? server-only readable env
  readonly API_TOKEN: string;
}

export interface ImportMeta {
  readonly env: ClientImportMetaEnv & ServerImportMetaEnv;
}
