const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'demo-key'
});

// AMAZON TECH CATEGORIES - High-End Computer Tech Focus
const TECH_CATEGORIES = {
  'gaming-laptops': {
    name: 'Gaming Laptops',
    keywords: [
      'best gaming laptop 2026', 'RTX 4090 laptop review', 'Alienware m18 review',
      'ROG Strix SCAR 18', 'MSI Titan GT77', 'Razer Blade 18',
      'high end gaming laptop', '240Hz gaming laptop', 'mini LED gaming laptop'
    ],
    products: [
      { name: 'ASUS ROG Strix SCAR 18', asin: 'B0CRDZZLYZ', price: '$3,499', rating: 4.8 },
      { name: 'Alienware m18 R2', asin: 'B0CQYMJYDF', price: '$3,199', rating: 4.7 },
      { name: 'MSI Titan GT77 HX', asin: 'B0BTKQ8X6H', price: '$4,299', rating: 4.6 },
      { name: 'Razer Blade 18', asin: 'B0CSCZXP2J', price: '$3,799', rating: 4.7 },
      { name: 'Lenovo Legion Pro 7i', asin: 'B0CSD1V7B1', price: '$2,799', rating: 4.6 }
    ],
    templates: [
      'Best Gaming Laptops Under ${Price} in 2026',
      '{Product} Review - Is It Worth ${Price}?',
      'Top Gaming Laptops for {Use Case}',
      'Best RTX 4090/4080 Laptops Compared',
      '{Product} vs {Product2}: Which Gaming Laptop Wins?'
    ],
    amazonTag: 'jarvistaps-20'
  },
  'gaming-monitors': {
    name: 'Gaming Monitors',
    keywords: [
      'best 4K gaming monitor 2026', '240Hz OLED monitor', 'Samsung Odyssey OLED G9',
      'LG UltraGear 45GS95QE', 'ASUS ROG Swift PG32UCDM', 'Alienware AW3423DWF',
      'mini LED monitor review', 'QD-OLED monitor', 'ultrawide gaming monitor'
    ],
    products: [
      { name: 'Samsung Odyssey OLED G9', asin: 'B0CXY3Y5Z6', price: '$1,699', rating: 4.8 },
      { name: 'ASUS ROG Swift PG32UCDM', asin: 'B0CWQXJ9QZ', price: '$1,299', rating: 4.7 },
      { name: 'LG UltraGear 45GS95QE', asin: 'B0D1NGKWN7', price: '$1,599', rating: 4.6 },
      { name: 'Alienware AW3423DWF', asin: 'B0BPX7LVRP', price: '$999', rating: 4.7 },
      { name: 'LG 32GS95UE OLED', asin: 'B0D5MJXCXM', price: '$1,399', rating: 4.8 }
    ],
    templates: [
      'Best Gaming Monitors Under ${Price} in 2026',
      '{Product} Review - OLED Gaming Monitor Analysis',
      'Best {Panel Type} Monitors for Gaming',
      '{Product} vs {Product2}: Display Comparison',
      'Ultimate Gaming Monitor Buying Guide 2026'
    ],
    amazonTag: 'jarvistaps-20'
  },
  'mechanical-keyboards': {
    name: 'Mechanical Keyboards',
    keywords: [
      'best mechanical keyboard 2026', 'Keychron Q1 Pro review', 'Wooting 60HE',
      'NuPhy Air75 V2', 'Drop CTRL high profile', 'ASUS ROG Azoth',
      'custom mechanical keyboard', 'hot swappable keyboard', 'wireless gaming keyboard'
    ],
    products: [
      { name: 'Keychron Q1 Pro', asin: 'B0BWBGRFB3', price: '$199', rating: 4.8 },
      { name: 'Wooting 60HE', asin: 'B0CQMJXCXN', price: '$175', rating: 4.9 },
      { name: 'NuPhy Air75 V2', asin: 'B0CQ3Y1L7M', price: '$129', rating: 4.7 },
      { name: 'ASUS ROG Azoth', asin: 'B0BHJF2VH3', price: '$249', rating: 4.6 },
      { name: 'Drop CTRL High Profile', asin: 'B07QYWMW6S', price: '$249', rating: 4.5 }
    ],
    templates: [
      'Best Mechanical Keyboards Under ${Price}',
      '{Product} Review - Premium Build Quality?',
      'Top {Switch Type} Keyboards for {Use Case}',
      '{Product} vs {Product2}: Typing Experience Compared',
      'Best Custom Mechanical Keyboards 2026'
    ],
    amazonTag: 'jarvistaps-20'
  },
  'gaming-mice': {
    name: 'Gaming Mice',
    keywords: [
      'best gaming mouse 2026', 'Razer Viper V3 Pro', 'Logitech G Pro X Superlight 2',
      'Finalmouse UltralightX', 'ASUS ROG Harpe Ace', 'Pulsar X2V2 mini',
      'lightweight gaming mouse', 'wireless gaming mouse', 'esports mouse review'
    ],
    products: [
      { name: 'Razer Viper V3 Pro', asin: 'B0CW3FH91N', price: '$159', rating: 4.8 },
      { name: 'Logitech G Pro X Superlight 2', asin: 'B07W6JKFCZ', price: '$159', rating: 4.7 },
      { name: 'ASUS ROG Harpe Ace', asin: 'B0BHFKJ8V2', price: '$149', rating: 4.6 },
      { name: 'Pulsar X2V2 mini', asin: 'B0CQ3Y2M8N', price: '$89', rating: 4.7 },
      { name: 'Finalmouse UltralightX', asin: 'B0CQMJXCYM', price: '$189', rating: 4.8 }
    ],
    templates: [
      'Best Gaming Mice Under ${Price} in 2026',
      '{Product} Review - Pro Grade Performance?',
      'Top {Weight} Gaming Mice for {Use Case}',
      '{Product} vs {Product2}: Sensor Comparison',
      'Best Wireless Gaming Mice for FPS Games'
    ],
    amazonTag: 'jarvistaps-20'
  },
  'gaming-headsets': {
    name: 'Gaming Headsets',
    keywords: [
      'best gaming headset 2026', 'SteelSeries Arctis Nova Pro', 'Audeze Maxwell',
      'Sony INZONE H9', 'HyperX Cloud III Wireless', 'Corsair Virtuoso Pro',
      'wireless gaming headset', 'planar magnetic headset', 'hi-res gaming audio'
    ],
    products: [
      { name: 'SteelSeries Arctis Nova Pro', asin: 'B09ZWL5F6T', price: '$349', rating: 4.7 },
      { name: 'Audeze Maxwell', asin: 'B0BQYCHFMX', price: '$299', rating: 4.8 },
      { name: 'Sony INZONE H9', asin: 'B0B1HJ7HHQ', price: '$299', rating: 4.6 },
      { name: 'Corsair Virtuoso Pro', asin: 'B0CQMJXCYM', price: '$269', rating: 4.5 },
      { name: 'HyperX Cloud III Wireless', asin: 'B0C4FQQMX7', price: '$169', rating: 4.6 }
    ],
    templates: [
      'Best Gaming Headsets Under ${Price}',
      '{Product} Review - Audio Quality Analysis',
      'Top Wireless Gaming Headsets for {Use Case}',
      '{Product} vs {Product2}: Sound Comparison',
      'Best Hi-Res Gaming Audio 2026'
    ],
    amazonTag: 'jarvistaps-20'
  },
  'storage-ssd': {
    name: 'SSD Storage',
    keywords: [
      'best NVMe SSD 2026', 'Samsung 990 Pro 4TB', 'WD Black SN850X',
      'Crucial T700 review', 'Corsair MP700 Pro', 'Sabrent Rocket 5',
      'PCIe 5.0 SSD review', 'fastest NVMe drive', '4TB SSD comparison'
    ],
    products: [
      { name: 'Samsung 990 Pro 4TB', asin: 'B0BHJF2VH4', price: '$329', rating: 4.8 },
      { name: 'WD Black SN850X 4TB', asin: 'B0B7CK2MKR', price: '$349', rating: 4.7 },
      { name: 'Crucial T700 4TB', asin: 'B0C5MJ7V8P', price: '$599', rating: 4.6 },
      { name: 'Corsair MP700 Pro 4TB', asin: 'B0D1GJ7V8P', price: '$549', rating: 4.5 },
      { name: 'Sabrent Rocket 5 4TB', asin: 'B0D2MJ7V8Q', price: '$529', rating: 4.6 }
    ],
    templates: [
      'Best NVMe SSDs Under ${Price} in 2026',
      '{Product} Review - Speed Benchmarks',
      'Top {Capacity} SSDs for Gaming',
      '{Product} vs {Product2}: Performance Tested',
      'Ultimate SSD Buying Guide 2026'
    ],
    amazonTag: 'jarvistaps-20'
  },
  'cpus-processors': {
    name: 'CPUs & Processors',
    keywords: [
      'best CPU for gaming 2026', 'Intel Core Ultra 9 285K', 'AMD Ryzen 9 9950X3D',
      'Intel vs AMD 2026', 'best processor for streaming', 'high end desktop CPU',
      'gaming CPU comparison', 'content creation CPU', 'overclocking CPU review'
    ],
    products: [
      { name: 'AMD Ryzen 9 9950X3D', asin: 'B0D1NVR5VG', price: '$699', rating: 4.9 },
      { name: 'Intel Core Ultra 9 285K', asin: 'B0DKMYHF23', price: '$629', rating: 4.7 },
      { name: 'AMD Ryzen 7 9800X3D', asin: 'B0DKMGSF9T', price: '$479', rating: 4.8 },
      { name: 'Intel Core Ultra 7 265K', asin: 'B0DKMYJQVV', price: '$439', rating: 4.6 },
      { name: 'AMD Ryzen 9 9900X', asin: 'B0D1NVQZLG', price: '$549', rating: 4.7 }
    ],
    templates: [
      'Best CPUs for Gaming Under ${Price}',
      '{Product} Review - Performance Benchmarks',
      'Top Processors for {Use Case}',
      '{Product} vs {Product2}: Gaming Comparison',
      'Ultimate CPU Buying Guide 2026'
    ],
    amazonTag: 'jarvistaps-20'
  },
  'gpus-graphics': {
    name: 'Graphics Cards',
    keywords: [
      'best GPU 2026', 'RTX 5090 review', 'RTX 4080 Super', 'RX 7900 XTX',
      'NVIDIA vs AMD 2026', 'best graphics card for 4K gaming', 'DLSS 4 review',
      'high end GPU comparison', 'GPU buying guide', 'ray tracing performance'
    ],
    products: [
      { name: 'NVIDIA RTX 4090', asin: 'B0BHJF2VH5', price: '$1,599', rating: 4.8 },
      { name: 'AMD RX 7900 XTX', asin: 'B0BHJF2VH6', price: '$999', rating: 4.7 },
      { name: 'NVIDIA RTX 4080 Super', asin: 'B0BHJF2VH7', price: '$999', rating: 4.8 },
      { name: 'AMD RX 7900 XT', asin: 'B0BHJF2VH8', price: '$899', rating: 4.6 },
      { name: 'NVIDIA RTX 4070 Ti Super', asin: 'B0BHJF2VH9', price: '$799', rating: 4.7 }
    ],
    templates: [
      'Best Graphics Cards Under ${Price} in 2026',
      '{Product} Review - 4K Gaming Performance',
      'Top GPUs for {Use Case}',
      '{Product} vs {Product2}: Ray Tracing Tested',
      'Ultimate GPU Buying Guide 2026'
    ],
    amazonTag: 'jarvistaps-20'
  }
};

// Master keyword list for general tech content
const MASTER_KEYWORDS = [
  'best tech gadgets 2026', 'gaming setup 2026', 'PC build guide',
  'gaming peripherals review', 'high end computer hardware',
  'RGB gaming setup', 'esports gear', 'content creator setup'
];

class ContentGenerator {
  constructor() {
    this.dataDir = path.join(__dirname, 'data');
    this.ensureDataDir();
  }

  ensureDataDir() {
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }
  }

  async generateArticle(category = null, customKeywords = []) {
    const cats = Object.keys(TECH_CATEGORIES);
    const selectedCategory = category || cats[Math.floor(Math.random() * cats.length)];
    const catConfig = TECH_CATEGORIES[selectedCategory];
    
    const keywords = customKeywords.length > 0 
      ? customKeywords 
      : this.pickRandomItems(catConfig.keywords, 3);
    
    const targetKeyword = keywords[0];
    const template = catConfig.templates[Math.floor(Math.random() * catConfig.templates.length)];

    try {
      const content = await this.aiGenerateContent(selectedCategory, targetKeyword, catConfig.products);
      
      const article = {
        id: uuidv4(),
        title: this.formatTemplate(template, catConfig),
        slug: this.generateSlug(targetKeyword),
        content: content,
        excerpt: this.generateExcerpt(content),
        keywords: keywords,
        category: selectedCategory,
        subNiche: catConfig.name,
        products: catConfig.products.slice(0, 5),
        amazonLinks: this.generateAmazonLinks(catConfig.products, catConfig.amazonTag),
        date: new Date().toISOString(),
        featuredImage: this.generateImagePrompt(targetKeyword, selectedCategory),
        metaTitle: this.generateMetaTitle(targetKeyword, catConfig),
        metaDescription: this.generateExcerpt(content, 160),
        author: 'Tech Review Team',
        template: template,
        type: 'amazon-tech'
      };

      // Inject Amazon links into content
      article.content = this.injectAmazonLinks(article.content, article.amazonLinks, article.products);

      this.saveArticle(article);
      return article;
    } catch (error) {
      console.error('Content generation error:', error);
      return this.createTemplateArticle(selectedCategory, targetKeyword, catConfig);
    }
  }

  formatTemplate(template, config) {
    const useCases = ['Gaming', 'Streaming', 'Content Creation', 'Work/Productivity', 'Esports'];
    const panelTypes = ['OLED', 'Mini LED', 'IPS', 'QD-OLED'];
    const switchTypes = ['Linear', 'Tactile', 'Clicky', 'Hall Effect'];
    const weights = ['Ultra-Lightweight', 'Lightweight', 'Ergonomic', 'Ambidextrous'];
    const capacities = ['1TB', '2TB', '4TB', '8TB'];
    
    const product = config.products[0].name;
    const product2 = config.products[1]?.name || config.products[0].name;
    
    return template
      .replace('${Price}', ['$100', '$200', '$300', '$500', '$1000'][Math.floor(Math.random() * 5)])
      .replace('{Use Case}', useCases[Math.floor(Math.random() * useCases.length)])
      .replace('{Panel Type}', panelTypes[Math.floor(Math.random() * panelTypes.length)])
      .replace('{Switch Type}', switchTypes[Math.floor(Math.random() * switchTypes.length)])
      .replace('{Weight}', weights[Math.floor(Math.random() * weights.length)])
      .replace('{Capacity}', capacities[Math.floor(Math.random() * capacities.length)])
      .replace('{Product}', product)
      .replace('{Product2}', product2);
  }

  pickRandomItems(arr, count) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  generateAmazonLinks(products, tag) {
    return products.map(p => ({
      product: p.name,
      asin: p.asin,
      url: `https://www.amazon.com/dp/${p.asin}?tag=${tag}&linkCode=ogi&th=1&psc=1`,
      price: p.price,
      rating: p.rating,
      image: `https://m.media-amazon.com/images/I/${p.asin}._SL500_.jpg`
    }));
  }

  injectAmazonLinks(content, amazonLinks, products) {
    let enhancedContent = content;
    
    // Add product comparison table
    const comparisonTable = `

## 🛒 Featured Products

| Product | Price | Rating | Buy Now |
|---------|-------|--------|---------|
${amazonLinks.map(l => `| ${l.product} | ${l.price} | ★ ${l.rating} | [View on Amazon](${l.url}) |`).join('\n')}

**Disclosure:** As an Amazon Associate, we earn from qualifying purchases.
`;

    // Insert before conclusion or at end
    if (enhancedContent.includes('## Conclusion')) {
      enhancedContent = enhancedContent.replace('## Conclusion', comparisonTable + '\n\n## Conclusion');
    } else {
      enhancedContent += comparisonTable;
    }

    return enhancedContent;
  }

  async aiGenerateContent(category, keyword, products) {
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'demo-key') {
      return this.createTechTemplateContent(category, keyword, products);
    }

    const categoryInfo = TECH_CATEGORIES[category];

    try {
      const prompt = `Write a comprehensive tech review article about "${keyword}" for 2026.

Category: ${categoryInfo.name}
Products to cover: ${products.map(p => p.name).join(', ')}

Structure:
1. Introduction - Why this matters in 2026
2. Top 5 Products Reviewed - Detailed analysis of each
3. Comparison Table - Specs, features, pricing
4. Buying Guide - What to look for
5. Conclusion - Best picks for different budgets

Tone: Professional, enthusiast-level, data-driven
Length: 1500-2000 words
Include: Benchmark data, pros/cons, real-world use cases
SEO optimize for: ${keyword}`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a tech hardware reviewer specializing in high-end computer components and gaming peripherals. Write detailed, factual reviews with benchmark data and buying recommendations.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2500
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API error:', error);
      return this.createTechTemplateContent(category, keyword, products);
    }
  }

  createTechTemplateContent(category, keyword, products) {
    const categoryInfo = TECH_CATEGORIES[category];
    const productList = products.slice(0, 5);
    
    return `# ${keyword} - Complete Buyer's Guide 2026

## Introduction

In 2026, ${categoryInfo.name.toLowerCase()} have reached new heights in performance and value. Whether you're building a new setup or upgrading existing gear, this guide covers the best options available today.

## Top Picks for ${categoryInfo.name}

${productList.map((p, i) => `
### ${i + 1}. ${p.name} - ${p.price}

**Key Highlights:**
- Premium build quality and performance
- Excellent user reviews (${p.rating}/5 stars)
- Competitive pricing for the feature set
- Ideal for gaming, streaming, and content creation

**Verdict:** A top-tier choice that delivers exceptional value at its price point.
`).join('\n')}

## What to Look For

When shopping for ${categoryInfo.name.toLowerCase()}, consider these factors:

- **Performance benchmarks** - Real-world testing matters
- **Build quality** - Durability for long-term use
- **Value proposition** - Features vs. price
- **Compatibility** - Works with your existing setup
- **Warranty & support** - Manufacturer backing

## Comparison Summary

${productList.map(p => `- **${p.name}**: ${p.price} - ${p.rating}/5 rating`).join('\n')}

## Conclusion

The ${categoryInfo.name.toLowerCase()} market in 2026 offers exceptional choices across all budgets. Whether you're seeking premium performance or the best value, our top picks represent the cream of the crop.

*Prices and availability subject to change. Check current listings for the latest information.*`;
  }

  createTemplateArticle(category, keyword, catConfig) {
    return {
      id: uuidv4(),
      title: `Best ${catConfig.name} in 2026 - Complete Buying Guide`,
      slug: this.generateSlug(keyword),
      content: this.createTechTemplateContent(category, keyword, catConfig.products),
      excerpt: `Discover the best ${catConfig.name.toLowerCase()} for 2026. Expert reviews, comparisons, and buying recommendations for every budget.`,
      keywords: [keyword, ...catConfig.keywords.slice(0, 3)],
      category: category,
      subNiche: catConfig.name,
      products: catConfig.products.slice(0, 5),
      amazonLinks: this.generateAmazonLinks(catConfig.products.slice(0, 5), catConfig.amazonTag),
      date: new Date().toISOString(),
      featuredImage: this.generateImagePrompt(keyword, category),
      metaTitle: `Best ${catConfig.name} 2026 - Expert Reviews`,
      metaDescription: `Find the best ${catConfig.name.toLowerCase()} for your setup. Detailed reviews, comparisons, and Amazon links for easy purchasing.`,
      author: 'Tech Review Team',
      template: 'buyers-guide',
      type: 'amazon-tech'
    };
  }

  generateSlug(keyword) {
    return keyword.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .substring(0, 60);
  }

  generateExcerpt(content, maxLength = 200) {
    const plain = content.replace(/#|`|\[|\]|\*|\|/g, '').replace(/\s+/g, ' ').trim();
    return plain.length > maxLength ? plain.substring(0, maxLength - 3) + '...' : plain;
  }

  generateImagePrompt(keyword, category) {
    const prompts = {
      'gaming-laptops': `gaming laptop RGB keyboard premium setup dark aesthetic`,
      'gaming-monitors': `ultrawide gaming monitor OLED display RGB setup`,
      'mechanical-keyboards': `custom mechanical keyboard RGB lighting premium keycaps`,
      'gaming-mice': `lightweight gaming mouse RGB white background tech product`,
      'gaming-headsets': `premium gaming headset RGB lighting professional audio`,
      'storage-ssd': `NVMe SSD M.2 drive tech product red heatsink`,
      'cpus-processors': `CPU processor chip technology silicon close-up tech`,
      'gpus-graphics': `graphics card GPU RGB triple fan setup gaming`
    };
    return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompts[category] || 'tech product review')}?width=800&height=400`;
  }

  generateMetaTitle(keyword, catConfig) {
    return `Best ${catConfig.name} 2026 - ${keyword} | Tech Gateway`;
  }

  saveArticle(article) {
    const filePath = path.join(this.dataDir, `${article.slug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(article, null, 2));
    console.log(`Article saved: ${filePath}`);
  }

  async runNightlyJob() {
    const articles = [];
    const categories = Object.keys(TECH_CATEGORIES);
    
    // Generate 2-3 articles per night
    const count = 2 + Math.floor(Math.random() * 2);
    
    for (let i = 0; i < count; i++) {
      const category = categories[Math.floor(Math.random() * categories.length)];
      const article = await this.generateArticle(category);
      articles.push(article);
      
      // Small delay between generations
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    return articles;
  }

  getAllArticles() {
    if (!fs.existsSync(this.dataDir)) return [];
    
    const files = fs.readdirSync(this.dataDir).filter(f => f.endsWith('.json') && !f.includes('clicks') && !f.includes('conversions'));
    return files.map(f => {
      try {
        return JSON.parse(fs.readFileSync(path.join(this.dataDir, f), 'utf8'));
      } catch {
        return null;
      }
    }).filter(Boolean);
  }

  getArticlesByCategory(category) {
    return this.getAllArticles().filter(a => a.category === category);
  }
}

module.exports = new ContentGenerator();
