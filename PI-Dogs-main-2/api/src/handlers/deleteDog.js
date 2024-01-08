const deleteDogById = require("../controllers/contDeleteDog");

const deleteDog = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteDogById(id);
    res.status(200).json({ message: "Dog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteDog;
