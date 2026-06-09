const db = require("../models");
const Transaction = db.Transaction;
const Wallet      = db.Wallet;
const Category    = db.Category;
const { Op }      = require("sequelize");

// GET /api/transactions
exports.getAll = async (req, res, next) => {
  try {
    // หา walletId ทั้งหมดของ user นี้
    const wallets = await Wallet.findAll({
      where: { userId: req.user.id },
      attributes: ["id"],
    });
    const walletIds = wallets.map((w) => w.id);

    const transactions = await Transaction.findAll({
      where: { walletId: { [Op.in]: walletIds } },
      include: [
        { model: Wallet,   attributes: ["id", "name", "type"] },
        { model: Category, attributes: ["id", "name", "icon", "color", "type"] },
      ],
      order: [["date", "DESC"], ["createdAt", "DESC"]],
    });
    res.json(transactions);
  } catch (err) { next(err); }
};

// POST /api/transactions
exports.create = async (req, res, next) => {
  try {
    const { walletId, categoryId, type, amount, note, date } = req.body;

    if (!walletId)   return res.status(400).json({ message: "walletId is required" });
    if (!categoryId) return res.status(400).json({ message: "categoryId is required" });
    if (!type)       return res.status(400).json({ message: "type is required" });
    if (!amount)     return res.status(400).json({ message: "amount is required" });

    // ตรวจว่า wallet เป็นของ user นี้จริง
    const wallet = await Wallet.findOne({
      where: { id: walletId, userId: req.user.id },
    });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    // สร้าง transaction
    const transaction = await Transaction.create({
      walletId, categoryId, type,
      amount: parseFloat(amount),
      note:   note || null,
      date:   date || new Date(),
    });

    // อัปเดต balance wallet
    const diff = type === "income" ? +amount : -amount;
    await wallet.update({ balance: parseFloat(wallet.balance) + diff });

    // return พร้อม include
    const result = await Transaction.findByPk(transaction.id, {
      include: [
        { model: Wallet,   attributes: ["id", "name", "type"] },
        { model: Category, attributes: ["id", "name", "icon", "color", "type"] },
      ],
    });
    res.status(201).json(result);
  } catch (err) { next(err); }
};

// PUT /api/transactions/:id
exports.update = async (req, res, next) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    // ตรวจ ownership ผ่าน wallet
    const wallet = await Wallet.findOne({
      where: { id: transaction.walletId, userId: req.user.id },
    });
    if (!wallet) return res.status(403).json({ message: "Forbidden" });

    const { note, date } = req.body;  // แก้ได้แค่ note กับ date
    await transaction.update({ note, date });

    const result = await Transaction.findByPk(transaction.id, {
      include: [
        { model: Wallet,   attributes: ["id", "name", "type"] },
        { model: Category, attributes: ["id", "name", "icon", "color", "type"] },
      ],
    });
    res.json(result);
  } catch (err) { next(err); }
};

// DELETE /api/transactions/:id
exports.remove = async (req, res, next) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    const wallet = await Wallet.findOne({
      where: { id: transaction.walletId, userId: req.user.id },
    });
    if (!wallet) return res.status(403).json({ message: "Forbidden" });

    // คืน balance กลับ
    const diff = transaction.type === "income"
      ? -transaction.amount
      : +transaction.amount;
    await wallet.update({ balance: parseFloat(wallet.balance) + diff });

    await transaction.destroy();
    res.json({ message: "Deleted" });
  } catch (err) { next(err); }
};