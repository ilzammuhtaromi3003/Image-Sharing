//middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config(); // Mengimpor konfigurasi dari .env

const JWT_SECRET = process.env.JWT_SECRET; // Mengambil JWT_SECRET dari variabel lingkungan
async function authenticateUser(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.error("Authentication failed: Authorization header is missing or invalid");
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const userId = decoded.userId;

    // Cek apakah user dengan ID sesuai ada di database
    const user = await prisma.user.findUnique({
      where: { user_id: userId },
    });

    if (!user) {
      console.error("Authentication failed: User not found in the database");
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Menambahkan informasi user ke objek req untuk digunakan oleh handler rute selanjutnya
    req.user = user;

    console.log("User authenticated successfully");
    // Melanjutkan ke handler rute selanjutnya
    next();
  } catch (error) {
    console.error("Authentication failed:", error.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = { authenticateUser };
