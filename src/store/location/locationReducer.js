import {
  GET_LOCATIONS_REQUEST,
  GET_LOCATIONS_SUCCESS,
  GET_LOCATIONS_FAIL,
  CREATE_LOCATION_REQUEST,
  CREATE_LOCATION_SUCCESS,
  CREATE_LOCATION_FAIL,
} from "../types/locationTypes";

const initialState = {
  loading: false,
  locations: [],
  error: null,
  success: false,
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATIONS_REQUEST:
    case CREATE_LOCATION_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_LOCATIONS_SUCCESS:
      return { ...state, loading: false, locations: action.payload };

    case CREATE_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        locations: [...state.locations, action.payload],
      };

    case GET_LOCATIONS_FAIL:
    case CREATE_LOCATION_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default locationReducer;