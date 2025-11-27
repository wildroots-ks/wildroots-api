require('dotenv').config();
const mongoose = require('mongoose');
const PageContent = require('../models/PageContent');

const MONGODB_URI = process.env.MONGODB_URI;

const salesContent = [
  // Hero Section
  {
    page: 'sales',
    section: 'hero',
    contentType: 'hero',
    content: 'Sales & Specials',
    imageUrl: 'https://i.imgur.com/1pnqMuE.jpegw=1600&h=900&fit=crop',
    order: 1
  },
  {
    page: 'sales',
    section: 'hero-subtitle',
    contentType: 'text',
    content: 'Great deals on plants, supplies, and more',
    order: 2
  },

  // Intro Text
  {
    page: 'sales',
    section: 'intro-text',
    contentType: 'text',
    content: 'Check back regularly for seasonal sales, clearance items, and special promotions. Sign up for our newsletter or follow us on social media to be the first to know about upcoming deals!',
    order: 3
  },

  // Card 1 - Spring Trees & Shrubs
  {
    page: 'sales',
    section: 'card-1-title',
    contentType: 'heading',
    content: 'Spring Trees & Shrubs',
    order: 4
  },
  {
    page: 'sales',
    section: 'card-1-text',
    contentType: 'text',
    content: 'We are starting a list of requests for trees and shrubs Call us at 785-890-2027',
    order: 5
  },

  // Card 2 - Gift Shop Specials
  {
    page: 'sales',
    section: 'card-2-title',
    contentType: 'heading',
    content: 'Gift Shop Specials',
    order: 6
  },
  {
    page: 'sales',
    section: 'card-2-text',
    contentType: 'text',
    content: 'Browse our curated selection of home decor, candles, and garden-themed gifts at special prices.',
    order: 7
  },
  {
    page: 'sales',
    section: 'card-2-timing',
    contentType: 'text',
    content: 'Ongoing',
    order: 8
  },

  // Card 3 - Loyalty Program
  {
    page: 'sales',
    section: 'card-3-title',
    contentType: 'heading',
    content: 'Loyalty Program',
    order: 9
  },
  {
    page: 'sales',
    section: 'card-3-text',
    contentType: 'text',
    content: 'Join our rewards program and earn points on every purchase toward future savings.',
    order: 10
  },
  {
    page: 'sales',
    section: 'card-3-timing',
    contentType: 'text',
    content: 'Ask in store',
    order: 11
  }
];

async function migrateSalesContent() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await PageContent.deleteMany({ page: 'sales' });
    console.log('🗑️  Cleared existing sales page content');

    await PageContent.insertMany(salesContent);
    console.log(`✅ Migrated ${salesContent.length} sales page sections`);

    await mongoose.connection.close();
    console.log('✅ Migration complete!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateSalesContent();