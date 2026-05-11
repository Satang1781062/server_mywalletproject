const db = require("../models");

const Category = db.Category;

// ================= CREATE =================
exports.createCategory = async (
  req,
  res
) => {
  try {
    const category = await Category.create({
      ...req.body,
      userId: req.user.id,
    });

    res.json(category);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GET ALL =================
exports.getCategories = async (
  req,
  res
) => {
  try {
    const categories =
      await Category.findAll({
        where: {
          userId: req.user.id,
        },
      });

    res.json(categories);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};