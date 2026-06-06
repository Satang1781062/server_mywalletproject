const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const db = {};

// ================= 🔹 IMPORT MODELS =================
db.User        = require("./User")(sequelize, DataTypes);
db.Category    = require("./Category")(sequelize, DataTypes);
db.Wallet      = require("./Wallet")(sequelize, DataTypes);
db.Transaction = require("./Transaction")(sequelize, DataTypes);

// ================= 🔹 ASSOCIATIONS =================

// User <-> Category
db.User.hasMany(db.Category, { foreignKey: "userId" });
db.Category.belongsTo(db.User, { foreignKey: "userId" });

// User <-> Wallet
db.User.hasMany(db.Wallet, { foreignKey: "userId" });
db.Wallet.belongsTo(db.User, { foreignKey: "userId" });

// Wallet <-> Transaction
db.Wallet.hasMany(db.Transaction, { foreignKey: "walletId" });
db.Transaction.belongsTo(db.Wallet, { foreignKey: "walletId" });

// Category <-> Transaction
db.Category.hasMany(db.Transaction, { foreignKey: "categoryId" });
db.Transaction.belongsTo(db.Category, { foreignKey: "categoryId" });

// ================= 🔹 EXPORT =================
db.sequelize = sequelize;
db.Sequelize = sequelize.Sequelize;

module.exports = db;