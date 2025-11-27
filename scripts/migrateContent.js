const mongoose = require('mongoose');
require('dotenv').config();

const PageContent = require('../models/PageContent');

const contentData = [
  // HOME PAGE - ACTUAL CONTENT
  {
    page: 'home',
    section: 'hero',
    contentType: 'hero',
    content: 'Welcome to Wild Roots',
    imageUrl: 'https://i.imgur.com/ANrdcYk.png?w=1600&h=900&fit=crop',
    order: 1
  },
  {
    page: 'home',
    section: 'hero-subtitle',
    contentType: 'text',
    content: 'Where your garden dreams take root',
    order: 2
  },
  {
    page: 'home',
    section: 'hero-cta-text',
    contentType: 'text',
    content: 'Explore Our Classes',
    order: 3
  },
  {
    page: 'home',
    section: 'why-choose-title',
    contentType: 'heading',
    content: 'Why Choose Wild Roots?',
    order: 4
  },
  {
    page: 'home',
    section: 'why-choose-subtitle',
    contentType: 'text',
    content: 'Your premier destination for plants, gardening supplies, and unique gifts',
    order: 5
  },
  {
    page: 'home',
    section: 'quality-plants-title',
    contentType: 'heading',
    content: 'Quality Plants',
    order: 6
  },
  {
    page: 'home',
    section: 'quality-plants-text',
    contentType: 'text',
    content: 'Carefully selected plants and trees for Kansas climate',
    order: 7
  },
  {
    page: 'home',
    section: 'unique-gifts-title',
    contentType: 'heading',
    content: 'Unique Gifts',
    order: 8
  },
  {
    page: 'home',
    section: 'unique-gifts-text',
    contentType: 'text',
    content: 'Curated selection of home and garden decor',
    order: 9
  },
  {
    page: 'home',
    section: 'expert-classes-title',
    contentType: 'heading',
    content: 'Expert Classes',
    order: 10
  },
  {
    page: 'home',
    section: 'expert-classes-text',
    contentType: 'text',
    content: 'Learn from experienced gardeners and designers',
    order: 11
  },
  {
    page: 'home',
    section: 'local-trusted-title',
    contentType: 'heading',
    content: 'Local & Trusted',
    order: 12
  },
  {
    page: 'home',
    section: 'local-trusted-text',
    contentType: 'text',
    content: 'Serving Goodland and surrounding communities',
    order: 13
  },
  {
    page: 'home',
    section: 'featured-classes-title',
    contentType: 'heading',
    content: 'Featured Classes',
    order: 14
  },
  {
    page: 'home',
    section: 'featured-classes-subtitle',
    contentType: 'text',
    content: 'Join us for hands-on learning experiences',
    order: 15
  },
  {
    page: 'home',
    section: 'visit-us-title',
    contentType: 'heading',
    content: 'Visit Us Today',
    order: 16
  },
  {
    page: 'home',
    section: 'visit-us-image',
    contentType: 'image',
    content: 'Garden center interior',
    imageUrl: 'https://i.imgur.com/PKNCAYf.png',
    order: 17
  },
  {
    page: 'home',
    section: 'come-see-us-title',
    contentType: 'heading',
    content: 'Come See Us',
    order: 18
  },
  {
    page: 'home',
    section: 'come-see-us-text',
    contentType: 'text',
    content: "Whether you're a seasoned gardener or just starting out, our friendly staff is here to help you succeed. Visit us to browse our selection of plants, supplies, and gifts.",
    order: 19
  }
];

async function migrateContent() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    console.log('🗑️  Clearing existing page content...');
    await PageContent.deleteMany({});
    console.log('✅ Cleared existing content');

    console.log('📝 Inserting HOME page content...');
    const result = await PageContent.insertMany(contentData);
    console.log(`✅ Inserted ${result.length} HOME page sections`);

    console.log('\n✅ Migration complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateContent();