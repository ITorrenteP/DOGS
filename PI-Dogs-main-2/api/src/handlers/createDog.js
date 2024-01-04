const constCreateDog = require("../controllers/contCreateDog");
const { Dog, Temperament, sequelize } = require("../db");

const createDog = async (req, res) => {
  try {
    const { name, height, weight, life_span, image, temperament } = req.body;

    const newDog = await constCreateDog(
      name,
      height,
      weight,
      life_span,
      image,
      temperament
    );

    if (temperament && temperament.length > 0) {
      const temperamentIds = await Temperament.findAll({
        where: {
          name: temperament,
        },
        attributes: ["id"],
      });

      const ids = temperamentIds.map((temp) => temp.id);

      await newDog.setTemperaments(ids);
    }

    res.status(200).json({ newDog, message: "Creation Successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = createDog;
