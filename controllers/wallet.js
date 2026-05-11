const db = require("../models");

const Wallet = db.Wallet;

// ================= CREATE =================
exports.createWallet = async (
  req,
  res
) => {
  try {
    const wallet = await Wallet.create({
      ...req.body,
      userId: req.user.id,
    });

    res.json(wallet);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GET ALL =================
exports.getWallets = async (
  req,
  res
) => {
  try {
    const wallets = await Wallet.findAll({
      where: {
        userId: req.user.id,
      },
    });

    res.json(wallets);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

