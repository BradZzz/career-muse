// @flow
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import counter from "./counter";
import user from "./user";
import domain from "./domain";
import auction from "./auction";
import smeta from "./smeta";
import mainnav from "./mainnav";
import asknav from "./asknav";
import analyzenav from "./analyzenav";
import editnav from "./editnav";

const rootReducer = combineReducers({
  routing: routerReducer,
  counter,
  user,
  domain,
  auction,
  smeta,
  mainnav,
  asknav,
  analyzenav,
  editnav
});

export default rootReducer;
