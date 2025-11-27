require('dotenv').config();
const mongoose = require('mongoose');
const PageContent = require('../models/PageContent');

const MONGODB_URI = process.env.MONGODB_URI;

const newContent = [
  // Hero Section
  {
    page: 'new',
    section: 'hero',
    contentType: 'hero',
    content: 'What is New',
    imageUrl: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=1600&h=900&fit=crop',
    order: 1
  },
  {
    page: 'new',
    section: 'hero-subtitle',
    contentType: 'text',
    content: 'Fresh arrivals and seasonal favorites',
    order: 2
  },

  // Seasonal Plants Section
  {
    page: 'new',
    section: 'seasonal-plants-image',
    contentType: 'image',
    content: 'New plants',
    imageUrl: 'https://i.imgur.com/lwMk7ZX.jpeg',
    order: 3
  },
  {
    page: 'new',
    section: 'seasonal-plants-title',
    contentType: 'heading',
    content: 'Seasonal Plants',
    order: 4
  },
  {
    page: 'new',
    section: 'seasonal-plants-text',
    contentType: 'text',
    content: 'We are constantly updating our inventory with seasonal favorites. From spring perennials to fall mums, check in store to see what is fresh and available.',
    order: 5
  },

  // Gift Collections Section
  {
    page: 'new',
    section: 'gift-collections-image',
    contentType: 'image',
    content: 'New gifts',
    imageUrl: 'https://i.imgur.com/IFXYuCF.jpeg',
    order: 6
  },
  {
    page: 'new',
    section: 'gift-collections-title',
    contentType: 'heading',
    content: 'Gift Collections',
    order: 7
  },
  {
    page: 'new',
    section: 'gift-collections-text',
    contentType: 'text',
    content: 'Our gift shop features rotating collections of home decor, garden art, candles, and unique finds. Perfect for any occasion or treating yourself!',
    order: 8
  },

  // Stay Updated Section
  {
    page: 'new',
    section: 'stay-updated-title',
    contentType: 'heading',
    content: 'Stay Updated',
    order: 9
  },
  {
    page: 'new',
    section: 'stay-updated-text',
    contentType: 'text',
    content: 'Follow us on social media to see our latest arrivals and seasonal highlights',
    order: 10
  },
  {
    page: 'new',
    section: 'facebook-button-text',
    contentType: 'text',
    content: 'Facebook',
    order: 11
  },
  {
    page: 'new',
    section: 'instagram-button-text',
    contentType: 'text',
    content: 'Instagram',
    order: 12
  }
];

async function migrateNewContent() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await PageContent.deleteMany({ page: 'new' });
    console.log('🗑️  Cleared existing new page content');

    await PageContent.insertMany(newContent);
    console.log(`✅ Migrated ${newContent.length} new page sections`);

    await mongoose.connection.close();
    console.log('✅ Migration complete!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateNewContent();