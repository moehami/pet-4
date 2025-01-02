const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://namemapet.com';

export async function generateSitemap() {
  // Example static pages
  const staticPages = [
    '/',
    '/about',
    '/contact',
  ];

  // Example dynamic routes (replace with actual data fetch)
  const dynamicRoutes = [
    { slug: 'post-1' },
    { slug: 'post-2' },
  ];

  const urls = [
    ...staticPages.map((page) => `${BASE_URL}${page}`),
    ...dynamicRoutes.map((route) => `${BASE_URL}/blog/${route.slug}`),
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
  `;

  return sitemap;
}
