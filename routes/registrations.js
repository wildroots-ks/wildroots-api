const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const Class = require('../models/Class');

router.post('/', async (req, res) => {
  try {
    const { classId, name, email, phone, seats, notes } = req.body;
    
    const classItem = await Class.findById(classId);
    if (!classItem) {
      return res.status(404).json({ success: false, error: 'Class not found' });
    }
    
    const registration = await Registration.create({
      classId,
      className: classItem.title,
      classDate: classItem.date,
      name,
      email,
      phone,
      seats: seats || 1,
      notes: notes || ''
    });
    
    res.json({ success: true, message: 'Registration successful!', data: registration });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;