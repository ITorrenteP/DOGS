import {
  GET_ALL_DOGS,
  SEARCH_DOGS_BY_NAME,
  ORDER,
  ORDER_BY_WEIGHT,
  FILTER_BY_TEMPERAMENT,
  SELECT_TEMPERAMENT,
  GET_ALL_TEMPERAMENTS,
} from "./actionTypes";
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

export const getAllTemperaments = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${URL_BASE}/temperaments`);
      // console.log("All Temperaments:", data);
      return dispatch({
        type: GET_ALL_TEMPERAMENTS,
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

export const orderCards = (payload) => {
  return {
    type: ORDER,
    payload,
  };
};

export const orderWeight = (payload) => {
  return {
    type: ORDER_BY_WEIGHT,
    payload,
  };
};

export const filterTemperaments = (payload) => {
  return {
    type: FILTER_BY_TEMPERAMENT,
    payload,
  };
};
