require("dotenv").config();
const axios = require("axios");
const { Dog, Temperament, sequelize } = require("../db");
const contTemperaments = require("../controllers/contTemperaments");
const { API_KEY } = process.env;

const URL_BASE = "https://api.thedogapi.com/v1/breeds/";

const getTemperaments = async (req, res) => {
  try {
    // const response = await axios.get(`${URL_BASE}?api_key=${API_KEY}`);
    // // console.log(response.data);
    // const dataApi = response.data.map((dog) => ({
    //   temperament: dog.temperament,
    // }));

    const temperaments = await contTemperaments();

    res.status(200).json({ temperaments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getTemperaments;
