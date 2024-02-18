// postController.js

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function uploadImage(req, res) {
  try {
    const user = req.user; // Mengambil informasi user dari middleware authenticateUser
    const { filename } = req.file; // Hanya ambil nama file

    // Pastikan userId tidak kosong sebelum membuat posting baru
    if (!user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { description, category_id } = req.body; // Menambahkan category_id dari request body

    const post = await prisma.post.create({
      data: {
        user: { connect: { user_id: user.user_id } },
        description,
        image: filename, // Simpan hanya nama file
        category: { connect: { category_id: parseInt(category_id) } },
      },
    });

    res.json({ message: 'Image uploaded successfully', post });
  } catch (error) {
    console.error('Error in uploading image:', error);
    res.status(500).json({ message: 'Failed to upload image' });
  }
}

async function getPostById(req, res) {
  const { postId } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: {
        post_id: parseInt(postId)
      }
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ post });
  } catch (error) {
    console.error('Error in getting post by id:', error);
    res.status(500).json({ message: 'Failed to get post' });
  }
}

async function editPost(req, res) {
  const { postId } = req.params;
  const { description } = req.body;

  try {
    const updatedPost = await prisma.post.update({
      where: { post_id: parseInt(postId) },
      data: { description },
    });

    res.json({ message: 'Post updated successfully', post: updatedPost });
  } catch (error) {
    console.error('Error in updating post:', error);
    res.status(500).json({ message: 'Failed to update post' });
  }
}

async function deletePost(req, res) {
  const { postId } = req.params;

  try {
    await prisma.post.delete({
      where: { post_id: parseInt(postId) },
    });

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error in deleting post:', error);
    res.status(500).json({ message: 'Failed to delete post' });
  }
}

async function getPostsByFullName(req, res) {
  const { fullName } = req.params;

  try {
    // Dapatkan user berdasarkan full name
    const user = await prisma.user.findFirst({
      where: {
        full_name: fullName,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Dapatkan semua postingan yang dimiliki oleh user dengan user_id tersebut
    const userPosts = await prisma.post.findMany({
      where: {
        user_id: user.user_id,
      },
    });

    res.json({ userPosts });
  } catch (error) {
    console.error('Error in getting user posts by full name:', error);
    res.status(500).json({ message: 'Failed to get user posts by full name' });
  }
}
async function getAllPosts(req, res) {
  try {
    const allPosts = await prisma.post.findMany({
      include: {
        user: true, // Sertakan informasi lengkap tentang pengguna yang membuat posting
      },
    });

    res.json({ allPosts });
  } catch (error) {
    console.error('Error in getting all posts:', error);
    res.status(500).json({ message: 'Failed to get all posts' });
  }
}



module.exports = { uploadImage, getPostById, editPost, deletePost, getPostsByFullName, getAllPosts};
