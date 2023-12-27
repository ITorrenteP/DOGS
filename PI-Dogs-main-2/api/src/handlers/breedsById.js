require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const findDogsByIdDataBase = require("../controllers/contDogsById");

const URL_BASE = "https://api.thedogapi.com/v1/breeds/";

const breedsById = async (req, res) => {
  const { id } = req.params;

  try {
    const dogsIdDataBase = await findDogsByIdDataBase(id);

    if (dogsIdDataBase) {
      // If found in the database, return the result
      const {
        id,
        name,
        reference_image_id,
        image,
        height,
        weight,
        life_span,
        temperament,
      } = dogsIdDataBase;

      const dog = {
        id,
        name,
        height,
        weight,
        life_span,
        temperament,
        reference_image_id,
        image,
      };

      return res.status(200).json(dog);
    }

    const response = await axios.get(`${URL_BASE}?api_key=${API_KEY}`);

    const result = response.data.filter((elem) => elem.id === Number(id));
    // console.log(result);

    if (result.length > 0) {
      const {
        id,
        name,
        reference_image_id,
        image,
        height,
        weight,
        life_span,
        temperament,
      } = result[0];

      const dog = {
        id,
        name,
        height: height.metric,
        weight: weight.metric,
        life_span,
        temperament,
        reference_image_id,
        image: image.url,
      };

      // console.log(dog);

      return res.status(200).json(dog);
    } else {
      return res.status(404).send("Id not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = breedsById;
