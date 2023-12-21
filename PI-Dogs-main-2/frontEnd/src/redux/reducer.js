import { GET_ALL_DOGS } from "./actionTypes";

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
    default:
      return { ...state };
  }
};

export default reducer;
