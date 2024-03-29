require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Op } = require("sequelize");
const { Dog, Temperament } = require("../db");

const URL_BASE = "https://api.thedogapi.com/v1/breeds/";

const contTemperaments = async () => {
  try {
    const existingTemperaments = await Temperament.findAll();

    if (existingTemperaments.length > 0) {
      const temperaments = existingTemperaments.map(
        (temperament) => temperament.name
      );
      return temperaments;
    } else {
      const response = await axios.get(`${URL_BASE}?api_key=${API_KEY}`);

      //   console.log(response.data);
      const temperamentsApi = response.data.map(
        (breedData) => breedData.temperament
      );

      const allTemperaments = temperamentsApi
        .flatMap((temperament) =>
          temperament ? temperament.split(",").map((t) => t.trim()) : []
        )
        .filter(Boolean);
      //   console.log(allTemperaments);

      const validTemperaments = allTemperaments.filter(Boolean);

      const createdTemperaments = await Promise.all(
        validTemperaments.map((name) =>
          Temperament.findOrCreate({
            where: { name },
          })
        )
      );

      // Extract created temperaments from the results
      const newTemperaments = createdTemperaments
        .filter(([foundTemperament, created]) => created)
        .map(([foundTemperament]) => foundTemperament.name);

      return newTemperaments;
    }

    // return createdTemperaments;
  } catch (error) {
    console.error("Error in contTemperaments:", error);
    throw error;
  }
};

module.exports = contTemperaments;
