const constCreateDog = require("../controllers/contCreateDog");
const { Dog, Temperament, sequelize } = require("../db");

const createDog = async (req, res) => {
  try {
    const { name, id, height, life_span, image, temperament } = req.body;
    // console.log(req.body);
    const newDog = await constCreateDog(name, id, height, life_span, image);

    if (temperament && temperament.length > 0) {
      const temperamentIds = await Temperament.findAll({
        where: {
          name: temperament,
        },
        attributes: ["id"],
      });

      // Extract temperament IDs from the result
      const ids = temperamentIds.map((temp) => temp.id);

      // Associate the dog with the specified temperaments
      await newDog.setTemperaments(ids);
    }

    res.status(200).json({ newDog, message: "Creation Successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = createDog;
