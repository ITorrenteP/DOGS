require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Op } = require("sequelize");
const { Dog, Temperament } = require("../db");

const URL_BASE = "https://api.thedogapi.com/v1/breeds/search";

const contDogsByName = async (name) => {
  try {
    name = name.toLowerCase();
    //Buscamos en BDD

    const dogsDataBase = await Dog.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: {
        model: Temperament,
        atributes: ["name"],
      },
    });

    // Buscamos en API
    const response = await axios.get(
      `${URL_BASE}?q=${name}&api_key=${API_KEY}`
    );

    const dogsApi = response.data;

    // Combinamos datos de la API y la base de datos
    const combinedData = [
      ...dogsDataBase.map((dbDog) => ({
        id: dbDog.id,
        name: dbDog.name,
        temperaments: dbDog.temperaments.map((t) => t.name).join(", "),
        weight: dbDog.weight,
        image: dbDog.image,
        // Include other properties as needed from the database
      })),
      ...dogsApi.map((apiDog) => ({
        id: apiDog.id,
        name: apiDog.name,
        temperaments: apiDog.temperament,
        weight: apiDog.weight.metric,
        image: apiDog.image.url,
        // Include other properties as needed from the API
      })),
    ];

    return combinedData;
  } catch (error) {
    // Manejar errores aquí, por ejemplo, loggear el error
    console.error("Error in contDogsByName:", error);
    throw error; // Propagar el error para que sea manejado en la ruta
  }
};

module.exports = contDogsByName;
