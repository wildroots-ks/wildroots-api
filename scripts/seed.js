require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const AdminUser = require('../models/AdminUser');
const Settings = require('../models/Settings');
const Hours = require('../models/Hours');

const seedDatabase = async () => {
  try {
    await connectDB();
    
    console.log('🌱 Seeding database...');

    // Create default admin user
    const existingAdmin = await AdminUser.findOne({ email: 'admin@wildroots.com' });
    if (!existingAdmin) {
      await AdminUser.create({
        name: 'Admin',
        email: 'admin@wildroots.com',
        password: 'admin123', // Change this in production!
        role: 'admin'
      });
      console.log('✅ Admin user created: admin@wildroots.com / admin123');
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    // Create default settings
    const existingSettings = await Settings.findOne();
    if (!existingSettings) {
      await Settings.create({
        storeName: 'Wild Roots Garden & Gifts',
        tagline: 'Garden center and retail gifts',
        address: '1201 E U.S. 24 Hwy',
        phone: '(785) 890-2027',
        email: 'info@wildrootsgarden.com',
        facebook: 'https://www.facebook.com/share/1G7fvpezSY/?mibextid=wwXIfr',
        instagram: 'https://www.instagram.com/wildrootsgardenandgifts',
        usePicktime: false,
        picktimeUrl: ''
      });
      console.log('✅ Default settings created');
    } else {
      console.log('ℹ️  Settings already exist');
    }

    // Create default hours
    const existingHours = await Hours.find();
    if (existingHours.length === 0) {
      const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const hoursData = daysOfWeek.map(day => ({
        dayOfWeek: day,
        openTime: day === 'Sunday' ? '10:00' : '09:00',
        closeTime: day === 'Sunday' ? '16:00' : '18:00',
        isClosed: false,
        isSpecial: false
      }));
      
      await Hours.insertMany(hoursData);
      console.log('✅ Default hours created');
    } else {
      console.log('ℹ️  Hours already exist');
    }

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Login credentials:');
    console.log('   Email: admin@wildroots.com');
    console.log('   Password: admin123');
    console.log('\n⚠️  IMPORTANT: Change the admin password in production!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();