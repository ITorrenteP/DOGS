require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Dog, Temperament } = require("../db");

const URL_BASE = "https://api.thedogapi.com/v1/breeds/";

const getBreeds = async (req, res) => {
  try {
    const apiResponse = await axios.get(`${URL_BASE}?api_key=${API_KEY}`);
    const apiDogNames = apiResponse.data.map((dog) => ({
      name: dog.name,
      image: dog.image.url,
      id: dog.id,
      temperaments: dog.temperament,
      weight: dog.weight.metric,
    }));

    const databaseDogNames = await Dog.findAll({
      include: {
        model: Temperament,
        atributes: ["name"],
      },
    });

    // console.log(databaseDogNames);

    const dataBaseWithSource = databaseDogNames.map((databaseDog) => ({
      ...databaseDog.dataValues,
      source: "database",
      temperaments: databaseDog.temperaments.map((t) => t.name).join(", "),
    }));

    const allDogNames = [...apiDogNames, ...dataBaseWithSource];
    // console.log(allDogNames);

    res.status(200).json(allDogNames);
  } catch (error) {
    console.error("Error fetching dog breeds:", error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = getBreeds;
