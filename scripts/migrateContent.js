const mongoose = require('mongoose');
require('dotenv').config();

const PageContent = require('../models/PageContent');

const contentData = [
  // HOME PAGE
  {
    page: 'home',
    section: 'hero',
    contentType: 'hero',
    content: 'Welcome to Wild Roots Garden & Gifts',
    imageUrl: '/images/home-hero.jpg',
    order: 1
  },
  {
    page: 'home',
    section: 'hero-subtitle',
    contentType: 'text',
    content: 'Your local garden center and gift shop in Goodland, Kansas',
    order: 2
  },
  {
    page: 'home',
    section: 'about-preview-title',
    contentType: 'heading',
    content: 'About Us',
    order: 3
  },
  {
    page: 'home',
    section: 'about-preview-text',
    contentType: 'text',
    content: 'Wild Roots is your one-stop shop for all things garden and gifts in Goodland, Kansas.',
    imageUrl: '/images/about-preview.jpg',
    order: 4
  },
  {
    page: 'home',
    section: 'services-title',
    contentType: 'heading',
    content: 'What We Offer',
    order: 5
  },
  {
    page: 'home',
    section: 'services-list',
    contentType: 'text',
    content: 'Garden supplies and plants\nUnique gifts and home decor\nGardening classes and workshops\nExpert advice and consultation',
    order: 6
  },

  // ABOUT PAGE
  {
    page: 'about',
    section: 'hero',
    contentType: 'hero',
    content: 'About Wild Roots',
    imageUrl: '/images/about-hero.jpg',
    order: 1
  },
  {
    page: 'about',
    section: 'hero-subtitle',
    contentType: 'text',
    content: 'Growing community through plants and gifts',
    order: 2
  },
  {
    page: 'about',
    section: 'story-title',
    contentType: 'heading',
    content: 'Our Story',
    order: 3
  },
  {
    page: 'about',
    section: 'story-text',
    contentType: 'text',
    content: 'Wild Roots Garden & Gifts has been serving Goodland, Kansas with quality plants, garden supplies, and unique gifts.',
    imageUrl: '/images/about-story.jpg',
    order: 4
  },
  {
    page: 'about',
    section: 'mission-title',
    contentType: 'heading',
    content: 'Our Mission',
    order: 5
  },
  {
    page: 'about',
    section: 'mission-text',
    contentType: 'text',
    content: 'To provide quality products, expert knowledge, and exceptional service to our community.',
    order: 6
  },

  // CLASSES PAGE
  {
    page: 'classes',
    section: 'hero',
    contentType: 'hero',
    content: 'Gardening Classes & Workshops',
    imageUrl: '/images/classes-hero.jpg',
    order: 1
  },
  {
    page: 'classes',
    section: 'hero-subtitle',
    contentType: 'text',
    content: 'Learn from the experts at Wild Roots',
    order: 2
  },
  {
    page: 'classes',
    section: 'intro',
    contentType: 'text',
    content: 'Join us for hands-on gardening classes and workshops. All skill levels welcome!',
    order: 3
  },

  // HOURS PAGE
  {
    page: 'hours',
    section: 'hero',
    contentType: 'hero',
    content: 'Store Hours & Location',
    imageUrl: '/images/hours-hero.jpg',
    order: 1
  },
  {
    page: 'hours',
    section: 'hero-subtitle',
    contentType: 'text',
    content: 'Visit us in Goodland, Kansas',
    order: 2
  },
  {
    page: 'hours',
    section: 'location-title',
    contentType: 'heading',
    content: 'Find Us',
    order: 3
  },
  {
    page: 'hours',
    section: 'location-text',
    contentType: 'text',
    content: 'Goodland, Kansas - Conveniently located in the heart of Goodland.',
    order: 4
  },

  // SALES PAGE
  {
    page: 'sales',
    section: 'hero',
    contentType: 'hero',
    content: 'Current Sales & Promotions',
    imageUrl: '/images/sales-hero.jpg',
    order: 1
  },
  {
    page: 'sales',
    section: 'hero-subtitle',
    contentType: 'text',
    content: 'Save on plants, gifts, and garden supplies',
    order: 2
  },
  {
    page: 'sales',
    section: 'intro',
    contentType: 'text',
    content: 'Check out our current sales and special offers. New deals added regularly!',
    order: 3
  },

  // NEW (What's New) PAGE
  {
    page: 'new',
    section: 'hero',
    contentType: 'hero',
    content: "What's New at Wild Roots",
    imageUrl: '/images/whats-new-hero.jpg',
    order: 1
  },
  {
    page: 'new',
    section: 'hero-subtitle',
    contentType: 'text',
    content: 'Latest arrivals and updates',
    order: 2
  },
  {
    page: 'new',
    section: 'intro',
    contentType: 'text',
    content: 'Discover our newest plants, gifts, and products. Fresh inventory arriving weekly!',
    order: 3
  },

  // CONTACT PAGE
  {
    page: 'contact',
    section: 'hero',
    contentType: 'hero',
    content: 'Get In Touch',
    imageUrl: '/images/contact-hero.jpg',
    order: 1
  },
  {
    page: 'contact',
    section: 'hero-subtitle',
    contentType: 'text',
    content: "We'd love to hear from you",
    order: 2
  },
  {
    page: 'contact',
    section: 'info-title',
    contentType: 'heading',
    content: 'Contact Information',
    order: 3
  },
  {
    page: 'contact',
    section: 'info-text',
    contentType: 'text',
    content: 'Have questions? Reach out to us and we\'ll get back to you soon.\n\nPhone: (555) 123-4567\nEmail: info@wildrootsgoodlandks.com',
    order: 4
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

    console.log('📝 Inserting new content...');
    const result = await PageContent.insertMany(contentData);
    console.log(`✅ Inserted ${result.length} content sections`);

    console.log('\n📊 Summary by page:');
    const pages = ['home', 'about', 'classes', 'hours', 'sales', 'new', 'contact'];
    for (const page of pages) {
      const count = result.filter(r => r.page === page).length;
      console.log(`   ${page}: ${count} sections`);
    }

    console.log('\n✅ Migration complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateContent();