/// <reference types="astro/client" />
/// <reference types="./src/env.d.ts" />

import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import { defineConfig, passthroughImageService } from "astro/config";
import yaml from "@rollup/plugin-yaml";
import cloudflare from "@astrojs/cloudflare";
import { loadEnv } from "vite";

import { resolve } from "node:path";

loadEnv(`${process.env.NODE_ENV}`, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare({
    imageService: "passthrough",
    platformProxy: {
      enabled: true
    }
  }),
  image: {
    service: passthroughImageService(),
  },
  compressHTML: false,
  // compressHTML: process.env.NODE_ENV === "production",
  // site: process.env.PUBLIC_SITE_URL,
  output: "server",
  vite: {
    plugins: [yaml()],
    ssr: {
      external: ["node:buffer", "rollup"],
    },
    build: {
      outDir: "dist",
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
});
