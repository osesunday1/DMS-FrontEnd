import axios from "axios";
import {
  GET_LOCATIONS_REQUEST,
  GET_LOCATIONS_SUCCESS,
  GET_LOCATIONS_FAIL,
  CREATE_LOCATION_REQUEST,
  CREATE_LOCATION_SUCCESS,
  CREATE_LOCATION_FAIL,
} from "../types/locationTypes";

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

// ✅ Fetch all locations
export const getLocations = () => async (dispatch) => {
  try {
    dispatch({ type: GET_LOCATIONS_REQUEST });
    const { data } = await axios.get(`${BASE_URL}/locations`);
    dispatch({ type: GET_LOCATIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_LOCATIONS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ✅ Create new location
export const createLocation = (locationData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_LOCATION_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `${BASE_URL}/locations`,
      locationData,
      config
    );

    dispatch({ type: CREATE_LOCATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_LOCATION_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};