const contDogsByName = require("../controllers/contDogsByName");

const dogsByName = async (req, res) => {
  try {
    // console.log(req.query);
    const { name } = req.query;

    if (!name) {
      return res.status(400).send("Name parameter is missing");
    }

    const response = await contDogsByName(name);

    if (!response.length) {
      return res.status(404).json(`Breed not found with name ${name}`);
    } else {
      return res.status(200).json(response);
    }
  } catch (error) {
    console.error("Error in dogsByName:", error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = dogsByName;
