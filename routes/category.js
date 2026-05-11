const express = require("express");

const router = express.Router();

const {
  createCategory,
  getCategories,
} = require("../controllers/category");

const {
  authCheck,
} = require("../middleware/auth");

// ================= CATEGORY =================
router.post(
  "/category",
  authCheck,
  createCategory
);

router.get(
  "/categories",
  authCheck,
  getCategories
);

module.exports = router;