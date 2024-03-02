/// <reference types="astro/client" />
/// <reference types="./src/env.d.ts" />

import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import { AstroUserConfig, defineConfig } from "astro/config";

import { resolve } from "path";

const config: AstroUserConfig = {
  compressHTML: process.env.NODE_ENV === "production",
  output: "hybrid",
  vite: {
    build: {
      outDir: "build",
    },
    resolve: {
      alias: [
        {
          find: "@",
          replacement: resolve("./src"),
        },
      ],
    },
  },
  integrations: [
    preact({ compat: true }),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx({
      syntaxHighlight: "shiki",
      shikiConfig: { theme: "dracula" },
      gfm: false,
    }),
  ],
  redirects: {
    "/blog": "/blog/1",
  },
  adapter: cloudflare({
    runtime: {
      mode: "local",
      type: "pages"
    }
  })
};

if (process.env.NODE_ENV === "production") {
  config.site = "https://eas.web.id";
}

// https://astro.build/config
export default defineConfig(config);
