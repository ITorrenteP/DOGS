const { Op } = require("sequelize");
const { Dog, Temperament, sequelize } = require("../db");

const findDogsByIdDataBase = async (id) => {
  const dog = await Dog.findByPk(id, {
    include: {
      model: Temperament,
      attributes: ["name"],
    },
  });
  if (dog) {
    return dog;
  } else {
    return null;
  }
};

module.exports = findDogsByIdDataBase;
