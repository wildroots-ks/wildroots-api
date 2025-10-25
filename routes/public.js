const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const Hours = require('../models/Hours');
const Banner = require('../models/Banner');
const Class = require('../models/Class');

// GET /api/public/settings
router.get('/settings', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    
    // If no settings exist, create default
    if (!settings) {
      settings = await Settings.create({});
    }
    
    res.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching settings' 
    });
  }
});

// GET /api/public/hours
router.get('/hours', async (req, res) => {
  try {
    const hours = await Hours.find().sort({ dayOfWeek: 1 });
    res.json(hours);
  } catch (error) {
    console.error('Error fetching hours:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching hours' 
    });
  }
});

// GET /api/public/banners
router.get('/banners', async (req, res) => {
  try {
    const banners = await Banner.find({ isActive: true }).sort({ order: 1 });
    const mappedBanners = banners.map(banner => ({
      ...banner.toObject(),
      id: banner._id.toString()
    }));
    res.json(mappedBanners);
  } catch (error) {
    console.error('Error fetching banners:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching banners' 
    });
  }
});

// GET /api/public/classes
router.get('/classes', async (req, res) => {
  try {
    const classes = await Class.find({ isActive: true }).sort({ date: 1 });
    res.json(classes);
  } catch (error) {
    console.error('Error fetching classes:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching classes' 
    });
  }
});

// GET /api/public/classes/:slug
router.get('/classes/:slug', async (req, res) => {
  try {
    const classItem = await Class.findOne({ slug: req.params.slug, isActive: true });
    
    if (!classItem) {
      return res.status(404).json({ 
        success: false,
        message: 'Class not found' 
      });
    }
    
    res.json(classItem);
  } catch (error) {
    console.error('Error fetching class:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching class' 
    });
  }
});

// POST /api/public/contact
router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message, honeypot } = req.body;
    
    // Honeypot spam check
    if (honeypot) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid submission' 
      });
    }
    
    // Here you would typically send an email or save to database
    console.log('Contact form submission:', { name, email, phone, subject, message });
    
    res.json({ 
      success: true,
      message: 'Message received! We will get back to you soon.' 
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error processing contact form' 
    });
  }
});

// POST /api/public/classes/register
router.post('/classes/register', async (req, res) => {
  try {
    const { classId, name, email, phone, seats, notes } = req.body;
    
    // Here you would typically save the registration to database
    console.log('Class registration:', { classId, name, email, phone, seats, notes });
    
    res.json({ 
      success: true,
      message: 'Registration successful! We will contact you to confirm.' 
    });
  } catch (error) {
    console.error('Error processing registration:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error processing registration' 
    });
  }
});

module.exports = router;