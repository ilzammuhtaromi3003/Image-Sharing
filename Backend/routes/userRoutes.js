//userRoutes.js

const express = require('express');
const router = express.Router();
const { loginController, registerController, logoutController, getUserProfile } = require('../controllers/userController');
const { authenticateUser } = require('../middleware/authMiddleware');

// Endpoint untuk login
router.post('/login', loginController);

// Endpoint untuk register
router.post('/register', registerController);

// Endpoint untuk logout
router.post('/logout', logoutController);

// Endpoint untuk menampilkan profil pengguna, termasuk gambar yang mereka unggah
router.get('/profile/:id', authenticateUser, getUserProfile);

// Endpoint yang memerlukan autentikasi token
// router.get('/protected-route', authenticateUser, (req, res) => {
//   res.status(200).json({ message: 'This is a protected route for authenticated users.' });
// });

module.exports = router;
