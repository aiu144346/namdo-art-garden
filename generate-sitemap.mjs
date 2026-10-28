import fs from 'fs';
import path from 'path';
import POST_DATA from './src/data/postsData.js';
import { GARDENS_MASTER } from './src/data/gardensData.js';

const DOMAIN = 'https://namdoartgarden.com';
const TODAY = new Date().toISOString().split('T')[0];

const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/gardens', priority: '0.9', changefreq: 'weekly' },
  { url: '/posts', priority: '0.9', changefreq: 'daily' },
  { url: '/region/mokpo', priority: '0.8', changefreq: 'weekly' },
  { url: '/region/shinan', priority: '0.8', changefreq: 'weekly' },
  { url: '/region/haenam', priority: '0.8', changefreq: 'weekly' },
  { url: '/region/jindo', priority: '0.8', changefreq: 'weekly' },
  { url: '/region/wando', priority: '0.8', changefreq: 'weekly' },
  { url: '/about-us', priority: '0.9', changefreq: 'weekly' },
  { url: '/artists', priority: '0.7', changefreq: 'monthly' },
  { url: '/events', priority: '0.8', changefreq: 'weekly' },
  { url: '/news', priority: '0.8', changefreq: 'weekly' },
  { url: '/shop', priority: '0.6', changefreq: 'monthly' },
];

const gardenPages = Object.keys(GARDENS_MASTER).map((id) => ({
  url: `/gardens/${id}`,
  priority: '0.9',
  changefreq: 'weekly'
}));

const postPages = Object.entries(POST_DATA).map(([id, post]) => {
  let lastmod = TODAY;
  if (post.date) {
    const cleaned = post.date.replace(/[\.\s]+/g, '-').replace(/-$/, '');
    if (/^\d{4}-\d{2}-\d{2}$/.test(cleaned)) {
      lastmod = cleaned;
    }
  }
  return {
    url: `/posts/${id}`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod
  };
});

const allUrls = [...staticPages, ...gardenPages, ...postPages];

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

for (const item of allUrls) {
  xml += `  <url>\n`;
  xml += `    <loc>${DOMAIN}${item.url}</loc>\n`;
  xml += `    <lastmod>${item.lastmod || TODAY}</lastmod>\n`;
  xml += `    <changefreq>${item.changefreq || 'weekly'}</changefreq>\n`;
  xml += `    <priority>${item.priority || '0.8'}</priority>\n`;
  xml += `  </url>\n`;
}

xml += `</urlset>\n`;

const targetPath = path.resolve('public/sitemap.xml');
fs.writeFileSync(targetPath, xml, 'utf-8');

console.log(`Generated sitemap.xml with ${allUrls.length} URLs at ${targetPath}`);
