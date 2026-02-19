# Tech Gateway - High-End Gaming & PC Hardware Reviews

Premium Amazon affiliate site focused on high-end gaming laptops, OLED monitors, mechanical keyboards, enthusiast PC components, and gaming peripherals.

## 🎯 Site Focus

**Niche:** High-End Computer Tech & Gaming Hardware
**Revenue Model:** Amazon Associates (2-3% commission on electronics)
**Target Audience:** PC enthusiasts, gamers, content creators, tech professionals

### Product Categories
1. **Gaming Laptops** ($2,500-4,500) - RTX 4090/4080, Mini LED displays
2. **Gaming Monitors** ($1,000-1,700) - OLED, 240Hz, Ultrawide
3. **Mechanical Keyboards** ($100-250) - Custom, Hall Effect, 75%
4. **Gaming Mice** ($100-200) - Ultra-lightweight, 8KHz wireless
5. **Gaming Audio** ($250-350) - Planar magnetic, ANC, Hi-Res
6. **SSD Storage** ($300-600) - PCIe 5.0, 4TB NVMe
7. **CPUs** ($450-700) - Ryzen 9950X3D, Core Ultra 9
8. **GPUs** ($800-1,600) - RTX 4090, RX 7900 XTX

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd affiliate-site
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Required:
- `OPENAI_API_KEY` - For content generation (optional, demo mode works)
- `AMAZON_ASSOCIATE_TAG` - Your Amazon Associates ID (default: jarvistaps-20)

### 3. Run Development Server
```bash
npm start
```
Server runs at `http://localhost:3000`

### 4. Deploy to Vercel
```bash
npm run deploy
```

## 📁 Project Structure

```
affiliate-site/
├── index.js              # Main Express server & API
├── content-generator.js  # AI article generation (tech focused)
├── affiliate-manager.js  # Amazon product catalog & tracking
├── nightly-jobs.js       # Cron jobs for content generation
├── seo-optimizer.js      # Sitemap, SEO tools
├── package.json
├── .env
├── vercel.json           # Vercel deployment config
├── public/
│   ├── index.html        # Main tech gateway site
│   ├── assets/           # JARVIS emblem, images
│   └── robots.txt
├── admin/
│   └── index.html        # Admin dashboard
└── data/                 # Generated articles (JSON)
```

## 🔧 Core Features

### Content Generation
- AI-powered tech reviews using GPT-4
- "Best [Product] Under $X" buying guides (high-converting format)
- Amazon product data integration (ASINs, prices, specs)
- Auto-generated comparison tables
- SEO-optimized titles and meta descriptions

### Amazon Integration
- **Affiliate Tag:** jarvistaps-20
- **Product Catalog:** 30+ high-end tech products with real ASINs
- **Commission Rates:** 2-3% on electronics (avg $500 order = $12-15)
- **Link Tracking:** Click analytics by product/category
- **Featured Products:** Hand-picked premium items with specs

### Automated Scheduling (Vercel Cron)
- **2 AM Daily:** Generate 2-3 new tech review articles
- **3 AM Daily:** Regenerate sitemap, update internal links
- **Every 6 hours:** Check content freshness

### Tech Categories Covered
- Gaming Laptops (ASUS ROG, Alienware, Razer, MSI)
- OLED/QD-OLED Monitors (Samsung, LG, ASUS)
- Mechanical Keyboards (Keychron, Wooting, ROG)
- Gaming Mice (Razer, Logitech, ASUS)
- Gaming Headsets (SteelSeries, Audeze, Sony)
- SSDs (Samsung, WD, Crucial PCIe 5.0)
- CPUs (AMD Ryzen 9000, Intel Core Ultra)
- GPUs (NVIDIA RTX 40-series, AMD RX 7000)

## 📊 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/articles` | GET | List all tech reviews |
| `/api/articles/:slug` | GET | Get specific article |
| `/api/generate` | POST | Generate new review |
| `/api/affiliate/stats` | GET | Click/earning analytics |
| `/api/products` | GET | Product catalog |
| `/api/products/:category` | GET | Products by category |
| `/api/admin/stats` | GET | Dashboard stats |
| `/api/admin/trigger-generate` | POST | Manual content gen |

## 🎯 Content Strategy

### High-Converting Article Formats
1. **"Best [Category] Under $X in 2026"** - Price-specific buying guides
2. **"[Product] Review - Is It Worth $X?"** - Individual deep dives
3. **"[Product A] vs [Product B]"** - Head-to-head comparisons
4. **"Ultimate [Category] Buying Guide"** - Comprehensive roundups

### SEO Keywords Targeted
- "best gaming laptop 2026"
- "RTX 4090 laptop review"
- "240Hz OLED monitor"
- "Samsung Odyssey OLED G9 review"
- "Keychron Q1 Pro review"
- "AMD Ryzen 9 9950X3D"
- "best NVMe SSD 4TB"
- "gaming mouse 8KHz"

### Revenue Optimization
- **High AOV Focus:** Target $500+ products (laptops, monitors, GPUs)
- **Comparison Tables:** Drive multiple Amazon clicks per article
- **Featured Product Cards:** Prominent "View on Amazon" CTAs
- **Buying Guide Structure:** Educational → Comparison → Purchase links

## 💰 Revenue Projections

### Conservative Estimates (2.5% avg commission)

| Daily Visitors | Clicks | Conv Rate | Avg Order | Monthly Revenue |
|----------------|--------|-----------|-----------|-----------------|
| 500 | 75 (15%) | 8% | $600 | $900 |
| 2,000 | 300 (15%) | 9% | $650 | $4,388 |
| 10,000 | 1,500 (15%) | 10% | $700 | $26,250 |

**Key Metrics:**
- CTR to Amazon: 10-20% (tech buyers research before buying)
- Amazon Conversion: 5-10% (high intent traffic)
- Average Order Value: $500-800 (high-end tech)
- Commission: 2-3% (Amazon electronics rate)

### Product Revenue Potential (Per Sale)
- Gaming Laptop ($3,000): $75-90 commission
- OLED Monitor ($1,500): $30-45 commission
- Mechanical Keyboard ($200): $6 commission
- RTX 4090 ($1,600): $40-48 commission

## 🔄 Automated Workflow

1. **Daily at 2 AM:** Content generator creates 2-3 new articles
   - Picks random category
   - Generates "Best X Under $Y" or "Product Review"
   - Includes Amazon product table with real ASINs
   - Saves to `/data/` as JSON

2. **Daily at 3 AM:** SEO optimizer runs
   - Regenerates sitemap.xml
   - Updates internal article links
   - Refreshes robots.txt

3. **Every 6 hours:** Content freshness check
   - Flags articles >30 days old for updates
   - Logs to `/data/jobs.log`

## 📝 Configuration

`.env` file:
```env
# OpenAI (optional - demo mode works without)
OPENAI_API_KEY=sk-...

# Amazon Associates (REQUIRED)
AMAZON_ASSOCIATE_TAG=jarvistaps-20

# Site Config
SITE_URL=https://affiliate-site-zeta.vercel.app
SITE_NAME=Tech Gateway

# Analytics (optional)
GOOGLE_ANALYTICS_ID=G-XXXXXXXX
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import in Vercel dashboard
3. Add environment variables
4. Deploy (auto-scales, free tier: 100GB/mo)

### Vercel Cron Jobs (Already Configured)
`vercel.json` includes:
```json
{
  "crons": [
    { "path": "/api/cron/generate", "schedule": "0 2 * * *" },
    { "path": "/api/cron/optimize", "schedule": "0 3 * * *" }
  ]
}
```

## 📈 Analytics Dashboard

Visit `/admin` to view:
- Total clicks by product/category
- Conversion tracking
- Top performing products
- Article count
- Estimated earnings

**Password:** None currently (add Vercel env variable `ADMIN_PASSWORD` to enable)

## 🔒 Security

- Link cloaking: `/go/[product]` → Amazon with tracking
- No API keys exposed in frontend
- Admin panel optional password protection
- Rate limiting recommended for production

## 🛠️ Customization

### Add New Products
Edit `affiliate-manager.js`:
```javascript
'New Product Name': {
  network: 'Amazon',
  asin: 'B0XXXXXXXXX',
  url: this.generateAmazonLink('B0XXXXXXXXX'),
  commission: '2.5%',
  price: '$XXX',
  category: 'category-name',
  rating: 4.X,
  specs: 'Key specs here',
  featured: false,
  tags: ['Tag1', 'Tag2']
}
```

### Add New Category
Edit `content-generator.js`:
```javascript
'new-category': {
  name: 'Category Name',
  keywords: ['keyword1', 'keyword2'],
  products: [...],
  templates: [...],
  amazonTag: 'jarvistaps-20'
}
```

## 🎨 Branding

- **JARVIS Badge:** Fixed bottom-right corner (required per TOOLS.md)
- **Color Scheme:** Dark tech theme (cyan #00d4ff, green #00ff88)
- **Typography:** Monospace (SF Mono, Fira Code)
- **Logo:** Tech Gateway with JARVIS emblem

## 📊 Performance Optimization

- Static HTML/CSS (no JS framework bloat)
- Lazy loaded images via Amazon CDN
- Minimal API calls on page load
- Cached product data

## 📄 License

MIT License - Built by JARVIS for knetisyzm
