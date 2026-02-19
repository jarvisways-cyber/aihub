const fs = require('fs');
const path = require('path');

class AffiliateManager {
  constructor() {
    this.dataDir = path.join(__dirname, 'data');
    this.ensureDataDir();
    this.amazonTag = 'jarvistaps-20';
    this.loadAffiliatePrograms();
  }

  ensureDataDir() {
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }
  }

  loadAffiliatePrograms() {
    // High-End Computer Tech Products - Amazon Associates
    this.programs = {
      // === GAMING LAPTOPS (High Ticket: $2000-4500) ===
      'ASUS ROG Strix SCAR 18': {
        network: 'Amazon',
        asin: 'B0CRDZZLYZ',
        url: this.generateAmazonLink('B0CRDZZLYZ'),
        commission: '2.5%',
        price: '$3,499',
        category: 'gaming-laptops',
        rating: 4.8,
        specs: 'RTX 4090, i9-14900HX, 32GB DDR5, 2TB SSD, 240Hz Mini LED',
        featured: true,
        tags: ['Gaming Laptop', 'RTX 4090', '240Hz']
      },
      'Alienware m18 R2': {
        network: 'Amazon',
        asin: 'B0CQYMJYDF',
        url: this.generateAmazonLink('B0CQYMJYDF'),
        commission: '2.5%',
        price: '$3,199',
        category: 'gaming-laptops',
        rating: 4.7,
        specs: 'RTX 4090, i9-14900HX, 64GB DDR5, 4TB SSD, 165Hz',
        featured: true,
        tags: ['Gaming Laptop', 'RTX 4090', 'Alienware']
      },
      'MSI Titan GT77 HX': {
        network: 'Amazon',
        asin: 'B0BTKQ8X6H',
        url: this.generateAmazonLink('B0BTKQ8X6H'),
        commission: '2.5%',
        price: '$4,299',
        category: 'gaming-laptops',
        rating: 4.6,
        specs: 'RTX 4090, i9-13980HX, 128GB DDR5, 4TB SSD, 144Hz 4K Mini LED',
        featured: true,
        tags: ['Gaming Laptop', 'RTX 4090', '4K Display']
      },
      'Razer Blade 18': {
        network: 'Amazon',
        asin: 'B0CSCZXP2J',
        url: this.generateAmazonLink('B0CSCZXP2J'),
        commission: '2.5%',
        price: '$3,799',
        category: 'gaming-laptops',
        rating: 4.7,
        specs: 'RTX 4090, i9-14900HX, 32GB DDR5, 2TB SSD, 240Hz',
        featured: false,
        tags: ['Gaming Laptop', 'RTX 4090', 'Premium Build']
      },
      'Lenovo Legion Pro 7i': {
        network: 'Amazon',
        asin: 'B0CSD1V7B1',
        url: this.generateAmazonLink('B0CSD1V7B1'),
        commission: '2.5%',
        price: '$2,799',
        category: 'gaming-laptops',
        rating: 4.6,
        specs: 'RTX 4080, i9-14900HX, 32GB DDR5, 2TB SSD, 240Hz Mini LED',
        featured: false,
        tags: ['Gaming Laptop', 'RTX 4080', 'Value']
      },

      // === GAMING MONITORS (Mid-High Ticket: $1000-1700) ===
      'Samsung Odyssey OLED G9': {
        network: 'Amazon',
        asin: 'B0CXY3Y5Z6',
        url: this.generateAmazonLink('B0CXY3Y5Z6'),
        commission: '2%',
        price: '$1,699',
        category: 'gaming-monitors',
        rating: 4.8,
        specs: '49" DQHD OLED, 240Hz, 0.03ms, HDR400 True Black',
        featured: true,
        tags: ['Ultrawide', 'OLED', '240Hz']
      },
      'ASUS ROG Swift PG32UCDM': {
        network: 'Amazon',
        asin: 'B0CWQXJ9QZ',
        url: this.generateAmazonLink('B0CWQXJ9QZ'),
        commission: '2%',
        price: '$1,299',
        category: 'gaming-monitors',
        rating: 4.7,
        specs: '32" 4K QD-OLED, 240Hz, 0.03ms, HDR400',
        featured: true,
        tags: ['4K OLED', '240Hz', 'Competitive']
      },
      'LG UltraGear 45GS95QE': {
        network: 'Amazon',
        asin: 'B0D1NGKWN7',
        url: this.generateAmazonLink('B0D1NGKWN7'),
        commission: '2%',
        price: '$1,599',
        category: 'gaming-monitors',
        rating: 4.6,
        specs: '45" WQHD OLED, 240Hz, 0.03ms, 800R Curve',
        featured: false,
        tags: ['Ultrawide', 'OLED', 'Curved']
      },
      'LG 32GS95UE OLED': {
        network: 'Amazon',
        asin: 'B0D5MJXCXM',
        url: this.generateAmazonLink('B0D5MJXCXM'),
        commission: '2%',
        price: '$1,399',
        category: 'gaming-monitors',
        rating: 4.8,
        specs: '32" 4K OLED, 240Hz/480Hz Dual Mode, 0.03ms',
        featured: true,
        tags: ['4K OLED', '480Hz', 'Dual Mode']
      },

      // === MECHANICAL KEYBOARDS ===
      'Keychron Q1 Pro': {
        network: 'Amazon',
        asin: 'B0BWBGRFB3',
        url: this.generateAmazonLink('B0BWBGRFB3'),
        commission: '3%',
        price: '$199',
        category: 'mechanical-keyboards',
        rating: 4.8,
        specs: '75% Layout, QMK/VIA, Wireless, Hot-swappable, Aluminum',
        featured: true,
        tags: ['75%', 'Wireless', 'Custom']
      },
      'Wooting 60HE': {
        network: 'Amazon',
        asin: 'B0CQMJXCXN',
        url: this.generateAmazonLink('B0CQMJXCXN'),
        commission: '3%',
        price: '$175',
        category: 'mechanical-keyboards',
        rating: 4.9,
        specs: '60% Layout, Rapid Trigger, Analog Input, TKL HE',
        featured: true,
        tags: ['60%', 'Analog', 'Esports']
      },
      'NuPhy Air75 V2': {
        network: 'Amazon',
        asin: 'B0CQ3Y1L7M',
        url: this.generateAmazonLink('B0CQ3Y1L7M'),
        commission: '3%',
        price: '$129',
        category: 'mechanical-keyboards',
        rating: 4.7,
        specs: '75% Low Profile, QMK/VIA, Wireless, Hot-swappable',
        featured: false,
        tags: ['Low Profile', '75%', 'Portable']
      },
      'ASUS ROG Azoth': {
        network: 'Amazon',
        asin: 'B0BHJF2VH3',
        url: this.generateAmazonLink('B0BHJF2VH3'),
        commission: '3%',
        price: '$249',
        category: 'mechanical-keyboards',
        rating: 4.6,
        specs: '75% Gaming, OLED Display, Wireless, Hot-swappable',
        featured: true,
        tags: ['Gaming', 'OLED', 'Premium']
      },

      // === GAMING MICE ===
      'Razer Viper V3 Pro': {
        network: 'Amazon',
        asin: 'B0CW3FH91N',
        url: this.generateAmazonLink('B0CW3FH91N'),
        commission: '3%',
        price: '$159',
        category: 'gaming-mice',
        rating: 4.8,
        specs: '54g, Focus Pro 35K, 8KHz Polling, Wireless',
        featured: true,
        tags: ['Ultra-Light', 'Wireless', 'FPS']
      },
      'Logitech G Pro X Superlight 2': {
        network: 'Amazon',
        asin: 'B07W6JKFCZ',
        url: this.generateAmazonLink('B07W6JKFCZ'),
        commission: '3%',
        price: '$159',
        category: 'gaming-mice',
        rating: 4.7,
        specs: '60g, HERO 2 32K, Lightspeed Wireless, USB-C',
        featured: true,
        tags: ['Lightweight', 'Pro Grade', 'Wireless']
      },
      'ASUS ROG Harpe Ace': {
        network: 'Amazon',
        asin: 'B0BHFKJ8V2',
        url: this.generateAmazonLink('B0BHFKJ8V2'),
        commission: '3%',
        price: '$149',
        category: 'gaming-mice',
        rating: 4.6,
        specs: '54g, AimPoint 36K, SpeedNova Wireless',
        featured: false,
        tags: ['Lightweight', 'Wireless', 'RGB']
      },

      // === GAMING HEADSETS ===
      'SteelSeries Arctis Nova Pro': {
        network: 'Amazon',
        asin: 'B09ZWL5F6T',
        url: this.generateAmazonLink('B09ZWL5F6T'),
        commission: '3%',
        price: '$349',
        category: 'gaming-headsets',
        rating: 4.7,
        specs: 'Wireless, Active Noise Cancel, GameDAC Gen 2, Hi-Res Audio',
        featured: true,
        tags: ['Hi-Res', 'ANC', 'Premium']
      },
      'Audeze Maxwell': {
        network: 'Amazon',
        asin: 'B0BQYCHFMX',
        url: this.generateAmazonLink('B0BQYCHFMX'),
        commission: '3%',
        price: '$299',
        category: 'gaming-headsets',
        rating: 4.8,
        specs: 'Planar Magnetic, 80hr Battery, Dolby Atmos, Boom Mic',
        featured: true,
        tags: ['Planar Magnetic', 'Audiophile', 'Long Battery']
      },
      'Sony INZONE H9': {
        network: 'Amazon',
        asin: 'B0B1HJ7HHQ',
        url: this.generateAmazonLink('B0B1HJ7HHQ'),
        commission: '3%',
        price: '$299',
        category: 'gaming-headsets',
        rating: 4.6,
        specs: 'Wireless, 360 Spatial Sound, ANC, 32hr Battery',
        featured: false,
        tags: ['Spatial Audio', 'ANC', 'Sony']
      },

      // === SSD STORAGE ===
      'Samsung 990 Pro 4TB': {
        network: 'Amazon',
        asin: 'B0BHJF2VH4',
        url: this.generateAmazonLink('B0BHJF2VH4'),
        commission: '3%',
        price: '$329',
        category: 'storage-ssd',
        rating: 4.8,
        specs: '4TB, PCIe 4.0, 7,450 MB/s Read, 6,900 MB/s Write',
        featured: true,
        tags: ['4TB', 'PCIe 4.0', 'Gaming']
      },
      'WD Black SN850X 4TB': {
        network: 'Amazon',
        asin: 'B0B7CK2MKR',
        url: this.generateAmazonLink('B0B7CK2MKR'),
        commission: '3%',
        price: '$349',
        category: 'storage-ssd',
        rating: 4.7,
        specs: '4TB, PCIe 4.0, 7,300 MB/s Read, Heatsink Included',
        featured: true,
        tags: ['4TB', 'Gaming', 'Heatsink']
      },
      'Crucial T700 4TB': {
        network: 'Amazon',
        asin: 'B0C5MJ7V8P',
        url: this.generateAmazonLink('B0C5MJ7V8P'),
        commission: '3%',
        price: '$599',
        category: 'storage-ssd',
        rating: 4.6,
        specs: '4TB, PCIe 5.0, 12,400 MB/s Read, Heatsink',
        featured: false,
        tags: ['PCIe 5.0', '12GB/s', 'Future-Proof']
      },

      // === CPUS ===
      'AMD Ryzen 9 9950X3D': {
        network: 'Amazon',
        asin: 'B0D1NVR5VG',
        url: this.generateAmazonLink('B0D1NVR5VG'),
        commission: '2.5%',
        price: '$699',
        category: 'cpus-processors',
        rating: 4.9,
        specs: '16-Core, 32-Thread, 144MB Cache, Zen 5, 3D V-Cache',
        featured: true,
        tags: ['Gaming King', '16-Core', '3D V-Cache']
      },
      'Intel Core Ultra 9 285K': {
        network: 'Amazon',
        asin: 'B0DKMYHF23',
        url: this.generateAmazonLink('B0DKMYHF23'),
        commission: '2.5%',
        price: '$629',
        category: 'cpus-processors',
        rating: 4.7,
        specs: '24-Core, 24-Thread, 36MB Cache, Arrow Lake, NPU',
        featured: true,
        tags: ['24-Core', 'AI NPU', 'Power Efficiency']
      },
      'AMD Ryzen 7 9800X3D': {
        network: 'Amazon',
        asin: 'B0DKMGSF9T',
        url: this.generateAmazonLink('B0DKMGSF9T'),
        commission: '2.5%',
        price: '$479',
        category: 'cpus-processors',
        rating: 4.8,
        specs: '8-Core, 16-Thread, 104MB Cache, Zen 5, Gaming Beast',
        featured: false,
        tags: ['Gaming Value', '8-Core', 'Best FPS/$']
      },

      // === GPUS ===
      'NVIDIA RTX 4090': {
        network: 'Amazon',
        asin: 'B0BHJF2VH5',
        url: this.generateAmazonLink('B0BHJF2VH5'),
        commission: '2.5%',
        price: '$1,599',
        category: 'gpus-graphics',
        rating: 4.8,
        specs: '24GB GDDR6X, 16384 CUDA, 2.52 GHz, 450W TDP',
        featured: true,
        tags: ['4K Gaming', 'DLSS 3.5', 'Creator']
      },
      'AMD RX 7900 XTX': {
        network: 'Amazon',
        asin: 'B0BHJF2VH6',
        url: this.generateAmazonLink('B0BHJF2VH6'),
        commission: '2.5%',
        price: '$999',
        category: 'gpus-graphics',
        rating: 4.7,
        specs: '24GB GDDR6, 6144 Cores, 2.5 GHz, 355W TDP',
        featured: true,
        tags: ['4K Value', '24GB VRAM', 'FSR 3']
      },
      'NVIDIA RTX 4080 Super': {
        network: 'Amazon',
        asin: 'B0BHJF2VH7',
        url: this.generateAmazonLink('B0BHJF2VH7'),
        commission: '2.5%',
        price: '$999',
        category: 'gpus-graphics',
        rating: 4.8,
        specs: '16GB GDDR6X, 10240 CUDA, 2.55 GHz, 320W TDP',
        featured: false,
        tags: ['1440p/4K', 'DLSS 3.5', 'Efficient']
      }
    };
  }

  generateAmazonLink(asin, tag = this.amazonTag) {
    return `https://www.amazon.com/dp/${asin}?tag=${tag}&linkCode=ogi&th=1&psc=1`;
  }

  getProductImageUrl(asin) {
    return `https://m.media-amazon.com/images/I/${asin}._SL500_.jpg`;
  }

  getProductByCategory(category) {
    return Object.entries(this.programs)
      .filter(([_, p]) => p.category === category)
      .map(([name, data]) => ({ name, ...data }));
  }

  getFeaturedProducts() {
    return Object.entries(this.programs)
      .filter(([_, p]) => p.featured)
      .map(([name, data]) => ({ name, ...data }));
  }

  getAllProducts() {
    return Object.entries(this.programs).map(([name, data]) => ({ name, ...data }));
  }

  getCategories() {
    const cats = new Set();
    Object.values(this.programs).forEach(p => cats.add(p.category));
    return Array.from(cats);
  }

  // Track clicks
  registerClick(clickData) {
    const clicksFile = path.join(this.dataDir, 'clicks.json');
    let clicks = [];
    
    if (fs.existsSync(clicksFile)) {
      try {
        clicks = JSON.parse(fs.readFileSync(clicksFile, 'utf8'));
      } catch {
        clicks = [];
      }
    }
    
    clicks.push({
      ...clickData,
      timestamp: new Date().toISOString()
    });
    
    if (clicks.length > 2000) {
      clicks = clicks.slice(-2000);
    }
    
    fs.writeFileSync(clicksFile, JSON.stringify(clicks, null, 2));
    return true;
  }

  // Track conversions (manual entry for now)
  trackConversion(clickId, saleAmount, commission, product, category) {
    const conversionsFile = path.join(this.dataDir, 'conversions.json');
    let conversions = [];
    
    if (fs.existsSync(conversionsFile)) {
      try {
        conversions = JSON.parse(fs.readFileSync(conversionsFile, 'utf8'));
      } catch {
        conversions = [];
      }
    }
    
    conversions.push({
      clickId,
      product,
      category,
      saleAmount,
      commission,
      timestamp: new Date().toISOString()
    });
    
    fs.writeFileSync(conversionsFile, JSON.stringify(conversions, null, 2));
    return true;
  }

  // Get analytics stats
  getStats() {
    const clicksFile = path.join(this.dataDir, 'clicks.json');
    const conversionsFile = path.join(this.dataDir, 'conversions.json');
    
    let clicks = [];
    let conversions = [];
    
    if (fs.existsSync(clicksFile)) {
      try {
        clicks = JSON.parse(fs.readFileSync(clicksFile, 'utf8'));
      } catch {}
    }
    
    if (fs.existsSync(conversionsFile)) {
      try {
        conversions = JSON.parse(fs.readFileSync(conversionsFile, 'utf8'));
      } catch {}
    }
    
    const totalClicks = clicks.length;
    const totalConversions = conversions.length;
    const totalEarnings = conversions.reduce((sum, c) => sum + (c.commission || 0), 0);
    const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks * 100).toFixed(2) : 0;
    
    const byCategory = {};
    const byProduct = {};
    
    for (const click of clicks) {
      byCategory[click.category] = (byCategory[click.category] || 0) + 1;
      byProduct[click.product] = (byProduct[click.product] || 0) + 1;
    }
    
    const topProducts = Object.entries(byProduct)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
    
    // Calculate potential earnings based on typical Amazon commissions
    const avgOrderValue = 500; // Conservative estimate for high-end tech
    const avgCommission = 0.025; // 2.5% average for electronics
    const potentialEarnings = totalClicks * avgOrderValue * avgCommission;
    
    return {
      totalClicks,
      totalConversions,
      conversionRate,
      totalEarnings: totalEarnings.toFixed(2),
      potentialEarnings: potentialEarnings.toFixed(2),
      byCategory,
      topProducts,
      avgOrderValue,
      amazonTag: this.amazonTag
    };
  }

  // Generate affiliate link with tracking
  generateTrackingLink(productName, source = 'website') {
    const product = this.programs[productName];
    if (!product) return null;
    
    const clickId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    this.registerClick({
      clickId,
      product: productName,
      category: product.category,
      source,
      url: product.url
    });
    
    return {
      url: product.url,
      clickId,
      product: productName
    };
  }
}

module.exports = new AffiliateManager();
