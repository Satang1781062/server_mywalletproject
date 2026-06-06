const db = require("../models");
const Category = db.Category;

// GET /api/categories
exports.getAll = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      where: { userId: req.user.id },
      order: [["type", "ASC"], ["name", "ASC"]],
    });
    res.json(categories);
  } catch (err) { next(err); }
};

// POST /api/categories
exports.create = async (req, res, next) => {
  try {
    const { name, type, icon, color } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });
    if (!type) return res.status(400).json({ message: "Type is required" });

    const exists = await Category.findOne({
      where: { userId: req.user.id, name, type },
    });
    if (exists) return res.status(400).json({ message: "Category นี้มีอยู่แล้ว" });

    const category = await Category.create({
      userId: req.user.id, name, type,
      icon:  icon  || "📂",
      color: color || "#378ADD",
    });
    res.status(201).json(category);
  } catch (err) { next(err); }
};

// PUT /api/categories/:id
exports.update = async (req, res, next) => {
  try {
    const category = await Category.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!category) return res.status(404).json({ message: "Category not found" });
    const { name, type, icon, color } = req.body;
    await category.update({ name, type, icon, color });
    res.json(category);
  } catch (err) { next(err); }
};

// DELETE /api/categories/:id
exports.remove = async (req, res, next) => {
  try {
    const category = await Category.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!category) return res.status(404).json({ message: "Category not found" });
    await category.destroy();
    res.json({ message: "Deleted" });
  } catch (err) { next(err); }
};