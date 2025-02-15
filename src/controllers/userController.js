const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerUser, loginUser } = require("../services/userService");

// CREATE - Registrasi User
exports.registerUser = async function (req, res, next) {
  try {
    const userRegister = await registerUser(req.body);
    res
      .status(201)
      .json({
        message:
          "User created successfully. Check your email for confirmation.",
          userRegister,
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// LOGIN - Verifikasi Password
exports.loginUser = async function (req, res, next) {
  try {
    const userLogin = await loginUser(req.body);
    res.json({
      message: "Login successful",
      token: userLogin.token,
      user: {
        id: userLogin.id,
        name: userLogin.name,
        email: userLogin.email,
        phone: userLogin.phone,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ - Ambil Semua User
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE - Update User
exports.updateUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Cek apakah user ada
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let updatedData = { name, email, password, phone };
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    await User.update(updatedData, { where: { id: req.params.id } });

    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE - Hapus User
exports.deleteUser = async (req, res) => {
  try {
    // Cek apakah user ada
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await User.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
