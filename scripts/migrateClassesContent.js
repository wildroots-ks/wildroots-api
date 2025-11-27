require('dotenv').config();
const mongoose = require('mongoose');
const PageContent = require('../models/PageContent');

const MONGODB_URI = process.env.MONGODB_URI;

const classesContent = [
  // Hero Section
  {
    page: 'classes',
    section: 'hero',
    contentType: 'hero',
    content: 'Classes & Workshops',
    imageUrl: 'https://i.imgur.com/YtITNBR.jpegw=1600&h=900&fit=crop',
    order: 1
  },
  {
    page: 'classes',
    section: 'hero-subtitle',
    contentType: 'text',
    content: 'Learn, grow, and connect with fellow plant lovers',
    order: 2
  },

  // Picktime Mode Content
  {
    page: 'classes',
    section: 'picktime-intro',
    contentType: 'text',
    content: 'Browse our upcoming classes and register online. Select a class below to see details and reserve your spot.',
    order: 3
  },

  // Regular Mode Content
  {
    page: 'classes',
    section: 'regular-intro',
    contentType: 'text',
    content: 'Join us for hands-on learning experiences led by expert instructors. All skill levels welcome!',
    order: 4
  },
  {
    page: 'classes',
    section: 'no-classes-text-1',
    contentType: 'text',
    content: 'No classes are currently scheduled. Check back soon for upcoming workshops!',
    order: 5
  },
  {
    page: 'classes',
    section: 'no-classes-text-2',
    contentType: 'text',
    content: 'Follow us on social media to be the first to know when new classes are announced.',
    order: 6
  }
];

async function migrateClassesContent() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await PageContent.deleteMany({ page: 'classes' });
    console.log('🗑️  Cleared existing classes page content');

    await PageContent.insertMany(classesContent);
    console.log(`✅ Migrated ${classesContent.length} classes page sections`);

    await mongoose.connection.close();
    console.log('✅ Migration complete!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateClassesContent();