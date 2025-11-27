require('dotenv').config();
const mongoose = require('mongoose');
const PageContent = require('../models/PageContent');

const MONGODB_URI = process.env.MONGODB_URI;

const hoursContent = [
  // Hero Section
  {
    page: 'hours',
    section: 'hero',
    contentType: 'hero',
    content: 'Hours & Location',
    imageUrl: 'https://i.imgur.com/a4JAeA2.pngw=1600&h=900&fit=crop',
    order: 1
  },
  {
    page: 'hours',
    section: 'hero-subtitle',
    contentType: 'text',
    content: 'Come visit us',
    order: 2
  },

  // Store Hours Section
  {
    page: 'hours',
    section: 'store-hours-title',
    contentType: 'heading',
    content: 'Store Hours',
    order: 3
  },
  {
    page: 'hours',
    section: 'no-hours-text',
    contentType: 'text',
    content: 'Please call us for our current hours of operation.',
    order: 4
  },

  // Location & Contact Section
  {
    page: 'hours',
    section: 'location-contact-title',
    contentType: 'heading',
    content: 'Location & Contact',
    order: 5
  },
  {
    page: 'hours',
    section: 'address-label',
    contentType: 'heading',
    content: 'Address',
    order: 6
  },
  {
    page: 'hours',
    section: 'directions-link-text',
    contentType: 'text',
    content: 'Get Directions →',
    order: 7
  },
  {
    page: 'hours',
    section: 'phone-label',
    contentType: 'heading',
    content: 'Phone',
    order: 8
  },
  {
    page: 'hours',
    section: 'help-text',
    contentType: 'text',
    content: 'Have questions? Call us or visit during our business hours. Our friendly staff is here to help!',
    order: 9
  }
];

async function migrateHoursContent() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await PageContent.deleteMany({ page: 'hours' });
    console.log('🗑️  Cleared existing hours page content');

    await PageContent.insertMany(hoursContent);
    console.log(`✅ Migrated ${hoursContent.length} hours page sections`);

    await mongoose.connection.close();
    console.log('✅ Migration complete!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateHoursContent();