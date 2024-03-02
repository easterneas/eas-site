import preact from "@preact/preset-vite";
import { resolve } from "path";
import { UserConfig, defineConfig } from "vite";

import "dotenv/config";

const { API_URL, PUBLIC_BASE_PATH } = process.env;

const commandConfig: Record<"build" | "serve", UserConfig> = {
  build: {},
  serve: {},
};

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [preact()],
  build: {
    outDir: "build",
  },
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
  },
  base: API_URL ? `${API_URL}/${PUBLIC_BASE_PATH}/` : `/${PUBLIC_BASE_PATH}`,
  ...commandConfig[command],
}));
