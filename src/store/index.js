import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import officerReducer from "./officer/officerReducer";
import locationReducer from "./location/locationReducer";
import branchReducer from "./branch/branchReducer.js";
import deploymentReducer from "./deployment/deploymentReducer.js";
import dashboardReducer from "./dashboard/dashboardReducer.js";


const rootReducer = combineReducers({
  officers: officerReducer,
  locations: locationReducer,
  branches: branchReducer,
  deployments: deploymentReducer,
  dashboard: dashboardReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;