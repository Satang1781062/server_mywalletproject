const express = require("express");

const router = express.Router();

const {
  createWallet,
  getWallets,
} = require("../controllers/wallet");

const {
  authCheck,
} = require("../middleware/auth");

// ================= WALLET =================
router.post(
  "/wallet",
  authCheck,
  createWallet
);

router.get(
  "/wallets",
  authCheck,
  getWallets
);

module.exports = router;