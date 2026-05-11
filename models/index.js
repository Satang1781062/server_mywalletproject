const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const db = {};

// ================= 🔹 IMPORT MODELS =================
db.User = require("./User")(sequelize, DataTypes);
db.Category = require("./Category")(sequelize, DataTypes);
db.Wallet = require("./Wallet")(
  sequelize,
  DataTypes
);

// ================= 🔹 ASSOCIATIONS =================
// ใส่ relation ต่าง ๆ ตรงนี้ภายหลัง
db.User.hasMany(db.Category, {
  foreignKey: "userId",
});

db.Category.belongsTo(db.User, {
  foreignKey: "userId",
});

db.User.hasMany(db.Wallet, {
  foreignKey: "userId",
});

db.Wallet.belongsTo(db.User, {
  foreignKey: "userId",
});


// ================= 🔹 EXPORT =================]
db.sequelize = sequelize;
db.Sequelize = sequelize.Sequelize;

module.exports = db;