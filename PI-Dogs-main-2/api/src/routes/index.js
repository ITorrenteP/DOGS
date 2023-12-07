const { Router } = require("express");
const getBreeds = require("../controllers/getBreeds");
const breedsById = require("../controllers/breedsById");
const dogsByName = require("../controllers/dogsByName");
// const axios = require("axios");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/dogs/:id", breedsById);
router.use("/dogs", getBreeds);
router.use("/dogs/name?=", dogsByName);

module.exports = router;
