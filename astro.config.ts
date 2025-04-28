/// <reference types="astro/client" />
/// <reference types="./src/env.d.ts" />

import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import { type AstroUserConfig } from "astro";
import { defineConfig } from "astro/config";
import yaml from "@rollup/plugin-yaml";
import cloudflare from "@astrojs/cloudflare";

import { resolve } from "path";

const config: AstroUserConfig = {
  adapter: cloudflare({
    imageService: "passthrough",
  }),
  compressHTML: process.env.NODE_ENV === "production",
  site: process.env.PUBLIC_SITE_URL,
  output: "server",
  vite: {
    plugins: [yaml()],
    ssr: {
      external: ["node:buffer"],
    },
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
};

// https://astro.build/config
export default defineConfig(config);
