const { Router } = require("express");
const getBreeds = require("../handlers/getBreeds");
const breedsById = require("../handlers/breedsById");
const dogsByName = require("../handlers/dogsByName");
const createDog = require("../handlers/createDog");
const deleteDog = require("../handlers/deleteDog");
const getTemperaments = require("../handlers/getTemperaments");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.post("/dogs", createDog);
router.delete("/dogs/:id", deleteDog);

router.get("/temperaments", getTemperaments);

router.use("/dogs/name", dogsByName);
router.use("/dogs/:id", breedsById);
router.use("/dogs", getBreeds);

module.exports = router;
