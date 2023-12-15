const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Temperament = sequelize.define(
    "temperament",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
