// @flow
import { handleActions } from "redux-actions";
import * as A from "../actions/analyzenav"

const initialState = {
  navTab : ['Analyze','Build','Style'],
  ancurrent : 0,
}


export default handleActions({
  [A.NAV]: (state = { }, action) => ({
    ...state,
    ancurrent: action.payload.nav
  }),
}, initialState);