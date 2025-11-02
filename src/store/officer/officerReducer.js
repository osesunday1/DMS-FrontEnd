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

const initialState = {
  loading: false,
  officers: [],
  officer: null,
  error: null,
  success: false,
};

const officerReducer = (state = initialState, action) => {
  switch (action.type) {
    // ✅ Get all officers
    case GET_OFFICERS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_OFFICERS_SUCCESS:
      return { ...state, loading: false, officers: action.payload };
    case GET_OFFICERS_FAIL:
      return { ...state, loading: false, error: action.payload };

    // ✅ Get one officer
    case GET_OFFICER_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_OFFICER_SUCCESS:
      return { ...state, loading: false, officer: action.payload };
    case GET_OFFICER_FAIL:
      return { ...state, loading: false, error: action.payload };

    // ✅ Create officer
    case CREATE_OFFICER_REQUEST:
      return { ...state, loading: true, success: false, error: null };
    case CREATE_OFFICER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        officers: [...state.officers, action.payload],
      };
    case CREATE_OFFICER_FAIL:
      return { ...state, loading: false, success: false, error: action.payload };

    default:
      return state;
  }
};

export default officerReducer;