require("dotenv").config();
const contTemperaments = require("../controllers/contTemperaments");

const getTemperaments = async (req, res) => {
  try {
    const temperaments = await contTemperaments();

    res.status(200).json({ temperaments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getTemperaments;
