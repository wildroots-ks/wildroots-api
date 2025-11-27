require('dotenv').config();
const mongoose = require('mongoose');
const PageContent = require('../models/PageContent');

const MONGODB_URI = process.env.MONGODB_URI;

const aboutContent = [
  // Hero Section
  {
    page: 'about',
    section: 'hero',
    contentType: 'hero',
    content: 'Welcome to Wild Roots',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&h=900&fit=crop',
    order: 1
  },
  {
    page: 'about',
    section: 'hero-subtitle',
    contentType: 'text',
    content: 'Growing community, one plant at a time',
    order: 2
  },

  // Main Content Section
  {
    page: 'about',
    section: 'main-title',
    contentType: 'heading',
    content: 'Where Care, Creativity, and Nature Grow Together',
    order: 3
  },
  {
    page: 'about',
    section: 'main-paragraph-1',
    contentType: 'text',
    content: "Wild Roots Garden and Gift's was founded by two nurses whose compassion for caring extends beyond the bedside and into the beauty of nature and home. Rooted in our shared love for flowers, gardening, home décor, and breathing new life into forgotten treasures, we've turned our passion into an exciting new adventure.",
    order: 4
  },
  {
    page: 'about',
    section: 'main-paragraph-2',
    contentType: 'text',
    content: "At Wild Roots, we believe that nurturing a garden isn't so different from caring for people—it takes patience, attention to detail, and a whole lot of heart. That same philosophy inspires everything we create. From fresh florals and greenery to thoughtfully curated home décor and unique upcycled finds, each piece is chosen or crafted to bring warmth, character, and joy to your space.",
    order: 5
  },
  {
    page: 'about',
    section: 'main-paragraph-3',
    contentType: 'text',
    content: "Whether you're here to find the perfect plant, a cozy touch for your home, or a one-of-a-kind vintage piece with a story to tell, our mission is to help you grow beauty in every corner of your life.",
    order: 6
  },
  {
    page: 'about',
    section: 'tagline',
    contentType: 'heading',
    content: "Wild Roots Garden and Gift's — deeply rooted in care, blooming",
    order: 7
  },

  // Stats Section
  {
    page: 'about',
    section: 'stat-1-number',
    contentType: 'text',
    content: '100+',
    order: 8
  },
  {
    page: 'about',
    section: 'stat-1-label',
    contentType: 'text',
    content: 'Plant Varieties',
    order: 9
  },
  {
    page: 'about',
    section: 'stat-2-number',
    contentType: 'text',
    content: '1000+',
    order: 10
  },
  {
    page: 'about',
    section: 'stat-2-label',
    contentType: 'text',
    content: 'Happy Customers',
    order: 11
  },
  {
    page: 'about',
    section: 'stat-3-number',
    contentType: 'text',
    content: 'Year-Round',
    order: 12
  },
  {
    page: 'about',
    section: 'stat-3-label',
    contentType: 'text',
    content: 'Support & Classes',
    order: 13
  },

  // Team Section
  {
    page: 'about',
    section: 'team-image',
    contentType: 'image',
    content: 'Team at work',
    imageUrl: 'https://i.imgur.com/sa2iXpz.jpeg',
    order: 14
  },
  {
    page: 'about',
    section: 'team-title',
    contentType: 'heading',
    content: 'Our Team',
    order: 15
  },
  {
    page: 'about',
    section: 'team-paragraph-1',
    contentType: 'text',
    content: "Our experienced team brings together decades of horticultural knowledge and a genuine love for helping people grow. From selecting the right plants for Kansas weather to troubleshooting garden challenges, we're with you every step of the way.",
    order: 16
  },
  {
    page: 'about',
    section: 'team-paragraph-2',
    contentType: 'text',
    content: "Stop by anytime to chat with our friendly staff about your gardening projects. We love meeting fellow plant enthusiasts and helping gardens flourish throughout our community.",
    order: 17
  }
];

async function migrateAboutContent() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Delete existing about page content
    await PageContent.deleteMany({ page: 'about' });
    console.log('🗑️  Cleared existing about page content');

    // Insert new content
    await PageContent.insertMany(aboutContent);
    console.log(`✅ Migrated ${aboutContent.length} about page sections`);

    await mongoose.connection.close();
    console.log('✅ Migration complete!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateAboutContent();