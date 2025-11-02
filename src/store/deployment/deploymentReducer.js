import {
  GET_DEPLOYMENTS_REQUEST,
  GET_DEPLOYMENTS_SUCCESS,
  GET_DEPLOYMENTS_FAIL,
  CREATE_DEPLOYMENT_REQUEST,
  CREATE_DEPLOYMENT_SUCCESS,
  CREATE_DEPLOYMENT_FAIL,
} from "../types/deploymentTypes.js";

const initialState = {
  loading: false,
  deployments: [],
  error: null,
  success: false,
};

const deploymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DEPLOYMENTS_REQUEST:
    case CREATE_DEPLOYMENT_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_DEPLOYMENTS_SUCCESS:
      return { ...state, loading: false, deployments: action.payload };

    case CREATE_DEPLOYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        deployments: [...state.deployments, action.payload],
      };

    case GET_DEPLOYMENTS_FAIL:
    case CREATE_DEPLOYMENT_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default deploymentReducer;
