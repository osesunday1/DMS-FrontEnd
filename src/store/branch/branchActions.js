// src/store/branch/branchActions.js
import axios from "axios";
import {
  GET_BRANCHES_REQUEST,
  GET_BRANCHES_SUCCESS,
  GET_BRANCHES_FAIL,
  CREATE_BRANCH_REQUEST,
  CREATE_BRANCH_SUCCESS,
  CREATE_BRANCH_FAIL,
} from "../types/branchTypes.js";

const API_URL = import.meta.env.VITE_SERVER_BASE_URL;

// ✅ Get all branches
export const getBranches = () => async (dispatch) => {
  try {
    dispatch({ type: GET_BRANCHES_REQUEST });
    const { data } = await axios.get(`${API_URL}/branch`);
    dispatch({ type: GET_BRANCHES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_BRANCHES_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ✅ Create new branch
export const createBranch = (branchData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_BRANCH_REQUEST });
    const { data } = await axios.post(`${API_URL}/branch`, branchData);
    dispatch({ type: CREATE_BRANCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_BRANCH_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};