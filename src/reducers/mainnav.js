// @flow
import { handleActions } from "redux-actions";
import * as N from "../actions/mainnav"

const initialState = {
  navTab : ['Ask','Analyze','Edit'],
  navDesc : ['Ask About Your Resume','Analyze Your Background', 'Edit Your Results'],
  mcurrent : 0,
}


export default handleActions({
  [N.NAV]: (state = { }, action) => ({
    ...state,
    mcurrent: action.payload.nav
  }),
}, initialState);