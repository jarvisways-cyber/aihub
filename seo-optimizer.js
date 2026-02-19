const fs = require('fs');
const path = require('path');

class SEOOptimizer {
  constructor() {
    this.siteUrl = process.env.SITE_URL || 'http://localhost:3000';
    this.siteName = process.env.SITE_NAME || 'AI Affiliate Hub';
  }

  generateMetaTags(article) {
    return {
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt,
      canonical: `${this.siteUrl}/${article.slug}`,
      og: {
        title: article.title,
        description: article.excerpt,
        image: article.featuredImage,
        type: 'article',
        url: `${this.siteUrl}/${article.slug}`
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.excerpt,
        image: article.featuredImage
      }
    };
  }

  tagsToHTML(meta) {
    let html = '';
    html += `<title>${meta.title}</title>\n`;
    html += `<meta name="description" content="${meta.description}">\n`;
    html += `<link rel="canonical" href="${meta.canonical}">\n`;
    html += `<meta property="og:title" content="${meta.og?.title || meta.title}">\n`;
    html += `<meta property="og:description" content="${meta.og?.description || meta.description}">\n`;
    html += `<meta property="og:image" content="${meta.og?.image || ''}">\n`;
    html += `<meta property="og:type" content="${meta.og?.type || 'website'}">\n`;
    html += `<meta name="twitter:card" content="${meta.twitter?.card || 'summary'}">\n`;
    html += `<meta name="twitter:title" content="${meta.twitter?.title || meta.title}">\n`;
    html += `<meta name="twitter:description" content="${meta.twitter?.description || meta.description}">\n`;
    return html;
  }

  generateSchemaOrg(article) {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.excerpt,
      image: article.featuredImage,
      datePublished: article.date,
      author: {
        '@type': 'Person',
        name: article.author
      },
      publisher: {
        '@type': 'Organization',
        name: this.siteName,
        logo: {
          '@type': 'ImageObject',
          url: `${this.siteUrl}/assets/logo.png`
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${this.siteUrl}/${article.slug}`
      },
      articleSection: article.niche,
      keywords: article.keywords.join(', ')
    };

    return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
  }

  async generateSitemap() {
    const dataDir = path.join(__dirname, 'data');
    let urls = [];
    
    // Static pages
    const staticPages = [
      { url: '/', priority: '1.0', changefreq: 'daily' },
      { url: '/about', priority: '0.7', changefreq: 'weekly' },
      { url: '/contact', priority: '0.5', changefreq: 'monthly' },
      { url: '/privacy', priority: '0.3', changefreq: 'monthly' }
    ];
    
    // Dynamic article pages
    if (fs.existsSync(dataDir)) {
      const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
      
      for (const file of files) {
        try {
          const article = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));
          urls.push({
            url: `/${article.slug}`,
            priority: '0.8',
            changefreq: 'weekly',
            lastmod: article.date
          });
        } catch (e) {}
      }
    }
    
    // Category pages
    const categories = ['ai-tech', 'crypto', 'productivity', 'home-garden'];
    for (const cat of categories) {
      urls.push({
        url: `/category/${cat}`,
        priority: '0.6',
        changefreq: 'daily'
      });
    }
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${this.siteUrl}${u.url}</loc>
    <priority>${u.priority}</priority>
    <changefreq>${u.changefreq}</changefreq>
    ${u.lastmod ? `<lastmod>${u.lastmod.split('T')[0]}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`;
    
    const publicDir = path.join(__dirname, 'public');
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
    console.log('Sitemap generated');
    
    return sitemap;
  }

  generateRobotsTxt() {
    const robots = `User-agent: *
Allow: /

Sitemap: ${this.siteUrl}/sitemap.xml

Disallow: /admin/
Disallow: /api/
Disallow: /go/
Disallow: /data/
`;
    
    const publicDir = path.join(__dirname, 'public');
    fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);
    console.log('Robots.txt generated');
    
    return robots;
  }

  async updateInternalLinks() {
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) return;
    
    const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
    const articles = [];
    
    // Load all articles
    for (const file of files) {
      try {
        articles.push(JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8')));
      } catch (e) {}
    }
    
    // Simple internal linking strategy
    for (const article of articles) {
      let content = article.content;
      
      // Add related article links
      const related = articles
        .filter(a => a.id !== article.id)
        .filter(a => a.niche === article.niche)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      
      if (related.length > 0) {
        const relatedHtml = `\n<h2>Related Articles</h2>\n<ul>\n${
          related.map(r => `  <li><a href="/${r.slug}">${r.title}</a></li>`).join('\n')
        }\n</ul>`;
        
        content += relatedHtml;
        article.content = content;
        
        fs.writeFileSync(path.join(dataDir, `${article.slug}-${article.id.substring(0, 8)}.json`), 
          JSON.stringify(article, null, 2));
      }
    }
    
    console.log('Internal links updated');
  }
}

module.exports = new SEOOptimizer();
