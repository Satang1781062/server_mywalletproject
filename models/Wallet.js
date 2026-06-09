module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define(
    "Wallet",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      balance: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },

      type: {
        type: DataTypes.ENUM("cash", "bank", "e-wallet"),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: "wallets",
    },
  );

  return Wallet;
};
