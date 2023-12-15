const contDogsByName = async (name) => {
  try {
    // if (!name) {
    //   return null;
    // }
    name = name.toLowerCase();
    //Buscamos en BDD

    const dogsDataBase = await Dog.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: [Temperament],
    });

    if (dogsDataBase.length) {
      return dogsDataBase;
    }

    // Buscamos en API
    const response = await axios.get(
      `${URL_BASE}?q=${name}&api_key=${API_KEY}`
    );

    const dogsApi = response.data;
    // console.log(dogsApi);

    // // Si no encontramos en la API, retornamos null
    // if (dogsApi.length === 0) {
    //   return null;
    // }

    // Combinamos datos de la API y la base de datos
    const combinedData = dogsApi.map((apiDog) => ({
      id: apiDog.id,
      name: apiDog.name,
      temperament: apiDog.temperament || null, // Use API temperament or null
      // Include other properties as needed
    }));

    return combinedData;
  } catch (error) {
    // Manejar errores aquí, por ejemplo, loggear el error
    console.error("Error in contDogsByName:", error);
    throw error; // Propagar el error para que sea manejado en la ruta
  }
};

// breedsById

const breedsById = async (req, res) => {
  const { id } = req.params;

  try {
    // const dogsIdDataBase = await Dog.findAll({
    //   where: {
    //     id: {
    //       [Op.iLike]: `%${id}%`,
    //     },
    //   },
    //   include: [Temperament],
    // });

    const response = await axios.get(`${URL_BASE}?api_key=${API_KEY}`);

    const result = response.data.filter((elem) => elem.id === Number(id));
    console.log(result);

    if (result.length > 0) {
      const {
        id,
        name,
        reference_image_id,
        image,
        height,
        life_span,
        temperament,
      } = result[0];

      const dog = {
        id,
        name,
        height,
        life_span,
        temperament,
        reference_image_id,
        image,
      };
      return res.status(200).json(dog);
    } else {
      return res.status(404).send("Breed not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
