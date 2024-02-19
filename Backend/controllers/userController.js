//userController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function loginController(req, res) {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.user_id }, "secret", {
      expiresIn: "1d",
    });

    res.status(200).json({ token, user_id: user.user_id }); // Mengirimkan user_id sebagai respons
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function registerController(req, res) {
  try {
    const { full_name, username, password, email } = req.body;

    // Hash password sebelum menyimpannya
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user baru ke database
    const newUser = await prisma.user.create({
      data: {
        full_name,
        username,
        password: hashedPassword,
        email,
      },
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

function logoutController(req, res) {
  res.status(200).json({ message: "Logout successful" });
}

async function getUserProfile(req, res) {
  try {
    const userId = parseInt(req.params.id);

    // Lakukan logika untuk mendapatkan profil pengguna dan gambar yang mereka unggah
    // Misalnya, menggunakan Prisma untuk mendapatkan data pengguna berdasarkan userId
    const user = await prisma.user.findUnique({
      where: { user_id: userId },
      include: { posts: true } // Misalnya, ambil juga data postingan pengguna
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Kirim data pengguna dan postingan sebagai respons JSON
    res.status(200).json({ user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  loginController,
  registerController,
  logoutController,
  getUserProfile
};
