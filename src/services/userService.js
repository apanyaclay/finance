const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { sendRegistrationEmail } = require("./emailService");
const jwt = require("jsonwebtoken");

/**
 * Mendaftarkan user baru
 * @param {Object} userData - Data user (name, email, password, phone)
 * @returns {Object} - User yang telah dibuat
 */
const registerUser = async (userData) => {
  try {
    const { name, email, password, phone } = userData;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("Email already exists");
    }
    const existingPhone = await User.findOne({ where: { phone } });
    if (existingPhone) {
      throw new Error("Phone already exists");
    }

    // Hash password sebelum disimpan
    const passwordHash = await bcrypt.hash(password, 10);

    // Simpan user ke database
    const user = await User.create({
      name,
      email,
      password: passwordHash,
      phone,
    });

    // Kirim email notifikasi
    await sendRegistrationEmail(email, name);

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Login user
 * @param {Object} userData - Data user (email, password)
 * @returns {Object} - User yang telah login
 */
const loginUser = async (userData) => {
  try {
    const { email, password } = userData;

    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      throw new Error("User not found");
    }

    // Periksa apakah password cocok
    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const user = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      phone: existingUser.phone,
      token,
    };

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { registerUser, loginUser };
