import {
  GET_DASHBOARD_REQUEST,
  GET_DASHBOARD_SUCCESS,
  GET_DASHBOARD_FAIL,
} from "../types/dashboardTypes.js";

const initialState = {
  loading: false,
  summary: {
    OK: 0,
    "Ready for Redeployment": 0,
    Overdue: 0,
    total: 0,
  },
  error: null,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DASHBOARD_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_DASHBOARD_SUCCESS:
      return { ...state, loading: false, summary: action.payload };

    case GET_DASHBOARD_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default dashboardReducer;
