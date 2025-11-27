require('dotenv').config();
const mongoose = require('mongoose');
const PageContent = require('../models/PageContent');

const MONGODB_URI = process.env.MONGODB_URI;

const contactContent = [
  // Hero Section
  {
    page: 'contact',
    section: 'hero',
    contentType: 'hero',
    content: 'Get In Touch',
    imageUrl: 'https://i.imgur.com/vpZDyeI.pngw=1600&h=900&fit=crop',
    order: 1
  },
  {
    page: 'contact',
    section: 'hero-subtitle',
    contentType: 'text',
    content: "We'd love to hear from you",
    order: 2
  },

  // Main Content
  {
    page: 'contact',
    section: 'form-title',
    contentType: 'heading',
    content: 'Send Us a Message',
    order: 3
  },
  {
    page: 'contact',
    section: 'other-ways-title',
    contentType: 'heading',
    content: 'Other Ways to Reach Us',
    order: 4
  },

  // Visit Store Section
  {
    page: 'contact',
    section: 'visit-store-title',
    contentType: 'heading',
    content: 'Visit Our Store',
    order: 5
  },
  {
    page: 'contact',
    section: 'visit-store-link-text',
    contentType: 'text',
    content: 'View Hours →',
    order: 6
  },

  // Call Us Section
  {
    page: 'contact',
    section: 'call-us-title',
    contentType: 'heading',
    content: 'Call Us',
    order: 7
  },
  {
    page: 'contact',
    section: 'call-us-subtitle',
    contentType: 'text',
    content: 'Our team is available during business hours',
    order: 8
  },

  // Follow Us Section
  {
    page: 'contact',
    section: 'follow-us-title',
    contentType: 'heading',
    content: 'Follow Us',
    order: 9
  },
  {
    page: 'contact',
    section: 'follow-us-text',
    contentType: 'text',
    content: 'Stay connected for updates, tips, and special offers',
    order: 10
  },
  {
    page: 'contact',
    section: 'facebook-button-text',
    contentType: 'text',
    content: 'Facebook',
    order: 11
  },
  {
    page: 'contact',
    section: 'instagram-button-text',
    contentType: 'text',
    content: 'Instagram',
    order: 12
  },

  // FAQ Section
  {
    page: 'contact',
    section: 'faq-title',
    contentType: 'heading',
    content: 'Frequently Asked Questions',
    order: 13
  },
  {
    page: 'contact',
    section: 'faq-text-1',
    contentType: 'text',
    content: 'Have a question about plants, gardening, or our classes? Our staff has the expertise to help you succeed.',
    order: 14
  },
  {
    page: 'contact',
    section: 'faq-text-2',
    contentType: 'text',
    content: "Drop by the store or give us a call - we're always happy to share our knowledge!",
    order: 15
  }
];

async function migrateContactContent() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Delete existing contact page content
    await PageContent.deleteMany({ page: 'contact' });
    console.log('🗑️  Cleared existing contact page content');

    // Insert new content
    await PageContent.insertMany(contactContent);
    console.log(`✅ Migrated ${contactContent.length} contact page sections`);

    await mongoose.connection.close();
    console.log('✅ Migration complete!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateContactContent();