import {
  GET_ALL_DOGS,
  SEARCH_DOGS_BY_NAME,
  ORDER,
  ORDER_BY_WEIGHT,
  FILTER_BY_TEMPERAMENT,
  SELECT_TEMPERAMENT,
  GET_ALL_TEMPERAMENTS,
} from "./actionTypes";

const initialState = {
  allBreeds: [],
  allTemperaments: [],
  selectedTemperament: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        allBreeds: action.payload,
      };
    case SEARCH_DOGS_BY_NAME:
      return {
        ...state,
        allBreeds: action.payload,
        // selectedTemperament: null,
      };
    case GET_ALL_TEMPERAMENTS:
      return {
        ...state,
        allTemperaments: action.payload.temperaments,
      };
    case ORDER:
      const orderDogs = [...state.allBreeds].sort((a, b) => {
        if (action.payload === "ascending") {
          return a.name.localeCompare(b.name);
        } else if (action.payload === "descending") {
          return b.name.localeCompare(a.name);
        }
        return 0;
      });
      return {
        ...state,
        allBreeds: orderDogs,
      };
    case SELECT_TEMPERAMENT:
      return {
        ...state,
        selectedTemperament: action.payload,
      };
    case FILTER_BY_TEMPERAMENT:
      console.log("Before Filtering - allBreeds:", state.allBreeds);
      console.log("Selected Temperament:", state.selectedTemperament);
      const filteredDogs = state.allBreeds.filter((dog) => {
        console.log("Dog Temperament:", dog.temperament);

        if (dog.temperament === undefined) {
          console.log("Undefined temperament for dog:", dog);
        }

        return (
          // !state.selectedTemperament ||
          // state.selectedTemperament === "" ||
          dog.temperament.includes(state.selectedTemperament)
        );
      });
      console.log("Filtered Dogs:", filteredDogs);
      return {
        ...state,
        allBreeds: filteredDogs,
      };
    case ORDER_BY_WEIGHT:
      const orderWeight = [...state.allBreeds].sort((a, b) => {
        const weightA = parseInt(a.weight.split(" - ")[0]);
        const weightB = parseInt(b.weight.split(" - ")[0]);

        // Check if the parsed weights are valid numbers
        const isValidWeight = !isNaN(weightA) && !isNaN(weightB);

        if (isValidWeight) {
          if (action.payload === "lowToHigh") {
            return weightA - weightB;
          } else if (action.payload === "highToLow") {
            return weightB - weightA;
          }
        } else {
          // If weights are not valid numbers, place them at the end
          if (isNaN(weightA)) return 1;
          if (isNaN(weightB)) return -1;
        }

        return 0;
      });
      return {
        ...state,
        allBreeds: orderWeight,
      };
    default:
      return { ...state };
  }
};

export default reducer;
