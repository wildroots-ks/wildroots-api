const mongoose = require('mongoose');

const pageContentSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
    enum: ['home', 'about', 'classes', 'hours', 'sales', 'new', 'contact']
  },
  section: {
    type: String,
    required: true
  },
  contentType: {
    type: String,
    required: true,
    enum: ['text', 'heading', 'image', 'hero']
  },
  content: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  order: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('PageContent', pageContentSchema);