const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/add', categoryController.addCategory);
router.get('/search', categoryController.searchPosts);
router.get('/categories', categoryController.getCategories);
router.get('/categories/:categoryId', categoryController.getPostsByCategory);

module.exports = router;
