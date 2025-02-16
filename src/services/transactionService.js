const Transaction = require("../models/transactionModel");

/**
 * Membuat akun baru
 * @param {Object} transactionData - Data akun (user_id, account_id, transaction_type, amount, description)
 * @returns {Object} - Akun yang telah dibuat
 */
const createTransaction = async (transactionData) => {
  return await Transaction.create(transactionData);
};

/**
 * Mendapatkan semua akun atau berdasarkan user_id
 * @param {number} userId - ID user (opsional)
 * @returns {Array} - Daftar akun
 */
const getTransactions = async (userId = null) => {
  const whereCondition = userId ? { user_id: userId } : {};
  return await Transaction.findAll({ where: whereCondition });
};

/**
 * Mendapatkan akun berdasarkan ID
 * @param {number} id - ID akun
 * @returns {Object} - Akun yang ditemukan
 */
const getTransactionById = async (id) => {
  return await Transaction.findByPk(id);
};

/**
 * Mengupdate akun berdasarkan ID
 * @param {number} id - ID akun
 * @param {Object} updateData - Data yang akan diupdate
 * @returns {Object} - Akun yang telah diperbarui
 */
const updateTransaction = async (id, updateData) => {
  const account = await Transaction.findByPk(id);
  if (!account) {
    throw new Error("Account not found");
  }
  await account.update(updateData);
  return account;
};

/**
 * Menghapus akun berdasarkan ID
 * @param {number} id - ID akun
 * @returns {boolean} - Status penghapusan
 */
const deleteTransaction = async (id) => {
  const deleted = await Transaction.destroy({ where: { id } });
  return deleted > 0;
};

module.exports = {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};
