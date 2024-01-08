import {
  GET_ALL_DOGS,
  SEARCH_DOGS_BY_NAME,
  ORDER,
  ORDER_BY_WEIGHT,
  FILTER_BY_TEMPERAMENT,
  GET_ALL_TEMPERAMENTS,
  FILTER_BY_SOURCE,
  DOGS_BY_ID,
  CREATE_DOG,
  SET_CURRENT_PAGE,
  DOG_NOT_FOUND,
  DELETE_DOG,
} from "./actionTypes";

const initialState = {
  allBreeds: [],
  allBreedsCopy: [],
  allTemperaments: [],
  dogInfo: [],
  currentPage: 1,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        allBreeds: action.payload,
        allBreedsCopy: action.payload,
      };
    case SEARCH_DOGS_BY_NAME:
      return {
        ...state,
        allBreeds: action.payload,
        allBreedsCopy: action.payload,
      };
    case DOG_NOT_FOUND:
      return {
        ...state,
        error: action.payload,
      };
    case DOGS_BY_ID:
      return {
        ...state,
        dogInfo: action.payload,
      };
    case GET_ALL_TEMPERAMENTS:
      return {
        ...state,
        allTemperaments: action.payload.temperaments,
      };
    case CREATE_DOG:
      const updatedAllBreedsCopy = [...state.allBreedsCopy, action.payload];
      return {
        ...state,
        allBreeds: [...state.allBreeds, action.payload],
        allBreedsCopy: updatedAllBreedsCopy,
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
    case FILTER_BY_TEMPERAMENT:
      // console.log("Filter By Temperament Payload:", action.payload);
      const updatedBreeds = state.allBreedsCopy.length
        ? state.allBreedsCopy
        : state.allBreeds;

      const filteredTemperaments = updatedBreeds.filter((dog) => {
        if (typeof dog.temperaments === "string") {
          const dogTemperamentsArray = dog.temperaments
            .split(",")
            .map((t) => t.trim());

          const includesTemperament = dogTemperamentsArray.includes(
            action.payload
          );

          const result = action.payload === "all" || includesTemperament;

          return result;
        }

        return action.payload === "all";
      });

      return {
        ...state,
        allBreeds:
          action.payload === "all" ? updatedBreeds : filteredTemperaments,
        allBreedsCopy: updatedBreeds,
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
    case FILTER_BY_SOURCE:
      const updatedBreedsSource = state.allBreedsCopy.length
        ? state.allBreedsCopy
        : state.allBreeds;

      const filteredBySource = updatedBreedsSource.filter((dog) => {
        const hasSourceProperty = Object.prototype.hasOwnProperty.call(
          dog,
          "source"
        );

        if (action.payload === "database") {
          return hasSourceProperty;
        } else if (action.payload === "api") {
          return !hasSourceProperty;
        } else {
          return true;
        }
      });
      return {
        ...state,
        allBreeds: filteredBySource,
        allBreedsCopy: updatedBreedsSource,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case DELETE_DOG:
      const updatedBreedsDel = state.allBreeds.filter(
        (dog) => dog.id !== action.payload
      );
      const updatedBreedsCopyDel = state.allBreedsCopy.filter(
        (dog) => dog.id !== action.payload
      );
      return {
        ...state,
        allBreeds: updatedBreedsDel,
        allBreedsCopy: updatedBreedsCopyDel,
      };
    default:
      return { ...state };
  }
};

export default reducer;
