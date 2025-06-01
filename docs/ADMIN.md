# Admin Dashboard Documentation

## Overview

The admin dashboard is a development-only interface that allows content creation and management without deploying to production. It provides a user-friendly way to create blog posts and manage photo albums.

## Architecture

The admin functionality is split into two main components:

### 1. Client-side Admin Pages (`/pages/admin/`)

These React components provide the user interface for the admin dashboard:

- **`/admin`**: Main dashboard with links to all admin sections
- **`/admin/blog`**: Interface for creating blog posts
- **`/admin/photos`**: Interface for creating and editing photo albums
- **`/admin/art`**: Information about art categories
- **`/admin/test`**: Test page for verifying environment configuration

### 2. Server-side API Routes (`/pages/api/admin/`)

These Next.js API routes handle server-side operations:

- **`/api/admin/create-post`**: Creates new blog posts
- **`/api/admin/create-album`**: Creates or updates photo albums
- **`/api/admin/get-albums`**: Retrieves all photo albums
- **`/api/admin/get-album`**: Retrieves a specific photo album by ID

## How It Works

1. The client-side admin pages provide forms and UI for content creation
2. When a user submits a form, the client-side code makes a request to the appropriate API route
3. The API route performs server-side operations (like creating files) and returns a response
4. The client-side code updates the UI based on the response

This separation is necessary because:
- Browser JavaScript cannot directly access the file system for security reasons
- Next.js API routes run on the server and have access to Node.js modules like `fs` and `path`

## Development-Only Access

The admin interface is only available in development mode:

- Each admin page checks `process.env.NODE_ENV === 'development'` and redirects to the home page if not in development
- API routes also check for development mode and return a 403 error if accessed in production
- The `next.config.js` configuration ensures admin pages are excluded from production builds

## Content Creation

### Blog Posts

The blog post creation interface allows you to:
- Set a title, which automatically generates a URL slug
- Write content in Markdown format
- Add an excerpt and tags
- Preview the post before creation

### Photo Albums

The photo album management interface allows you to:
- Create new albums with title, description, and photos
- Edit existing albums to add or remove photos
- Set image paths and captions for each photo

## File Structure

Content is saved to the following locations:

- Blog posts: `content/posts/[slug].md`
- Photo albums: `content/albums/[slug].json`
- Photos: `public/images/photos/[album-slug]/[photo-name]`

## Search Content Generation

After creating or updating content, the system automatically regenerates the search index to include the new content, making it immediately searchable on the site.
