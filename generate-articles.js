const contentGenerator = require('./content-generator');

async function generateStarterContent() {
  const categories = [
    'gaming-laptops',
    'gaming-monitors', 
    'mechanical-keyboards',
    'gaming-mice',
    'storage-ssd'
  ];
  
  for (const category of categories) {
    try {
      console.log(`Generating article for ${category}...`);
      const article = await contentGenerator.generateArticle(category);
      console.log(`✓ Created: ${article.title}`);
    } catch (err) {
      console.error(`Failed ${category}:`, err.message);
    }
    // Small delay between generations
    await new Promise(r => setTimeout(r, 1000));
  }
  
  console.log('Done! Check affiliate-site/data/ for generated articles.');
}

generateStarterContent();
