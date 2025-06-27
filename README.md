# What's Different Here
I installed Tailwind and shadcn. That's it! It was simply *just* annoying enough that I never wanted to do it again. Original Guide Follows:

# RedwoodSDK Example: Better Auth with Drizzle

This example demonstrates how to create a full-stack application using [RedwoodSDK](https://rwsdk.com/), [better-auth](https://www.better-auth.com/), and [Drizzle ORM](https://orm.drizzle.team).

## What's Inside

- **RedwoodSDK**: A React framework for building server-side web apps on Cloudflare
- **Drizzle ORM**: Lightweight, type-safe SQL ORM with migrations
- **better-auth**: Simple, flexible authentication library

## Getting Started

Create your new project:

```shell
git clone https://github.com/mj-meyer/rwsdk-better-auth-drizzle
cd better-auth-drizzle
pnpm install
```

## Running the Dev Server

```shell
pnpm dev
```

The application will be available at the URL displayed in your terminal (typically `http://localhost:5173`).

## Application Routes

This example includes several key routes:

- **/** - The landing page with a link to the protected home page
- **/home** - A protected page that requires authentication (redirects to login if not authenticated)
- **/user/login** - The login page where users can authenticate

## Authentication Flow

This example includes a complete authentication system with:

- Email/password signup and login
- Session management
- Protected routes
- Logout functionality

## Database Configuration

### Local Development

The project uses Cloudflare D1 (SQLite) with Drizzle ORM. To set up your local development database:

1. Copy `.env.example` to `.env` and update with your Cloudflare credentials
2. Run migrations: `pnpm migrate:dev`

### Database Schema

The authentication schema is defined in `src/db/schema` and includes tables for:

- Users
- Sessions
- Accounts

### Making Schema Changes

When you need to update your database schema:

1. Modify the schema files in `src/db/schema`
2. Generate a new migration: `pnpm migrate:new`
3. Apply the migration: `pnpm migrate:dev`

## Deployment

To deploy your application to Cloudflare:

1. Update your `wrangler.jsonc` file with your Cloudflare details
2. Create a D1 database:

   ```shell
   npx wrangler d1 create my-auth-db
   ```

3. Copy the `database_id` to your `wrangler.jsonc` and `.env` files
4. Deploy:

   ```shell
   pnpm release
   ```

## Project Structure

```
├── src/
│   ├── app/              # UI components
│   │   ├── pages/        # Page components
│   │   ├── shared/       # Shared components
│   │   └── Document.tsx  # Root document
│   ├── db/               # Database configuration
│   │   ├── schema/       # Drizzle schema definitions
│   │   └── db.ts         # Database connection
│   ├── lib/              # Application logic
│   │   ├── auth.ts       # Server-side auth configuration
│   │   └── auth-client.ts # Client-side auth configuration
│   ├── client.tsx        # Client entry point
│   └── worker.tsx        # Server entry point
└── drizzle/              # Database migrations
```

## Key Features

- **Server-side Rendering**: Pages are rendered on the server for improved performance
- **React Server Components**: Used for static parts of the UI
- **Client Components**: Used for interactive elements (marked with "use client")
- **Authentication**: Complete user authentication system with better-auth
- **Type Safety**: Full TypeScript support throughout the application
- **Database ORM**: Drizzle provides a type-safe way to interact with the database
