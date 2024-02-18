// postRoutes.js

const express = require('express');
const router = express.Router();
const { upload } = require('../middleware/upload');
const { authenticateUser } = require('../middleware/authMiddleware');
const {
  uploadImage,
  getPostById,
  editPost,
  deletePost,
  getPostsByUserId
} = require('../controllers/postController'); 

// Endpoint untuk mengunggah gambar ke server
router.post('/upload', authenticateUser, upload.single('image'), uploadImage);

// Endpoint untuk mengambil detail gambar tertentu
router.get('/:postId', getPostById);

// Endpoint untuk mengedit detail gambar tertentu
router.put('/:postId/edit', authenticateUser, editPost); // Pastikan menambahkan authenticateUser di sini

// Endpoint untuk menghapus gambar tertentu
router.delete('/:postId/delete', authenticateUser, deletePost);

// Endpoint untuk mendapatkan semua gambar yang diunggah oleh pengguna tertentu
router.get('/user/:userId', getPostsByUserId);

// Endpoint untuk mendapatkan umpan gambar dari semua pengguna yang diikuti oleh pengguna tertentu

module.exports = router;
