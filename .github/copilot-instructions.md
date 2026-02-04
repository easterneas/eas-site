# Copilot Instructions for eas-site__astro-ssr

## RACE Framework

### Role

You are an expert full-stack developer with deep expertise in modern web technologies. Your primary focus is on building high-quality, maintainable, and performant web applications using the Astro framework with Server-Side Rendering (SSR). You have extensive experience with TypeScript, Preact, Tailwind CSS, and Strapi CMS integration.

You are working on personal SSR website that serves as a portfolio, blog, and contact platform. The project connects to an external `eas-hcms` (Strapi-based) backend to fetch and display content dynamically on every request.

### Action

When working with this codebase, follow these guidelines:

1. **Component Architecture**:
   - Use `.astro` files for page components, layouts, and components that primarily render HTML with minimal interactivity
   - Use `.tsx` files for components that require complex state management, hooks, or heavy interactivity
   - Follow the existing pattern: Astro components in `src/components/` and Preact components in `src/preact/components/`

2. **Styling**:
   - Use Tailwind CSS utility classes for styling
   - Use the `cn()` utility function from `@/lib/utils` for conditional class names
   - Leverage `twMerge` from `tailwind-merge` for merging Tailwind classes
   - Use SCSS for component-specific styles when needed (scoped with `lang="scss"`)

3. **Data Fetching**:
   - Use the established service layer in `src/services/` for API interactions
   - Use `fetchApi` from `@/lib/strapi` for direct Strapi API calls
   - Always handle errors gracefully with try-catch blocks
   - Use the established store pattern in `src/store/` for data collection management

4. **TypeScript**:
   - Leverage TypeScript for type safety throughout the codebase
   - Use the existing type definitions in `types/` directory
   - Follow the naming conventions: `Post`, `Portfolio`, `Contact` for entities
   - Use `StrapiImageData` for image handling and `getImageUrlBySize` for responsive images

5. **Navigation & Routing**:
   - Use Astro's built-in routing system with file-based routing
   - Use `ClientRouter` for page transitions when appropriate
   - Follow the existing navigation structure in `src/components/layout/Navigator.astro`
   - Use the `MENU_ITEMS` constant from `@/constants/base` for navigation links

6. **Environment Variables**:
   - Use `PUBLIC_*` prefix for client-side accessible variables
   - Use `astro:env/client` for client-side environment variables
   - Use `astro:env/server` for server-side environment variables (like API tokens)

7. **Code Quality**:
   - Follow the Biome linting and formatting rules defined in `biome.json`
   - Use 2-space indentation (as configured in Biome)
   - Import and organize imports automatically using Biome
   - Avoid `any` types; use strict typing instead

8. **Performance Considerations**:
   - Use `client:load` for components that need to hydrate immediately
   - Use `client:idle` for components that can wait for idle time
   - Consider code splitting and lazy loading for large components
   - Use `transition:persist` for components that should persist across page changes

### Context

This project uses a specific architecture pattern:

**Directory Structure**:
```
src/
├── api/              # API routes (if any)
├── astro/            # Astro-specific configurations
├── components/       # Astro components (.astro files)
├── constants/        # Application constants and environment variables
├── interfaces/       # TypeScript interfaces
├── layouts/          # Page layouts
├── lib/              # Utility functions
├── pages/            # Page components (Astro routing)
├── preact/           # Preact components (.tsx files)
├── services/         # API service layer
├── store/            # Data collection management
└── utils/            # Helper functions
```

**Key Patterns**:
- **Service Layer**: Centralized API communication in `src/services/`
- **Store Pattern**: Data collection management in `src/store/`
- **Component Patterns**: Astro components for pages/layouts, Preact for interactive components
- **Styling**: Tailwind CSS with custom utilities (`cn()`, `twMerge()`)
- **TypeScript**: Strict typing with custom types in `types/` directory

**Technology Stack**:
- **Framework**: Astro 5.16.15 with SSR adapter for Cloudflare Pages
- **UI Library**: Preact (with React compatibility layer)
- **Styling**: Tailwind CSS 3.0.24 with custom theme
- **API**: Strapi CMS via REST API
- **Build Tools**: Vite, Biome for linting/formatting
- **Deployment**: Cloudflare Pages

**Current State**:
- Blog system with dynamic content fetching
- Portfolio showcase with modal details
- Contact form integration
- Custom logo component with SVG
- Syntax highlighting with highlight.js
- Page transitions with CSS animations

### Example

**Example 1: Creating a New Blog Post Page**

```typescript
// src/pages/blog/[slug].astro
---
import Base from "@/layouts/Base.astro";
import PostContent from "@/components/blog/PostContent.astro";
import { getPostBySlug } from "@/store";

const { slug } = Astro.params;
const post = await getPostBySlug(slug);

if (!post) {
  Astro.response.status = 404;
}
---

<Base meta={{ title: post?.title || "Post Not Found", excerpt: post?.excerpt || "" }}>
  {post ? <PostContent post={post} /> : <p>Post not found</p>}
</Base>
```

**Example 2: Creating a New Preact Component**

```tsx
// src/preact/components/cards/ServiceCard.tsx
import { cn } from "@/lib/utils";
import type { FunctionalComponent } from "preact";
import Icon from "../Icon";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: keyof typeof icons;
  className?: string;
}

const ServiceCard: FunctionalComponent<ServiceCardProps> = ({
  title,
  description,
  icon,
  className,
}) => {
  return (
    <div class={cn("border-[1px] p-6 rounded-[8px]", className)}>
      <div class="mb-4">
        <Icon name={icon} size={32} />
      </div>
      <h3 class="text-xl font-[600] mb-2">{title}</h3>
      <p class="text-gray-400">{description}</p>
    </div>
  );
};

export default ServiceCard;
```

**Example 3: Adding a New API Service**

```typescript
// src/services/projectService.ts
import type { ResponseData } from "./base/Service";
import serviceUrls from ".";
import { Service } from "./base/Service";
import type { StrapiResponse } from "types/base/StrapiResponse";

export const projectService = {
  getAll: async (): Promise<ResponseData<StrapiResponse<Project[]>>> => {
    return new Service(
      serviceUrls.dynamicPath("projects?sort[0]=createdAt:desc"),
    ).get({});
  },

  getBySlug: async (
    slug: string,
  ): Promise<ResponseData<StrapiResponse<Project>>> => {
    return new Service(serviceUrls.dynamicPath(`projects/${slug}`)).get({});
  },
};
```

**Example 4: Using the Store Pattern**

```typescript
// src/store/projects.ts
import { projectService } from "../services/projectService";

export async function getCollection() {
  try {
    const collections = await projectService.getAll();
    return collections;
  } catch (e) {
    console.error(e);
  }
}

export async function getProjects() {
  const response = await projectService.getAll();
  if (!response) return null;
  return response.data;
}

export async function getProjectBySlug(slug?: string) {
  if (!slug) return;
  const response = await projectService.getBySlug(slug);
  if (!response) return null;
  return response.data;
}
```

**Example 5: Syntax Highlighting in Markdown**

```typescript
// src/lib/hilite.ts (already exists)
import hilite from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import shell from 'highlight.js/lib/languages/shell';
import typescript from 'highlight.js/lib/languages/typescript';

hilite.registerLanguage('javascript', javascript);
hilite.registerLanguage('typescript', typescript);
hilite.registerLanguage('shell', shell);

export default hilite;
```

**Example 6: Environment Variable Usage**

```typescript
// src/constants/env.ts (already exists)
import {
  PUBLIC_API_URL,
  PUBLIC_SITE_NAME,
  PUBLIC_SITE_URL
} from "astro:env/client";

export {
  PUBLIC_API_URL,
  PUBLIC_SITE_NAME,
  PUBLIC_SITE_URL
};
```

**Example 7: Responsive Image Handling**

```typescript
// In a component
import { getImageUrlBySize } from "@/lib/strapi";

const PortfolioCard = ({ portfolio }) => {
  const src = portfolio.avatar?.data
    ? `${import.meta.env.PUBLIC_API_URL}${getImageUrlBySize(
        portfolio.avatar,
        "small",
      )}`
    : "";
  
  return <img src={src} alt={portfolio.name} />;
};
```

**Example 8: Page Transitions**

```astro
<!-- In Base.astro layout -->
<ClientRouter fallback="animate" />

<style is:global>
  /* Page transition animations */
  html.page-transitioning #main-content { opacity: 0; }
  html.page-transitioning.forward #main-content { transform: translateX(60px); }
  html.page-transitioning.back #main-content { transform: translateX(-60px); }
  html:not(.page-transitioning) #main-content { opacity: 1; transform: translateX(0); }
</style>
```

**Example 9: Conditional Styling with cn()**

```tsx
const Component = ({ isActive, className }) => {
  return (
    <div class={cn(
      "p-4 rounded-[8px]",
      isActive && "bg-[#fc0] text-black",
      className
    )}>
      Content
    </div>
  );
};
```

**Example 10: Error Handling in Data Fetching**

```typescript
// In a page component
let posts: Post[] = [];
try {
  const response = await store.posts.getLatestPosts();
  if (response) {
    posts = response.data;
  }
} catch (e) {
  console.error("Failed to fetch posts:", e);
  // Optionally show fallback UI
}
```

---

## Quick Reference

| Task | Pattern |
|------|---------|
| Create a new page | Add `.astro` file to `src/pages/` |
| Create interactive component | Add `.tsx` file to `src/preact/components/` |
| Fetch data from Strapi | Use service in `src/services/` or `fetchApi` |
| Style component | Use Tailwind classes + `cn()` utility |
| Handle images | Use `getImageUrlBySize()` from `@/lib/strapi` |
| Add new environment variable | Add to `src/constants/env.ts` with `PUBLIC_*` prefix |
| Add new type | Add to `types/` directory with `.d.ts` extension |
| Add new utility function | Add to `src/lib/` or `src/utils/` |

## Important Notes

1. **SSR First**: This is a Server-Side Rendering application. Pages are generated on-demand for each request.
2. **Strapi Integration**: All dynamic content comes from an external Strapi CMS. Always use the established service layer.
3. **Component Types**: Use `.astro` for page components and layouts; use `.tsx` for interactive components with state.
4. **Type Safety**: Maintain strict TypeScript typing throughout. Use existing types as references.
5. **Performance**: Consider hydration strategies (`client:load`, `client:idle`) for optimal performance.
6. **Consistency**: Follow existing patterns and conventions. When in doubt, look at similar components in the codebase.
7. **Error Handling**: Always handle potential errors in data fetching and API calls gracefully.

---

*Last updated based on the current codebase structure and patterns.*
