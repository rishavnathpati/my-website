import fs from 'fs';
import path from 'path';
import { globby } from 'globby';
import matter from 'gray-matter';

// Replace with your actual domain before deployment
const SITE_URL = 'https://yourdomain.com';

async function generateSitemap() {
  console.log('Generating sitemap...');

  const pagesDir = path.resolve(process.cwd(), 'src/app');
  const contentDir = path.resolve(process.cwd(), 'src/content');

  // 1. Get static pages from app router
  const pages = await globby([
    `${pagesDir}/**/page.tsx`,
    `!${pagesDir}/layout.tsx`,
    `!${pagesDir}/template.tsx`,
    `!${pagesDir}/not-found.tsx`,
    `!${pagesDir}/api/**`,
    `!${pagesDir}/**/\\[*\\]/**`,
  ]);

  const staticPageUrls = pages.map((page) => {
    const route = page
      .replace(pagesDir, '')
      .replace('/page.tsx', '')
      .replace(/^\/index$/, '/');
    return route === '' ? '/' : route;
  });

  // 2. Get dynamic portfolio pages
  const portfolioDir = path.join(pagesDir, 'portfolio/[slug]');
  const { portfolioItems } = await import('../src/lib/data/portfolio.js');
  const portfolioUrls = portfolioItems.map(item => `/portfolio/${item.slug}`);

  // 3. Get dynamic blog pages
  const blogPostsDir = path.join(contentDir, 'blogs');
  const blogFiles = await globby(`${blogPostsDir}/**/*.mdx`);
  const blogUrls = blogFiles.map((file) => {
    const slug = path.basename(file, path.extname(file));
    return `/blog/${slug}`;
  });

  // Combine all URLs
  const allUrls = [
    '/',
    ...staticPageUrls.filter(url => url !== '/'),
    ...portfolioUrls,
    ...blogUrls,
  ];
  const uniqueUrls = [...new Set(allUrls)];

  // Create sitemap XML content
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueUrls
  .map((url) => {
    const priority = url === '/' ? '1.0' : '0.8';
    const changefreq = url.startsWith('/blog/') ? 'weekly' : 'monthly';
    return `
  <url>
    <loc>${`${SITE_URL}${url}`}</loc>
    <priority>${priority}</priority>
    <changefreq>${changefreq}</changefreq>
  </url>`;
  })
  .join('')}
</urlset>`;

  // Write sitemap file to public directory
  const sitemapPath = path.join(process.cwd(), 'public/sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap);

  console.log(`Sitemap generated successfully at ${sitemapPath} with ${uniqueUrls.length} URLs.`);
}

generateSitemap().catch((error) => {
  console.error('Error generating sitemap:', error);
  process.exit(1);
}); 