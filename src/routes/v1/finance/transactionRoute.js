const express = require("express");
const { createTransaction, getAllTransactions, getTransactionById, updateTransaction, deleteTransaction } = require("../../../controllers/transactionController");
const { authMiddleware } = require("../../../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, createTransaction);
router.get("/", authMiddleware, getAllTransactions);
router.get("/:id", authMiddleware, getTransactionById);
router.put("/:id", authMiddleware, updateTransaction);
router.delete("/:id", authMiddleware, deleteTransaction);

module.exports = router;
