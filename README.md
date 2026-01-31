# eas-site__astro-ssr: My Personal SSR Website

This is the repo for `eas-site__astro-ssr`, the server-side rendered (SSR) version of my personal website, built with [Astro](https://astro.build/). It connects to `eas-hcms` to fetch and display content dynamically on every request.

## 🚀 What This Project Is About

Unlike my static site, this project uses Server-Side Rendering to build pages on-demand. I'm exploring this approach for more dynamic features, like having blog posts appear instantly after I publish them in the CMS without needing to trigger a new build.

### Key Features I'm Experimenting With:
- **Server-Side Rendering (SSR)**: Pages are generated on the server for each request, so the content is always fresh.
- **Dynamic Content**: This is perfect for interactive applications, like a blog where I want posts to be live immediately.
- **Astro Powered**: I'm using Astro's SSR capabilities to build this.
- **Live Data Fetching**: It fetches content directly from `eas-hcms` whenever a user visits a page.
- **API Routes**: I can even create my own server endpoints right inside the Astro project.

## 🛠️ Tech Stack

-   **Astro**: The web framework I'm using, configured for SSR.
-   **Astro SSR Adapter**: (e.g., `@astrojs/node`, `@astrojs/vercel`) for running the server.
-   **TypeScript**: To keep my code clean and maintainable.
-   **Tailwind CSS**: My go-to for styling.
-   **Node.js**: The runtime environment for the server.

## ⚙️ Project Setup

Here’s how to get this project up and running locally.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/eas-site__astro-ssr.git
    cd eas-site__astro-ssr
    ```

2.  **Install dependencies:**
    I'm using `npm` for this project.
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root directory from `.env.example`. This will store the connection details for the `eas-hcms` backend.

    ```dotenv
    # URL of your Strapi backend
    STRAPI_API_URL="http://localhost:1337"

    # API Token for accessing Strapi
    STRAPI_API_TOKEN="your-api-token"
    ```
    You can get the `STRAPI_API_TOKEN` from the `eas-hcms` admin panel under `Settings > API Tokens`.

## 🧞 Project Commands

All commands are run from the root of the project, from a terminal:

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm run dev`     | Starts the local dev server at `localhost:4321`. |
| `npm run build`   | Builds the app for production to the `./dist/` directory. |
| `npm run preview` | Previews your production build locally. This command is useful for checking the final build before deploying. |
| `npm run start`   | This command is often configured to run the built server in a production-like environment. |


## 🚢 Deployment

Deploying an SSR app requires a hosting provider that can run a long-running Node.js process. This is different from static hosting. I'm looking at platforms like:
-   Vercel
-   Netlify
-   Heroku
-   DigitalOcean

I'll need to configure the hosting provider to run the `npm run start` command after the build. The Astro SSR adapter I choose will have specific instructions for this.

## 🤝 Contributing

This is a personal project, so I'm not actively looking for contributions. However, you're welcome to fork the repo and experiment with it. If you find a bug, feel free to open an issue!

## 📄 License

This project is licensed under the [MIT License](LICENSE).