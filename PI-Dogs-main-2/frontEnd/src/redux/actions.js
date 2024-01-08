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
import axios from "axios";

const URL_BASE = "http://localhost:3001";

export const getAllDogs = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${URL_BASE}/dogs`);
      // console.log(data);
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
      const { data } = await axios(`${URL_BASE}/dogs/name?name=${name}`);
      return dispatch({
        type: SEARCH_DOGS_BY_NAME,
        payload: data,
      });
    } catch (error) {
      if (error.response.data.startsWith("Breed not found with name")) {
        return dispatch({
          type: DOG_NOT_FOUND,
          payload: error.response.data,
        });
      } else {
        console.log(error);
      }
    }
  };
};

export const dogsById = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${URL_BASE}/dogs/${id}`);
      console.log(data);
      return dispatch({
        type: DOGS_BY_ID,
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
  console.log("Filter Temperament Payload:", payload);
  return {
    type: FILTER_BY_TEMPERAMENT,
    payload,
  };
};

export const filterSource = (payload) => {
  return {
    type: FILTER_BY_SOURCE,
    payload,
  };
};

export const PostDog = (payload) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${URL_BASE}/dogs`, payload);
      return dispatch({
        type: CREATE_DOG,
        payload: data,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const setCurrentPage = (page) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: page,
  };
};

export const deleteDog = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${URL_BASE}/dogs/${id}`);
      if (response.status === 200) {
        return dispatch({
          type: DELETE_DOG,
          payload: id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
