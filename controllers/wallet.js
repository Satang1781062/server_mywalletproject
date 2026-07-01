const db     = require("../models");
const Wallet      = db.Wallet;
const Transaction = db.Transaction;

exports.getAll = async (req, res, next) => {
  try {
    const wallets = await Wallet.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "ASC"]],
    });
    res.json(wallets);
  } catch (err) { next(err); }
};

exports.getOne = async (req, res, next) => {
  try {
    const wallet = await Wallet.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });
    res.json(wallet);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const { name, balance = 0, type } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });
    if (!type) return res.status(400).json({ message: "Type is required" });
    const wallet = await Wallet.create({
      userId: req.user.id, name, balance, type,
    });
    res.status(201).json(wallet);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const wallet = await Wallet.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });
    const { name, type } = req.body;
    await wallet.update({ name, type });
    res.json(wallet);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const wallet = await Wallet.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });
    await Transaction.destroy({ where: { walletId: wallet.id } });
    await wallet.destroy();
    res.json({ message: "Wallet deleted" });
  } catch (err) { next(err); }
};

exports.transfer = async (req, res, next) => {
  try {
    const { fromWalletId, toWalletId, amount, note, date } = req.body;

    if (!fromWalletId) return res.status(400).json({ message: "fromWalletId is required" });
    if (!toWalletId)   return res.status(400).json({ message: "toWalletId is required" });
    if (!amount || +amount <= 0) return res.status(400).json({ message: "amount must be > 0" });
    if (fromWalletId === toWalletId) return res.status(400).json({ message: "ไม่สามารถโอนหา wallet เดียวกัน" });

    // ตรวจ ownership ทั้ง 2 wallet
    const fromWallet = await Wallet.findOne({ where: { id: fromWalletId, userId: req.user.id } });
    const toWallet   = await Wallet.findOne({ where: { id: toWalletId,   userId: req.user.id } });

    if (!fromWallet) return res.status(404).json({ message: "Wallet ต้นทางไม่พบ" });
    if (!toWallet)   return res.status(404).json({ message: "Wallet ปลายทางไม่พบ" });

    // เช็ค balance พอไหม
    if (parseFloat(fromWallet.balance) < parseFloat(amount)) {
      return res.status(400).json({ message: "ยอดเงินใน wallet ไม่เพียงพอ" });
    }

    // อัปเดต balance ทั้ง 2 wallet
    await fromWallet.update({ balance: parseFloat(fromWallet.balance) - parseFloat(amount) });
    await toWallet.update({   balance: parseFloat(toWallet.balance)   + parseFloat(amount) });

    res.json({
      message: "Transfer สำเร็จ",
      transfer: {
        from:   { id: fromWallet.id, name: fromWallet.name, balance: fromWallet.balance },
        to:     { id: toWallet.id,   name: toWallet.name,   balance: toWallet.balance },
        amount: parseFloat(amount),
        note:   note || null,
        date:   date || new Date(),
      },
    });
  } catch (err) { next(err); }
};