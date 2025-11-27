const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const auth = require('../middleware/auth');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer to use Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wildroots',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [{ width: 2000, height: 2000, crop: 'limit' }]
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Upload single image
router.post('/image', auth, upload.single('image'), (req, res) => {
  try {
    console.log('🔥 Upload attempt - req.file:', req.file);
    console.log('🔥 Cloudinary config:', { 
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      has_api_key: !!process.env.CLOUDINARY_API_KEY,
      has_api_secret: !!process.env.CLOUDINARY_API_SECRET
    });
    
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Cloudinary URL is in req.file.path
    res.json({
      message: 'Image uploaded successfully',
      imageUrl: req.file.path,
      filename: req.file.filename
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

// Get all images from Cloudinary
router.get('/images', auth, async (req, res) => {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'wildroots/',
      max_results: 100
    });

    const images = result.resources.map(resource => ({
      filename: resource.public_id,
      url: resource.secure_url,
      uploadedAt: resource.created_at
    }));

    res.json(images);
  } catch (error) {
    console.error('Fetch images error:', error);
    res.status(500).json({ message: 'Failed to fetch images', error: error.message });
  }
});

// Delete image from Cloudinary
router.delete('/image/:publicId', auth, async (req, res) => {
  try {
    const publicId = req.params.publicId.replace(/_/g, '/'); // Convert back to folder structure
    await cloudinary.uploader.destroy(publicId);
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Delete failed', error: error.message });
  }
});

module.exports = router;