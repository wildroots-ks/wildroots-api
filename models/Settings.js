const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  storeName: {
    type: String,
    required: true,
    default: 'Wild Roots Garden & Gifts'
  },
  tagline: {
    type: String,
    required: true,
    default: 'Garden center and retail gifts'
  },
  address: {
    type: String,
    required: true,
    default: '1201 E U.S. 24 Hwy'
  },
  phone: {
    type: String,
    required: true,
    default: '(785) 890-2027'
  },
  email: {
    type: String,
    required: true,
    default: 'info@wildrootsgarden.com'
  },
  facebook: {
    type: String,
    default: 'https://www.facebook.com/share/1G7fvpezSY/?mibextid=wwXIfr'
  },
  instagram: {
    type: String,
    default: 'https://www.instagram.com/wildrootsgardenandgifts'
  },
  usePicktime: {
    type: Boolean,
    default: false
  },
  picktimeUrl: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Settings', settingsSchema);