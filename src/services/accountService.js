const Account = require("../models/accountModel");

/**
 * Membuat akun baru
 * @param {Object} accountData - Data akun (user_id, account_name, account_type, balance)
 * @returns {Object} - Akun yang telah dibuat
 */
const createAccount = async (accountData) => {
  return await Account.create(accountData);
};

/**
 * Mendapatkan semua akun atau berdasarkan user_id
 * @param {number} userId - ID user (opsional)
 * @returns {Array} - Daftar akun
 */
const getAccounts = async (userId = null) => {
  const whereCondition = userId ? { user_id: userId } : {};
  return await Account.findAll({ where: whereCondition });
};

/**
 * Mendapatkan akun berdasarkan ID
 * @param {number} id - ID akun
 * @returns {Object} - Akun yang ditemukan
 */
const getAccountById = async (id) => {
  return await Account.findByPk(id);
};

/**
 * Mengupdate akun berdasarkan ID
 * @param {number} id - ID akun
 * @param {Object} updateData - Data yang akan diupdate
 * @returns {Object} - Akun yang telah diperbarui
 */
const updateAccount = async (id, updateData) => {
  const account = await Account.findByPk(id);
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
const deleteAccount = async (id) => {
  const deleted = await Account.destroy({ where: { id } });
  return deleted > 0;
};

module.exports = {
  createAccount,
  getAccounts,
  getAccountById,
  updateAccount,
  deleteAccount,
};
