require('dotenv').config();
const express = require('express');
const path = require('path');
const cron = require('node-cron');
const fs = require('fs');

const contentGenerator = require('./content-generator');
const affiliateManager = require('./affiliate-manager');
const seoOptimizer = require('./seo-optimizer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));
app.use('/admin', express.static('admin'));

// Amazon Tech Affiliate Routes
const amazonTag = (process.env.AMAZON_ASSOCIATE_TAG || 'jarvistaps-20').trim();

function generateAmazonLink(productName) {
  const encoded = encodeURIComponent(productName);
  return `https://www.amazon.com/s?k=${encoded}&tag=${amazonTag}`;
}

// Gaming Laptops - using dynamic /go/:slug route

// Dynamic /go/:slug route for any other affiliate links
app.get('/go/:slug', (req, res) => {
  const slug = req.params.slug;
  const url = affiliateManager.getAffiliateLinkBySlug(slug);
  if (url) {
    affiliateManager.registerClick({ url, product: slug });
    res.redirect(url);
  } else {
    res.redirect('/');
  }
});

// Articles/Blog for SEO
app.get('/articles', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'articles.html'));
});

app.get('/articles/:slug', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'article.html'));
});

// API Routes
app.get('/api/articles', (req, res) => {
  const { category } = req.query;
  let articles = loadArticles();
  if (category) {
    articles = articles.filter(a => a.category === category);
  }
  res.json(articles);
});

app.get('/api/articles/:slug', (req, res) => {
  const { slug } = req.params;
  const filePath = path.join(__dirname, 'data', `${slug}.json`);
  if (fs.existsSync(filePath)) {
    const article = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.json(article);
  } else {
    res.status(404).json({ error: 'Article not found' });
  }
});

app.get('/api/categories', (req, res) => {
  res.json(contentGenerator.getCategories());
});

app.get('/api/products', (req, res) => {
  res.json(affiliateManager.getAllProducts());
});

app.get('/api/products/:category', (req, res) => {
  const { category } = req.params;
  const products = affiliateManager.getProductByCategory(category);
  res.json(products);
});

app.get('/api/products/featured', (req, res) => {
  res.json(affiliateManager.getFeaturedProducts());
});

app.get('/api/affiliate/stats', (req, res) => {
  const stats = affiliateManager.getStats();
  res.json(stats);
});

app.post('/api/generate', async (req, res) => {
  try {
    const { category, keywords, count } = req.body;
    const article = await contentGenerator.generateArticle(category, keywords);
    res.json({ success: true, article });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/optimize', async (req, res) => {
  try {
    await seoOptimizer.generateSitemap();
    await seoOptimizer.generateRobotsTxt();
    res.json({ success: true, message: 'SEO optimization complete' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/stats', (req, res) => {
  const articles = loadArticles();
  const affiliateStats = affiliateManager.getStats();
  res.json({
    totalArticles: articles.length,
    totalEarnings: affiliateStats.totalEarnings,
    pendingPayouts: affiliateStats.pendingPayouts,
    conversionRate: affiliateStats.conversionRate,
    topPerformers: affiliateStats.topPerformers,
    byCategory: affiliateStats.byCategory
  });
});

app.post('/api/admin/trigger-generate', async (req, res) => {
  try {
    const { category, count } = req.body;
    let articles;
    if (category) {
      articles = await contentGenerator.generateForCategory(category, count || 5);
    } else {
      articles = await contentGenerator.runNightlyJob();
    }
    res.json({ success: true, generated: articles.length, articles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cron job endpoints for Vercel
app.get('/api/cron/generate', async (req, res) => {
  try {
    console.log('Cron job: Starting content generation');
    const articles = await contentGenerator.runNightlyJob();
    await seoOptimizer.generateSitemap();
    console.log(`Cron job: Generated ${articles.length} articles`);
    res.json({ success: true, generated: articles.length });
  } catch (error) {
    console.error('Cron generation failed:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/cron/optimize', async (req, res) => {
  try {
    console.log('Cron job: Starting SEO optimization');
    await Promise.all([
      seoOptimizer.generateSitemap(),
      seoOptimizer.generateRobotsTxt()
    ]);
    console.log('Cron job: SEO optimization complete');
    res.json({ success: true, message: 'SEO optimization complete' });
  } catch (error) {
    console.error('Cron optimization failed:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'index.html'));
});

function loadArticles() {
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) return [];
  
  const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
  const articles = [];
  
  for (const file of files) {
    try {
      const article = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));
      articles.push(article);
    } catch (e) {}
  }
  
  return articles.sort((a, b) => new Date(b.date) - new Date(a.date));
}

cron.schedule('0 2 * * *', async () => {
  console.log('Running nightly AI content generation...');
  await contentGenerator.runNightlyJob();
});

cron.schedule('0 3 * * *', async () => {
  console.log('Running SEO optimization...');
  await seoOptimizer.generateSitemap();
});

app.listen(PORT, () => {
  console.log(`AI Tools Hub running on http://localhost:${PORT}`);
  console.log('Nightly jobs scheduled at 2 AM and 3 AM');
  console.log('Focus: AI Tools Reviews & Comparisons');
});
