const { createAccount, getAccounts, getAccountById, updateAccount, deleteAccount } = require("../services/accountService");

/**
 * Controller untuk membuat akun baru
 */
exports.createAccount = async (req, res) => {
  try {
    const account = await createAccount(req.body);
    res.status(201).json({ message: "Account created successfully", account });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controller untuk mendapatkan semua akun atau berdasarkan user_id
 */
exports.getAccounts = async (req, res) => {
  try {
    const { user_id } = req.query;
    const accounts = await getAccounts(user_id);
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controller untuk mendapatkan akun berdasarkan ID
 */
exports.getAccountById = async (req, res) => {
  try {
    const account = await getAccountById(req.params.id);
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controller untuk mengupdate akun berdasarkan ID
 */
exports.updateAccount = async (req, res) => {
  try {
    const account = await updateAccount(req.params.id, req.body);
    res.status(200).json({ message: "Account updated successfully", account });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller untuk menghapus akun berdasarkan ID
 */
exports.deleteAccount = async (req, res) => {
  try {
    const deleted = await deleteAccount(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Account not found" });
    }
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
