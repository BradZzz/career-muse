// @flow
import { takeEvery, delay } from "redux-saga"
import { select, put, call, fork } from "redux-saga/effects"
import * as S from "../actions/smeta"
import fetch from 'isomorphic-fetch'

export function* querysmeta() {
  yield takeEvery(S.QUERY_SMETA, requestsmeta)
}

export function* requestsmeta() {
  yield put( S.requestsmeta() )
  const msg = yield call(fetchsmeta)
  console.log(msg)
  yield put( S.receivesmeta(msg) )
}

export function fetchsmeta() {
  return fetch('/smeta').then(function(response) {
    if (response.status >= 400) {
      console.log("Bad response from server: " + response.status)
      return {}
    }
    return response.json()
  })
}