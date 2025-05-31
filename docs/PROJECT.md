# Lofi Bits - Personal Website Documentation

This document provides a comprehensive overview of the personal website project, including its structure, technologies used, and instructions for maintaining and extending the site.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Content Management](#content-management)
5. [Styling and Theming](#styling-and-theming)
6. [Deployment](#deployment)
7. [Extending the Website](#extending-the-website)

## Project Overview

This personal website is designed to be a clean, sober, and professional representation of your online presence. It features:

- An About section for personal information
- A Blog section with markdown support
- A Photos section with album organization
- Social media links
- Dark mode design with red accents

The site is built as a static website, making it fast, secure, and easy to host on platforms like GitHub Pages.

## Technology Stack

### Core Framework: Next.js

Next.js was chosen for this project for several key reasons:

- **Static Site Generation (SSG)**: Generates HTML at build time for optimal performance
- **File-based routing**: Simplifies navigation structure
- **React-based**: Leverages component-based architecture for maintainability
- **Built-in optimization**: Image optimization, code splitting, and more
- **Easy deployment**: Works well with GitHub Pages and other hosting services

### Styling: Tailwind CSS

Tailwind CSS provides:

- Utility-first approach for consistent styling
- Responsive design capabilities out of the box
- Dark mode support
- Typography plugin for rich text formatting
- Easy customization through the configuration file

### Content Management

The site uses a file-based content management approach:

- **Blog posts**: Markdown files with frontmatter (using gray-matter)
- **Photo albums**: JSON configuration files
- **Images**: Stored in the public directory

This approach eliminates the need for a database while maintaining flexibility.

## Project Structure

```
├── .github/workflows/    # GitHub Actions for deployment
├── components/           # Reusable React components
│   ├── Footer.js         # Site footer
│   ├── Layout.js         # Main layout wrapper
│   └── Navbar.js         # Navigation bar
├── content/              # Content files
│   ├── albums/           # Photo album JSON files
│   └── posts/            # Blog post markdown files
├── docs/                 # Documentation
├── lib/                  # Utility functions
│   ├── photos.js         # Photo album processing
│   └── posts.js          # Blog post processing
├── pages/                # Next.js pages (routes)
│   ├── _app.js           # Custom App component
│   ├── about.js          # About page
│   ├── blog/             # Blog pages
│   ├── index.js          # Home page (redirects to About)
│   └── photos/           # Photo album pages
├── public/               # Static assets
│   └── images/           # Image files
│       └── photos/       # Photo album images
├── styles/               # CSS files
│   └── globals.css       # Global styles and Tailwind imports
├── next.config.js        # Next.js configuration
├── package.json          # Dependencies and scripts
├── postcss.config.js     # PostCSS configuration
└── tailwind.config.js    # Tailwind CSS configuration
```

## Content Management

### Adding Blog Posts

Blog posts are stored as markdown files in the `content/posts` directory. To add a new blog post:

1. Create a new markdown file in the `content/posts` directory
2. Name the file with a unique identifier (e.g., `my-new-post.md`)
3. Add frontmatter at the top of the file with the following format:

```markdown
---
title: "Your Post Title"
date: "YYYY-MM-DD"
excerpt: "A brief description of your post"
tags: ["tag1", "tag2"]
---

Your markdown content here...
```

4. Write your content using markdown syntax
5. Save the file and rebuild the site

Example blog post structure:

```markdown
---
title: "Getting Started with Next.js"
date: "2024-05-30"
excerpt: "Learn how to build a website with Next.js"
tags: ["nextjs", "react", "tutorial"]
---

# Getting Started with Next.js

Next.js is a powerful framework for building React applications...

## Installation

First, create a new Next.js app:

```bash
npx create-next-app my-app
```

...and so on
```

### Adding Photo Albums

Photo albums are configured using JSON files in the `content/albums` directory. To add a new album:

1. Add your photos to a new directory in `public/images/photos/[album-name]/`
2. Create a new JSON file in the `content/albums` directory (e.g., `my-album.json`)
3. Configure the album with the following structure:

```json
{
  "title": "Album Title",
  "description": "Description of the album",
  "coverImage": "/images/photos/[album-name]/cover.jpg",
  "photos": [
    {
      "src": "/images/photos/[album-name]/photo1.jpg",
      "caption": "Caption for photo 1"
    },
    {
      "src": "/images/photos/[album-name]/photo2.jpg",
      "caption": "Caption for photo 2"
    }
  ]
}
```

4. Save the file and rebuild the site

Important notes about photos:
- Use optimized images (compress them before adding)
- Recommended image dimensions: 1200×800 pixels for consistency
- Use descriptive captions to enhance the viewing experience
- The `coverImage` will be displayed on the albums index page

### Managing Art Collections

The Art section is organized into categories (Music, Objects, Illustration, etc.), each with its own collection of items.

#### Adding Items to Existing Art Categories

To add items to an existing art category:

1. Navigate to the appropriate JSON file in `content/art/[category]/items.json`
2. Add a new item to the JSON array with the following structure:

```json
{
  "title": "Item Title",
  "artist": "Creator Name",  // or "creator" depending on the category
  "year": "Year Created",
  "description": "A detailed description of the item",
  "link": "https://link-to-more-information.com"
}
```

3. Save the file and rebuild the site

#### Creating a New Art Category

To add a completely new category to the Art section:

1. Create a new directory in `content/art/` with your category name (use lowercase and hyphens for spaces)
2. Create an `items.json` file in this new directory with an array of items
3. Create a new page in `pages/art/[your-category].js` using the existing category pages as templates
4. Update the `artSections` array in `pages/art/index.js` to include your new category

Example of adding a "Photography" category:

1. Create directory: `content/art/photography/`
2. Create file: `content/art/photography/items.json` with your items
3. Create file: `pages/art/photography.js` based on other category pages
4. Update `pages/art/index.js` to include the new category in the grid

```javascript
// In pages/art/index.js
const artSections = [
  // ... existing categories
  { 
    title: 'Photography', 
    path: '/art/photography',
    description: 'Remarkable photographs that tell powerful stories.',
    icon: '📷'
  }
];
```

The Art section is designed to be easily extendable with new categories following this pattern.

## Styling and Theming

The website uses a dark theme with red accents. The main color scheme is defined in `tailwind.config.js`:

- Primary color: Red (#EF4444)
- Accent color: Orange (#F97316)
- Background: Dark gray (#111827)

To modify the theme:

1. Edit the color definitions in `tailwind.config.js`
2. Adjust the prose styling in the typography section
3. Update any specific color classes in `styles/globals.css`

## Deployment

The website is configured for deployment to GitHub Pages using GitHub Actions:

1. Push changes to the main branch
2. GitHub Actions automatically builds the site
3. The built site is deployed to the gh-pages branch
4. The site is available at `https://yourusername.github.io/repo-name/`

For custom domains:
1. Add your domain in the GitHub repository settings
2. Create a CNAME file in the `public` directory with your domain name
3. Configure your DNS settings as per GitHub's instructions

## Extending the Website

### Adding New Sections

To add a new section to the website:

1. Create a new page in the `pages` directory
2. Add the route to the navigation in `components/Navbar.js`
3. Implement the page content using existing components and styles

### Adding New Features

The modular nature of Next.js and React makes it easy to extend the website:

- Add new React components in the `components` directory
- Create new utility functions in the `lib` directory
- Install additional packages as needed with `npm install`

### Performance Optimization

The static generation approach already provides excellent performance, but you can further optimize:

- Use responsive images with appropriate sizes
- Minimize JavaScript with production builds
- Utilize Next.js's built-in performance features

---

This documentation should help you maintain and extend your personal website. For more detailed information about the technologies used, refer to their official documentation:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Markdown](https://github.com/remarkjs/react-markdown)
