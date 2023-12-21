import { GET_ALL_DOGS } from "./actionTypes";
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
