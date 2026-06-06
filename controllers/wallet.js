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