const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const Hours = require('../models/Hours');
const Banner = require('../models/Banner');
const Class = require('../models/Class');
const Registration = require('../models/Registration');

router.get('/settings', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) settings = await Settings.create({});
    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching settings' });
  }
});

router.get('/hours', async (req, res) => {
  try {
    const hours = await Hours.find().sort({ dayOfWeek: 1 });
    res.json({ success: true, data: hours });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching hours' });
  }
});

router.get('/banners', async (req, res) => {
  try {
    const banners = await Banner.find({ isActive: true }).sort({ order: 1 });
    const mappedBanners = banners.map(b => ({ ...b.toObject(), id: b._id.toString() }));
    res.json({ success: true, data: mappedBanners });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching banners' });
  }
});

router.get('/classes', async (req, res) => {
  try {
    const classes = await Class.find({ isActive: true }).sort({ date: 1 });
    res.json({ success: true, data: classes });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching classes' });
  }
});

router.get('/classes/:slug', async (req, res) => {
  try {
    const classItem = await Class.findOne({ slug: req.params.slug, isActive: true });
    if (!classItem) return res.status(404).json({ success: false, message: 'Class not found' });
    res.json({ success: true, data: classItem });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching class' });
  }
});

router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message, honeypot } = req.body;
    if (honeypot) return res.status(400).json({ success: false, message: 'Invalid submission' });
    console.log('Contact form:', { name, email, phone, subject, message });
    res.json({ success: true, message: 'Message received!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error processing contact form' });
  }
});

router.post('/classes/register', async (req, res) => {
  try {
    const { classId, name, email, phone, seats, notes } = req.body;
    const classItem = await Class.findById(classId);
    if (!classItem) return res.status(404).json({ success: false, error: 'Class not found' });
    const registration = await Registration.create({
      classId, className: classItem.title, classDate: classItem.date,
      name, email, phone, seats: seats || 1, notes: notes || ''
    });
    console.log('Registration saved:', registration);
    res.json({ success: true, message: 'Registration successful!', data: registration });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;