# Lofi Bits - Personal Website

A clean, static website built with Next.js that includes sections for About, Blog, Photo Albums, and more.

## Features

- Static site generation for fast loading and easy hosting
- Markdown blog with frontmatter support
- Photo albums with captions
- Responsive design with Tailwind CSS
- Easy to extend with new sections

## Getting Started

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Adding Content

### Blog Posts

Add new markdown files to the `content/posts` directory with the following frontmatter:

```markdown
---
title: "Your Post Title"
date: "YYYY-MM-DD"
excerpt: "A brief description of your post"
tags: ["tag1", "tag2"]
---

Your markdown content here...
```

### Photo Albums

Add new JSON files to the `content/albums` directory with the following structure:

```json
{
  "title": "Album Title",
  "description": "Album description",
  "coverImage": "/images/photos/album-name/cover.jpg",
  "photos": [
    {
      "src": "/images/photos/album-name/photo1.jpg",
      "caption": "Photo caption"
    }
  ]
}
```

Place your images in the `public/images/photos/album-name/` directory.

## Deployment

This site is configured for easy deployment to GitHub Pages using GitHub Actions.

1. Push your changes to the main branch
2. GitHub Actions will automatically build and deploy your site
3. Your site will be available at https://yourusername.github.io/repo-name/

## Customization

- Edit `components/Navbar.js` to update navigation links
- Edit `components/Footer.js` to update footer content
- Modify styles in `styles/globals.css`
