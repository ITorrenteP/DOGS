require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;

const URL_BASE = "https://api.thedogapi.com/v1/breeds/";

const breedsById = async (req, res) => {
  const { id } = req.params;
  const ID = id;

  try {
    const response = await axios.get(`${URL_BASE}${ID}?api_key=${API_KEY}`);

    const {
      id,
      name,
      reference_image_id,
      image,
      height,
      life_span,
      temperament,
    } = response.data;

    const dog = {
      id,
      name,
      height,
      life_span,
      temperament,
      reference_image_id,
      image,
    };
    if (dog.id) return res.status(200).json(dog);
    else throw Error("Breed not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = breedsById;
