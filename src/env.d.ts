/// <reference types="astro/client" />

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