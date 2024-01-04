const { Op } = require("sequelize");
const { Dog, Temperament, sequelize } = require("../db");

const findDogsByIdDataBase = async (id) => {
  const dog = await Dog.findByPk(id, {
    include: {
      model: Temperament,
      atributes: ["name"],
    },
  });
  if (dog) {
    return dog;
  } else {
    return null;
  }
};

module.exports = findDogsByIdDataBase;
