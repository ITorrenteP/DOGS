const { Dog } = require("../db");

const constCreateDog = async (name, height, weight, life_span, image) => {
  try {
    const newDog = await Dog.create({
      name,
      height,
      weight,
      life_span,
      image,
    });
    // console.log(newDog);
    return newDog;
  } catch (error) {
    // res.status(400).json({ error: error.message });
    throw error;
  }
};

module.exports = constCreateDog;
