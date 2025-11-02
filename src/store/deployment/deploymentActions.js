import axios from "axios";
import {
  GET_DEPLOYMENTS_REQUEST,
  GET_DEPLOYMENTS_SUCCESS,
  GET_DEPLOYMENTS_FAIL,
  CREATE_DEPLOYMENT_REQUEST,
  CREATE_DEPLOYMENT_SUCCESS,
  CREATE_DEPLOYMENT_FAIL,
} from "../types/deploymentTypes.js";

const API_URL = import.meta.env.VITE_SERVER_BASE_URL;

// ✅ Get all deployments
export const getDeployments = () => async (dispatch) => {
  try {
    dispatch({ type: GET_DEPLOYMENTS_REQUEST });
    const { data } = await axios.get(`${API_URL}/deployments`);
    dispatch({ type: GET_DEPLOYMENTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_DEPLOYMENTS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ✅ Create new deployment
export const createDeployment = (deploymentData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_DEPLOYMENT_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(`${API_URL}/deployments`, deploymentData, config);

    dispatch({ type: CREATE_DEPLOYMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_DEPLOYMENT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
