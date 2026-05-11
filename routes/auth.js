const express = require("express");
const router = express.Router();
const { authCheck } = require("../middleware/auth");

const {
  register,
  login,
  currentUser
} = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.get(
  "/current-user",
  authCheck,
  currentUser,
);

module.exports = router;