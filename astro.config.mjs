import.meta.hot

export default {
  projectRoot: '.',     // Where to resolve all URLs relative to. Useful if you have a monorepo project.
  pages: './src/pages', // Path to Astro components, pages, and data
  dist: './dist',       // When running `astro build`, path to final static output
  public: './public',   // A folder of static files Astro will copy to the root. Useful for favicons, images, and other files that don’t need processing.
  buildOptions: {
    site: process.env.SITE_URL,           // Your public domain, e.g.: https://my-site.dev/. Used to generate sitemaps and canonical URLs.
    sitemap: true, // Generate sitemap (set to "false" to disable)
  },
  devOptions: {
    port: 8000,         // The port to run the dev server on.
    hostname: '0.0.0.0',
    tailwindConfig: './tailwind.config.js', // Path to tailwind.config.js if used, e.g. './tailwind.config.js'
  },
  renderers: ['@astrojs/renderer-preact'],
  plugins: [ '@snowpack/plugin-dotenv' ]
};
