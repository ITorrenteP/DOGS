require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;

const URL_BASE = "https://api.thedogapi.com/v1/breeds/";

const dogsByName = (req, res) => {};

module.exports = dogsByName;
