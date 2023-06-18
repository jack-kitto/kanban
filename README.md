# Kanban Web App

🚀 Welcome to the Kanban Web App!

This project is a kanban board application built using technologies such as TypeScript, [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), Clerk for authentication, and PlanetScale for the database. It utilizes the [T3 Stack](https://create.t3.gg/) with [Next.js](https://nextjs.org/), [Clerk](https://clerk.com/), [Prisma](https://www.prisma.io/), and [tRPC](https://trpc.io/).

## File Structure

The project's file structure is organized as follows:

```
📁 prisma             // Prisma database models and migrations
📁 src
  📁 components       // React components + Next.js layouts used throughout the app
  📁 pages            // Next.js pages for routing and rendering
    📁 api            // tRPC endpoints and API related files
  📁 server           // Backend code
  📁 styles           // Stylesheets and Tailwind CSS configuration
  📁 utils            // Utility functions and helpers
📄 next.config.js     // Next.js configuration file
📄 tsconfig.json      // TypeScript configuration file
📄 package.json       // Project dependencies and scripts
📄 .env               // Environment variables
```

## Getting Started

To get started with the Kanban Web App, follow these steps:

1. Clone the repository:

   ```sh
   git clone <repository-url>
   ```

2. Install dependencies:

   ```sh
   cd kanban-web-app
   npm install
   ```

3. Set up the environment variables:

   Create a `.env` file in the project root and add the required environment variables:

   ```sh
   NEXT_PUBLIC_CLERK_FRONTEND_API_URL=<clerk-frontend-api-url>
   DATABASE_URL=<database-url>
   CLERK_SECRET_KEY=<clerk-secret-key>
   ```

4. Run the development server:

   ```sh
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Deployment

The Kanban Web App can be deployed using various platforms. Refer to the deployment guides provided by the T3 Stack for detailed instructions on deploying to Vercel, Netlify, or Docker:

- [Vercel Deployment Guide](https://create.t3.gg/en/deployment/vercel)
- [Netlify Deployment Guide](https://create.t3.gg/en/deployment/netlify)
- [Docker Deployment Guide](https://create.t3.gg/en/deployment/docker)

## Learn More

To learn more about the T3 Stack and the technologies used in this project, check out the following resources:

- [T3 Stack Documentation](https://create.t3.gg/)
- [T3 Stack Learning Resources](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available)
- [Clerk Documentation](https://docs.clerk.dev/)
- [PlanetScale Documentation](https://docs.planetscale.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/getting-started/introduction)
- [Prisma Documentation](https://prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [tRPC Documentation](https://trpc.io/docs)

