# Personal Website Development Guide with Aider

This guide will help you efficiently work with Aider on your personal website project by listing which files you need to add to the context for different types of tasks.

## Table of Contents

1. [Navigation and Layout Changes](#navigation-and-layout-changes)
2. [Blog Functionality](#blog-functionality)
3. [Photo Albums](#photo-albums)
4. [Art Section](#art-section)
5. [Styling and Theming](#styling-and-theming)
6. [Search Functionality](#search-functionality)
7. [Admin Features](#admin-features)
8. [Common Tasks](#common-tasks)

## Navigation and Layout Changes

For changes to the site's navigation, header, or overall layout:

```
components/Navbar.js
components/Layout.js
components/Footer.js
```

## Blog Functionality

For blog-related changes:

```
pages/blog/index.js
pages/blog/[id].js
lib/posts.js
content/posts/[any-relevant-post].md
```

## Photo Albums

For photo album features:

```
pages/photos/index.js
pages/photos/[id].js
components/PhotoViewer.js
lib/photos.js
content/albums/[relevant-album].json
```

## Art Section

For art section modifications:

```
pages/art/index.js
pages/art/music.js
pages/art/illustration.js
pages/art/objects.js
components/ArtNavigation.js
lib/art.js
content/art/[category]/items.json
```

## Styling and Theming

For styling changes:

```
tailwind.config.js
styles/globals.css
```

## Search Functionality

For search feature modifications:

```
components/SearchBar.js
pages/search.js
lib/search.js
lib/generate-search-content.js
```

## Admin Features

For admin dashboard changes (development only):

```
pages/admin/index.js
pages/admin/blog.js
pages/admin/photos.js
pages/admin/art.js
lib/admin-utils.js
```

## Common Tasks

### Adding Social Media Icons

Required files:
```
components/Navbar.js
```

### Modifying Photo Display

Required files:
```
components/PhotoViewer.js
pages/photos/[id].js
```

### Adding New Content Types

Required files:
```
lib/[content-type].js
pages/[content-type]/index.js
pages/[content-type]/[id].js
```

### Updating Site Metadata

Required files:
```
components/Layout.js
next.config.js
```

### Modifying Build Process

Required files:
```
next.config.js
package.json
```

## Tips for Efficient Context Management

1. **Start minimal**: Begin with only the core files needed for your task
2. **Add incrementally**: If Aider needs more context, add files one by one
3. **Use patterns**: For similar tasks, refer to this guide for the typical file set
4. **Remember dependencies**: Some components depend on others (e.g., Layout includes Navbar)
5. **Config files matter**: For styling or build issues, include configuration files

## Example Workflows

### Example 1: Adding a new social media icon

Add to context:
```
components/Navbar.js
```

### Example 2: Creating a new blog post template

Add to context:
```
pages/blog/[id].js
lib/posts.js
content/posts/example-post.md
```

### Example 3: Modifying photo album layout

Add to context:
```
pages/photos/index.js
pages/photos/[id].js
components/PhotoViewer.js
```

By following this guide, you'll minimize the number of files needed in the Aider context while ensuring all necessary dependencies are available for your tasks.
