import axios from "axios";
import {
  GET_OFFICERS_REQUEST,
  GET_OFFICERS_SUCCESS,
  GET_OFFICERS_FAIL,
  GET_OFFICER_REQUEST,
  GET_OFFICER_SUCCESS,
  GET_OFFICER_FAIL,
  CREATE_OFFICER_REQUEST,
  CREATE_OFFICER_SUCCESS,
  CREATE_OFFICER_FAIL,
} from "../types/officerTypes.js";

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

// ✅ Get all officers
export const getOfficers = (filters = {}) => async (dispatch) => {
  try {
    dispatch({ type: GET_OFFICERS_REQUEST });


    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER_BASE_URL}/officers`,
      { params: filters } // 👈 all filters in one object
    );


    dispatch({
      type: GET_OFFICERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_OFFICERS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ✅ Get one officer by ID
export const getOfficerById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_OFFICER_REQUEST });
    const { data } = await axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/officers/${id}`);
    dispatch({ type: GET_OFFICER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_OFFICER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};


// ✅ Create a new officer
export const createOfficer = (officerData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_OFFICER_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${BASE_URL}/officers`,
      officerData,
      config
    );

    dispatch({ type: CREATE_OFFICER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_OFFICER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};