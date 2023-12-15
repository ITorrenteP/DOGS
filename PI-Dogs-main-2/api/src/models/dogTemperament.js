const { Sequelize, DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const dogTemperaments = sequelize.define(
    "dog_temperament",
    {},
    { timestamps: false }
  );
};
