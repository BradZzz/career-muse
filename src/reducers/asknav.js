// @flow
import { handleActions } from "redux-actions";
import * as A from "../actions/asknav"

const initialState = {
  navTab : ['Tell','Share','Select'],
  navDesc : ['Tell Your Story','Share Your Sentiments','Select Your Jobs'],
  acurrent : 0,
}


export default handleActions({
  [A.NAV]: (state = { }, action) => ({
    ...state,
    acurrent: action.payload.nav
  }),
}, initialState);