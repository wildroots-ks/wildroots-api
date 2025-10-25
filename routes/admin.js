const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Settings = require('../models/Settings');
const Hours = require('../models/Hours');
const Banner = require('../models/Banner');
const Class = require('../models/Class');

// Apply auth middleware to all admin routes
router.use(authMiddleware);

// GET /api/admin/me - Get current admin user
router.get('/me', (req, res) => {
  res.json(req.user);
});

// ========== SETTINGS ==========

// PUT /api/admin/settings
router.put('/settings', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      settings = await Settings.findOneAndUpdate({}, req.body, { new: true });
    }
    
    res.json({ success: true, data: settings });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ 
      success: false,
      error: error.message || 'Error updating settings' 
    });
  }
});

// ========== HOURS ==========

// GET /api/admin/hours
router.get('/hours', async (req, res) => {
  try {
    const hours = await Hours.find().sort({ dayOfWeek: 1 });
    res.json({ success: true, data: hours });
  } catch (error) {
    console.error('Error fetching hours:', error);
    res.status(500).json({ 
      success: false,
      error: error.message || 'Error fetching hours' 
    });
  }
});

// POST /api/admin/hours
router.post('/hours', async (req, res) => {
  try {
    const hours = await Hours.create(req.body);
    res.status(201).json({ success: true, data: hours });
  } catch (error) {
    console.error('Error creating hours:', error);
    res.status(500).json({ 
      success: false,
      error: error.message || 'Error creating hours' 
    });
  }
});

// PUT /api/admin/hours/:id
router.put('/hours/:id', async (req, res) => {
  try {
    const hours = await Hours.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    if (!hours) {
      return res.status(404).json({ 
        success: false,
        error: 'Hours not found' 
      });
    }
    
    res.json({ success: true, data: hours });
  } catch (error) {
    console.error('Error updating hours:', error);
    res.status(500).json({ 
      success: false,
      error: error.message || 'Error updating hours' 
    });
  }
});

// DELETE /api/admin/hours/:id
router.delete('/hours/:id', async (req, res) => {
  try {
    const hours = await Hours.findByIdAndDelete(req.params.id);
    
    if (!hours) {
      return res.status(404).json({ 
        success: false,
        error: 'Hours not found' 
      });
    }
    
    res.json({ 
      success: true,
      message: 'Hours deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting hours:', error);
    res.status(500).json({ 
      success: false,
      error: error.message || 'Error deleting hours' 
    });
  }
});

// ========== BANNERS ==========

// GET /api/admin/banners
router.get('/banners', async (req, res) => {
  try {
    const banners = await Banner.find().sort({ order: 1 });
    const mappedBanners = banners.map(banner => ({
      ...banner.toObject(),
      id: banner._id.toString()
    }));
    res.json({ success: true, data: mappedBanners });
  } catch (error) {
    console.error('Error fetching banners:', error);
    res.status(500).json({ 
      success: false,
      error: error.message || 'Error fetching banners' 
    });
  }
});

// POST /api/admin/banners
router.post('/banners', async (req, res) => {
  try {
    const banner = await Banner.create(req.body);
    res.status(201).json({ success: true, data: banner });
  } catch (error) {
    console.error('Error creating banner:', error);
    res.status(500).json({ 
      success: false,
      error: error.message || 'Error creating banner' 
    });
  }
});

// PUT /api/admin/banners/:id
router.put('/banners/:id', async (req, res) => {
  try {
    const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    if (!banner) {
      return res.status(404).json({ 
        success: false,
        error: 'Banner not found' 
      });
    }
    
    res.json({ success: true, data: banner });
  } catch (error) {
    console.error('Error updating banner:', error);
    res.status(500).json({ 
      success: false,
      error: error.message || 'Error updating banner' 
    });
  }
});

// DELETE /api/admin/banners/:id
router.delete('/banners/:id', async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    
    if (!banner) {
      return res.status(404).json({ 
        success: false,
        error: 'Banner not found' 
      });
    }
    
    res.json({ 
      success: true,
      message: 'Banner deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting banner:', error);
    res.status(500).json({ 
      success: false,
      error: error.message || 'Error deleting banner' 
    });
  }
});

// ========== CLASSES ==========

// GET /api/admin/classes
router.get('/classes', async (req, res) => {
  try {
    const classes = await Class.find().sort({ date: 1 });
    res.json({ success: true, data: classes });
  } catch (error) {
    console.error('Error fetching classes:', error);
    res.status(500).json({ 
      success: false,
      error: error.message || 'Error fetching classes' 
    });
  }
});

// POST /api/admin/classes
router.post('/classes', async (req, res) => {
  try {
    const classItem = await Class.create(req.body);
    res.status(201).json({ success: true, data: classItem });
  } catch (error) {
    console.error('Error creating class:', error);
    res.status(500).json({ 
      success: false,
      error: error.message || 'Error creating class' 
    });
  }
});

// PUT /api/admin/classes/:id
router.put('/classes/:id', async (req, res) => {
  try {
    // If slug hasn't changed, remove it from update to avoid duplicate key error
    const existingClass = await Class.findById(req.params.id);
    if (existingClass && existingClass.slug === req.body.slug) {
      delete req.body.slug;
    }
    
    const classItem = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    
    if (!classItem) {
      return res.status(404).json({ 
        success: false,
        error: 'Class not found' 
      });
    }
    
    res.json({ success: true, data: classItem });
  } catch (error) {
    console.error('Error updating class:', error);
    res.status(500).json({ 
      success: false,
      error: error.message || 'Error updating class' 
    });
  }
});

// DELETE /api/admin/classes/:id
router.delete('/classes/:id', async (req, res) => {
  try {
    const classItem = await Class.findByIdAndDelete(req.params.id);
    
    if (!classItem) {
      return res.status(404).json({ 
        success: false,
        error: 'Class not found' 
      });
    }
    
    res.json({ 
      success: true,
      message: 'Class deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting class:', error);
    res.status(500).json({ 
      success: false,
      error: error.message || 'Error deleting class' 
    });
  }
});

module.exports = router;