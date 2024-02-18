//categoryController.js

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addCategory(req, res) {
    try {
        const { category_name } = req.body;

        const category = await prisma.category.create({
            data: {
                category_name: category_name // Use the value received from req.body.category_name
            }
        });

        res.json({ message: 'Category added successfully', category });
    } catch (error) {
        console.error('Error in adding category:', error);
        res.status(500).json({ message: 'Failed to add category' });
    }
}

async function searchPosts(req, res) {
    try {
        const { keyword, categoryId } = req.query;

        let posts;

        if (categoryId) {
            posts = await prisma.post.findMany({
                where: {
                    AND: [
                        { description: { contains: keyword } },
                        { category_id: parseInt(categoryId) }
                    ],
                },
            });
        } else {
            posts = await prisma.post.findMany({
                where: {
                    description: { contains: keyword },
                },
            });
        }

        res.json({ posts });
    } catch (error) {
        console.error('Error in searching posts:', error);
        res.status(500).json({ message: 'Failed to search posts' });
    }
}

async function getCategories(req, res) {
    try {
        const categories = await prisma.category.findMany();

        res.json({ categories });
    } catch (error) {
        console.error('Error in getting categories:', error);
        res.status(500).json({ message: 'Failed to get categories' });
    }
}

async function getPostsByCategory(req, res) {
    try {
        const { categoryId } = req.params;

        const posts = await prisma.post.findMany({
            where: {
                category_id: parseInt(categoryId),
            },
        });

        res.json({ posts });
    } catch (error) {
        console.error('Error in getting posts by category:', error);
        res.status(500).json({ message: 'Failed to get posts by category' });
    }
}

module.exports = { addCategory, searchPosts, getCategories, getPostsByCategory };
