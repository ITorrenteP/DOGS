require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;

const URL_BASE = "https://api.thedogapi.com/v1/breeds/";

const getBreeds = async (req, res) => {
  try {
    const response = await axios.get(`${URL_BASE}?api_key=${API_KEY}`);
    const dogNames = response.data.map((dog) => ({
      name: dog.name,
      // image: dog.image.url,
    }));

    res.status(200).json(dogNames);
  } catch (error) {
    console.error("Error fetching dog breeds:", error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = getBreeds;
