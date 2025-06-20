import fs from 'fs';
import path from 'path';
import { globby } from 'globby';

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
  // Import portfolio data - handle both TypeScript and JavaScript environments
  let portfolioItems;
  try {
    // Try importing the TypeScript file first (works in local dev with Node.js experimental TS support)
    const portfolioModule = await import('../src/lib/data/portfolio.ts');
    portfolioItems = portfolioModule.portfolioItems;
  } catch (error) {
    // Fallback: Create a temporary JavaScript file for deployment environments
    console.log('TypeScript import failed, creating temporary JS file...');
    const portfolioFilePath = path.resolve(process.cwd(), 'src/lib/data/portfolio.ts');
    const portfolioFileContent = fs.readFileSync(portfolioFilePath, 'utf-8');

    // Convert TypeScript to JavaScript by removing type annotations and interfaces
    const jsContent = portfolioFileContent
      .replace(/export interface[\s\S]*?^}/gm, '') // Remove interface definitions
      .replace(/: PortfolioItem\[\]/g, '') // Remove type annotations
      .replace(/: string\[\]/g, '') // Remove array type annotations
      .replace(/: string/g, '') // Remove string type annotations
      .replace(/: 'Games' \| 'Machine Learning' \| 'Publications' \| 'Web'/g, '') // Remove union types
      .replace(/\?\s*:/g, ':') // Remove optional property markers
      .trim();

    // Write temporary JS file
    const tempJsPath = path.resolve(process.cwd(), 'temp-portfolio.mjs');
    fs.writeFileSync(tempJsPath, jsContent);

    try {
      // Import the temporary JS file
      const portfolioModule = await import(tempJsPath);
      portfolioItems = portfolioModule.portfolioItems;

      // Clean up temporary file
      fs.unlinkSync(tempJsPath);
    } catch (importError) {
      console.error('Failed to import temporary JS file:', importError);
      portfolioItems = [];

      // Clean up temporary file even on error
      try {
        fs.unlinkSync(tempJsPath);
      } catch (cleanupError) {
        // Ignore cleanup errors
      }
    }
  }

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