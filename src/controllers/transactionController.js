const Transaction = require("../models/transactionModel");
const Account = require("../models/accountModel");
const User = require("../models/userModel");
const { createTransaction } = require("../services/transactionService");

/**
 * ✅ CREATE - Tambah transaksi baru
 */
exports.createTransaction = async (req, res) => {
  try {
    const { account_id, transaction_type, amount, description } = req.body;
    const data = {user_id : req.user.id, account_id, transaction_type, amount, description}

    // Cek apakah user & account valid
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const account = await Account.findByPk(account_id);
    if (!account) return res.status(404).json({ error: "Account not found" });

    // Simpan transaksi baru
    const transaction = await createTransaction(data);

    res.status(201).json({ message: "Transaction created successfully", transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * ✅ READ - Ambil semua transaksi
 */
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      include: [{
        model: User,
        attributes: { exclude: ["password"] }, // Menghapus password dari hasil query
      },
      {
        model: Account,
      },], // Include data user & account
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * ✅ READ - Ambil transaksi berdasarkan ID
 */
exports.getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByPk(id, {
      include: [{
        model: User,
        attributes: { exclude: ["password"] }, // Menghapus password dari hasil query
      },
      {
        model: Account,
      },],
    });

    if (!transaction) return res.status(404).json({ error: "Transaction not found" });

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * ✅ UPDATE - Perbarui transaksi berdasarkan ID
 */
exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { transaction_type, amount, description } = req.body;

    const transaction = await Transaction.findByPk(id);
    if (!transaction) return res.status(404).json({ error: "Transaction not found" });

    await transaction.update({ transaction_type, amount, description });

    res.json({ message: "Transaction updated successfully", transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * ✅ DELETE - Hapus transaksi berdasarkan ID
 */
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findByPk(id);
    if (!transaction) return res.status(404).json({ error: "Transaction not found" });

    await transaction.destroy();
    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
