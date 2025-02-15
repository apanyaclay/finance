const express = require("express");
const { createAccount, getAccounts, getAccountById, updateAccount, deleteAccount } = require("../../../controllers/accountController");
const router = express.Router();

// Route CRUD
router.post("/", createAccount); // Create account
router.get("/", getAccounts); // Get all accounts
router.get("/:id", getAccountById); // Get account by ID
router.put("/:id", updateAccount); // Update account
router.delete("/:id", deleteAccount); // Delete account

module.exports = router;
