const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://namemapet.com';

// Example static pages
const staticPages = [
  '/',
  '/about',
  '/contact',
];

// Example dynamic routes (replace this with actual data)
const dynamicRoutes = [
  { slug: 'post-1' },
  { slug: 'post-2' },
];



function getBlogSlugs() {
  const blogDir = path.join(__dirname, '../posts'); // Adjust the path to your blog directory
  const files = fs.readdirSync(blogDir);

  // Extract slugs by removing file extensions
  return files.map((file) => ({
    slug: file.replace(/\.md$/, ''), // Assuming markdown files like 'post-1.md'
  }));
}

const blogPosts = getBlogSlugs();

// Combine all URLs
const urls = [
  ...staticPages.map((page) => `${BASE_URL}${page}`),
  ...blogPosts.map((post) => `${BASE_URL}/blog/${post.slug}`), // Use /blog/[slug] structure];
];
// Generate XML structure
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `
  <url>
    <loc>${url}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  `
    )
    .join('')}
</urlset>
<!-- XML Sitemap generated by Name Ma Pet -->
`;

// Write sitemap.xml in the public directory
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(sitemapPath, sitemap);

console.log('Sitemap generated successfully!');