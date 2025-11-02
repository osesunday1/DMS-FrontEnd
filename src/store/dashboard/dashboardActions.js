import axios from "axios";
import {
  GET_DASHBOARD_REQUEST,
  GET_DASHBOARD_SUCCESS,
  GET_DASHBOARD_FAIL,
} from "../types/dashboardTypes.js";

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

// ✅ Fetch dashboard summary
export const getDashboardSummary = () => async (dispatch) => {
  try {
    dispatch({ type: GET_DASHBOARD_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/dashboard/summary`);

    dispatch({
      type: GET_DASHBOARD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_DASHBOARD_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
