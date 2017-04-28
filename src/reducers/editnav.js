// @flow
import { handleActions } from "redux-actions";
import * as N from "../actions/editnav"

const initialState = {
  navTab : ['Tailor','View'],
  ecurrent : 0,
}


export default handleActions({
  [N.NAV]: (state = { }, action) => ({
    ...state,
    ecurrent: action.payload.nav
  }),
}, initialState);