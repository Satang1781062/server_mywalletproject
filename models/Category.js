module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
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

      type: {
        type: DataTypes.ENUM(
          "income",
          "expense"
        ),
        allowNull: false,
      },

      icon: {
        type: DataTypes.STRING,
      },

      color: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
      tableName: "categories",
    }
  );

  return Category;
};