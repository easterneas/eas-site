import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV || "development", process.cwd(), '');

export const { PUBLIC_API_URL, PUBLIC_SITE_URL, PUBLIC_SITE_NAME } = env
