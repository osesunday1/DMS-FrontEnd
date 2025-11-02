// src/store/branch/branchReducer.js
import {
  GET_BRANCHES_REQUEST,
  GET_BRANCHES_SUCCESS,
  GET_BRANCHES_FAIL,
  CREATE_BRANCH_REQUEST,
  CREATE_BRANCH_SUCCESS,
  CREATE_BRANCH_FAIL,
} from "../types/branchTypes.js";

const initialState = {
  loading: false,
  branches: [],
  error: null,
};

const branchReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BRANCHES_REQUEST:
    case CREATE_BRANCH_REQUEST:
      return { ...state, loading: true };

    case GET_BRANCHES_SUCCESS:
      return { loading: false, branches: action.payload, error: null };

    case CREATE_BRANCH_SUCCESS:
      return {
        ...state,
        loading: false,
        branches: [...state.branches, action.payload],
      };

    case GET_BRANCHES_FAIL:
    case CREATE_BRANCH_FAIL:
      return { loading: false, error: action.payload, branches: [] };

    default:
      return state;
  }
};

export default branchReducer;
