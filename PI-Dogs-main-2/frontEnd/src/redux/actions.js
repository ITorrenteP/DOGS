import { GET_ALL_DOGS, SEARCH_DOGS_BY_NAME } from "./actionTypes";
import axios from "axios";

const URL_BASE = "http://localhost:3001";

export const getAllDogs = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${URL_BASE}/dogs`);
      return dispatch({
        type: GET_ALL_DOGS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const dogsByName = (name) => {
  return async (dispatch) => {
    try {
      if (!name) {
        throw new Error("Enter a breed");
      }

      const { data } = await axios(`${URL_BASE}/dogs/name?name=${name}`);
      return dispatch({
        type: SEARCH_DOGS_BY_NAME,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
