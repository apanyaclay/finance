const express = require("express");
const { createAccount, getAccounts, getAccountById, updateAccount, deleteAccount } = require("../../../controllers/accountController");
const { authMiddleware } = require("../../../middlewares/authMiddleware");
const router = express.Router();

// Route CRUD
router.post("/", authMiddleware, createAccount); // Create account
router.get("/", authMiddleware, getAccounts); // Get all accounts
router.get("/:id", authMiddleware, getAccountById); // Get account by ID
router.put("/:id", authMiddleware, updateAccount); // Update account
router.delete("/:id", authMiddleware, deleteAccount); // Delete account

module.exports = router;
