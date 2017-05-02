// @flow
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import user from "./user";
import smeta from "./smeta";
import mainnav from "./mainnav";
import asknav from "./asknav";
import analyzenav from "./analyzenav";
import editnav from "./editnav";

const rootReducer = combineReducers({
  routing: routerReducer,
  user,
  smeta,
  mainnav,
  asknav,
  analyzenav,
  editnav
});

export default rootReducer;
