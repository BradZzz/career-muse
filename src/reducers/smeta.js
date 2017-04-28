// @flow
import { handleActions } from "redux-actions";
import * as S from "../actions/smeta"

const initialState = {
  meta: {},
  isFetching: false,
}

export default handleActions({
  [S.REQUEST_SMETA]: (state = { }, action) => ({
    ...state,
    isFetching: true,
  }),
  [S.RECEIVE_SMETA]: (state = { }, action) => {
    return Object.assign({}, state, {
      meta: Object.assign({}, state.meta, action.payload)
    })
  },
}, initialState)