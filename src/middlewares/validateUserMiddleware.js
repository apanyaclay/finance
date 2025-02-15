const {
  sanitizeString,
  sanitizeEmail,
  sanitizePhone,
} = require("../utils/sanitizeUtils");

exports.registerValidate = function (req, res, next) {
  const requiredFields = ["name", "email", "password", "phone"];
  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res
      .status(400)
      .json({ error: `Fields ${missingFields.join(", ")} are required` });
  }

  const { name, email, phone } = req.body;

  nameClean = sanitizeString(name);
  emailClean = sanitizeEmail(email);
  phoneClean = sanitizePhone(phone);

  // Validasi format email
  if (!emailClean) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // Validasi phone harus angka
  if (!phoneClean) {
    return res.status(400).json({ error: "Phone must be a valid number" });
  }

  next(); // Lanjut ke middleware berikutnya atau controller jika validasi berhasil
};

exports.loginValidate = function (req, res, next) {
  const requiredFields = ["email", "password"];
  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res
      .status(400)
      .json({ error: `Fields ${missingFields.join(", ")} are required` });
  }

  const { email } = req.body;
  emailClean = sanitizeEmail(email);

  // Validasi format email
  if (!emailClean) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  next(); // Lanjut ke middleware berikutnya atau controller jika validasi berhasil
};

exports.updateValidate = function (req, res, next) {
  const { email, phone } = req.body;

  emailClean = sanitizeEmail(email);
  phoneClean = sanitizePhone(phone);

  // Validasi format email
  if (!emailClean) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // Validasi phone harus angka
  if (!phoneClean) {
    return res.status(400).json({ error: "Phone must be a valid number" });
  }

  next(); // Lanjut ke middleware berikutnya atau controller jika validasi berhasil
};
