const sanitizeHtml = require("sanitize-html");

/**
 * Membersihkan string input dari karakter berbahaya
 * @param {string} value - String yang akan disanitasi
 * @returns {string} - String yang sudah bersih
 */
const sanitizeString = (value) => {
  return sanitizeHtml(value, {
    allowedTags: [], // Hapus semua tag HTML
    allowedAttributes: {} // Hapus semua atribut
  }).trim();
};

/**
 * Membersihkan dan memvalidasi email
 * @param {string} email - Email yang akan disanitasi
 * @returns {string|null} - Email yang sudah bersih atau null jika tidak valid
 */
const sanitizeEmail = (email) => {
  const cleanEmail = sanitizeString(email);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) ? cleanEmail : null;
};

/**
 * Membersihkan dan memvalidasi nomor telepon
 * @param {string} phone - Nomor telepon yang akan disanitasi
 * @returns {string|null} - Nomor telepon yang sudah bersih atau null jika tidak valid
 */
const sanitizePhone = (phone) => {
  const cleanPhone = sanitizeString(phone).replace(/\D/g, ""); // Hapus semua karakter non-angka
  return cleanPhone.length >= 10 ? cleanPhone : null;
};

module.exports = {
  sanitizeString,
  sanitizeEmail,
  sanitizePhone
};
