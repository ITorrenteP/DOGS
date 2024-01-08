const { Dog, Temperament, sequelize } = require("../db");

const deleteDogById = async (id) => {
  const dog = await Dog.findByPk(id);
  try {
    if (dog) {
      await dog.destroy();
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = deleteDogById;
