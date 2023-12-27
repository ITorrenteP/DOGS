import { GET_ALL_DOGS, SEARCH_DOGS_BY_NAME } from "./actionTypes";

const initialState = {
  allBreeds: [],
  allTemperaments: [],
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
      };
    default:
      return { ...state };
  }
};

export default reducer;
