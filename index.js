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
const amazonTag = process.env.AMAZON_ASSOCIATE_TAG || 'jarvistaps-20';

function generateAmazonLink(asin) {
  return `https://www.amazon.com/dp/${asin}?tag=${amazonTag}&linkCode=ogi&th=1&psc=1`;
}

// Gaming Laptops
app.get('/go/asus-rog-strix-scar-18', (req, res) => {
  const url = generateAmazonLink('B0CRDZZLYZ');
  affiliateManager.registerClick({ url, product: 'ASUS ROG Strix SCAR 18', category: 'gaming-laptops' });
  res.redirect(url);
});

app.get('/go/alienware-m18-r2', (req, res) => {
  const url = generateAmazonLink('B0CQYMJYDF');
  affiliateManager.registerClick({ url, product: 'Alienware m18 R2', category: 'gaming-laptops' });
  res.redirect(url);
});

app.get('/go/msi-titan-gt77', (req, res) => {
  const url = generateAmazonLink('B0BTKQ8X6H');
  affiliateManager.registerClick({ url, product: 'MSI Titan GT77 HX', category: 'gaming-laptops' });
  res.redirect(url);
});

app.get('/go/razer-blade-18', (req, res) => {
  const url = generateAmazonLink('B0CSCZXP2J');
  affiliateManager.registerClick({ url, product: 'Razer Blade 18', category: 'gaming-laptops' });
  res.redirect(url);
});

// Gaming Monitors
app.get('/go/samsung-odyssey-oled-g9', (req, res) => {
  const url = generateAmazonLink('B0CXY3Y5Z6');
  affiliateManager.registerClick({ url, product: 'Samsung Odyssey OLED G9', category: 'gaming-monitors' });
  res.redirect(url);
});

app.get('/go/asus-rog-swift-pg32ucdm', (req, res) => {
  const url = generateAmazonLink('B0CWQXJ9QZ');
  affiliateManager.registerClick({ url, product: 'ASUS ROG Swift PG32UCDM', category: 'gaming-monitors' });
  res.redirect(url);
});

app.get('/go/lg-ultragear-oled-45', (req, res) => {
  const url = generateAmazonLink('B0D1NGKWN7');
  affiliateManager.registerClick({ url, product: 'LG UltraGear 45GS95QE', category: 'gaming-monitors' });
  res.redirect(url);
});

app.get('/go/lg-32gs95ue-oled', (req, res) => {
  const url = generateAmazonLink('B0D5MJXCXM');
  affiliateManager.registerClick({ url, product: 'LG 32GS95UE OLED', category: 'gaming-monitors' });
  res.redirect(url);
});

// Mechanical Keyboards
app.get('/go/keychron-q1-pro', (req, res) => {
  const url = generateAmazonLink('B0BWBGRFB3');
  affiliateManager.registerClick({ url, product: 'Keychron Q1 Pro', category: 'mechanical-keyboards' });
  res.redirect(url);
});

app.get('/go/wooting-60he', (req, res) => {
  const url = generateAmazonLink('B0CQMJXCXN');
  affiliateManager.registerClick({ url, product: 'Wooting 60HE', category: 'mechanical-keyboards' });
  res.redirect(url);
});

app.get('/go/nuphy-air75-v2', (req, res) => {
  const url = generateAmazonLink('B0CQ3Y1L7M');
  affiliateManager.registerClick({ url, product: 'NuPhy Air75 V2', category: 'mechanical-keyboards' });
  res.redirect(url);
});

app.get('/go/asus-rog-azoth', (req, res) => {
  const url = generateAmazonLink('B0BHJF2VH3');
  affiliateManager.registerClick({ url, product: 'ASUS ROG Azoth', category: 'mechanical-keyboards' });
  res.redirect(url);
});

// Gaming Mice
app.get('/go/razer-viper-v3-pro', (req, res) => {
  const url = generateAmazonLink('B0CW3FH91N');
  affiliateManager.registerClick({ url, product: 'Razer Viper V3 Pro', category: 'gaming-mice' });
  res.redirect(url);
});

app.get('/go/logitech-g-pro-superlight-2', (req, res) => {
  const url = generateAmazonLink('B07W6JKFCZ');
  affiliateManager.registerClick({ url, product: 'Logitech G Pro X Superlight 2', category: 'gaming-mice' });
  res.redirect(url);
});

app.get('/go/asus-rog-harpe-ace', (req, res) => {
  const url = generateAmazonLink('B0BHFKJ8V2');
  affiliateManager.registerClick({ url, product: 'ASUS ROG Harpe Ace', category: 'gaming-mice' });
  res.redirect(url);
});

// Gaming Headsets
app.get('/go/steelseries-arctis-nova-pro', (req, res) => {
  const url = generateAmazonLink('B09ZWL5F6T');
  affiliateManager.registerClick({ url, product: 'SteelSeries Arctis Nova Pro', category: 'gaming-headsets' });
  res.redirect(url);
});

app.get('/go/audeze-maxwell', (req, res) => {
  const url = generateAmazonLink('B0BQYCHFMX');
  affiliateManager.registerClick({ url, product: 'Audeze Maxwell', category: 'gaming-headsets' });
  res.redirect(url);
});

app.get('/go/sony-inzone-h9', (req, res) => {
  const url = generateAmazonLink('B0B1HJ7HHQ');
  affiliateManager.registerClick({ url, product: 'Sony INZONE H9', category: 'gaming-headsets' });
  res.redirect(url);
});

// SSD Storage
app.get('/go/samsung-990-pro-4tb', (req, res) => {
  const url = generateAmazonLink('B0BHJF2VH4');
  affiliateManager.registerClick({ url, product: 'Samsung 990 Pro 4TB', category: 'storage-ssd' });
  res.redirect(url);
});

app.get('/go/wd-black-sn850x-4tb', (req, res) => {
  const url = generateAmazonLink('B0B7CK2MKR');
  affiliateManager.registerClick({ url, product: 'WD Black SN850X 4TB', category: 'storage-ssd' });
  res.redirect(url);
});

app.get('/go/crucial-t700-4tb', (req, res) => {
  const url = generateAmazonLink('B0C5MJ7V8P');
  affiliateManager.registerClick({ url, product: 'Crucial T700 4TB', category: 'storage-ssd' });
  res.redirect(url);
});

// CPUs
app.get('/go/amd-ryzen-9-9950x3d', (req, res) => {
  const url = generateAmazonLink('B0D1NVR5VG');
  affiliateManager.registerClick({ url, product: 'AMD Ryzen 9 9950X3D', category: 'cpus-processors' });
  res.redirect(url);
});

app.get('/go/intel-core-ultra-9-285k', (req, res) => {
  const url = generateAmazonLink('B0DKMYHF23');
  affiliateManager.registerClick({ url, product: 'Intel Core Ultra 9 285K', category: 'cpus-processors' });
  res.redirect(url);
});

app.get('/go/amd-ryzen-7-9800x3d', (req, res) => {
  const url = generateAmazonLink('B0DKMGSF9T');
  affiliateManager.registerClick({ url, product: 'AMD Ryzen 7 9800X3D', category: 'cpus-processors' });
  res.redirect(url);
});

// GPUs
app.get('/go/nvidia-rtx-4090', (req, res) => {
  const url = generateAmazonLink('B0BHJF2VH5');
  affiliateManager.registerClick({ url, product: 'NVIDIA RTX 4090', category: 'gpus-graphics' });
  res.redirect(url);
});

app.get('/go/amd-rx-7900-xtx', (req, res) => {
  const url = generateAmazonLink('B0BHJF2VH6');
  affiliateManager.registerClick({ url, product: 'AMD RX 7900 XTX', category: 'gpus-graphics' });
  res.redirect(url);
});

app.get('/go/nvidia-rtx-4080-super', (req, res) => {
  const url = generateAmazonLink('B0BHJF2VH7');
  affiliateManager.registerClick({ url, product: 'NVIDIA RTX 4080 Super', category: 'gpus-graphics' });
  res.redirect(url);
});

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

// API Routes
app.get('/api/articles', (req, res) => {
  const { category } = req.query;
  let articles = loadArticles();
  if (category) {
    articles = articles.filter(a => a.category === category);
  }
  res.json(articles);
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
