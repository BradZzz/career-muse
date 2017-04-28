// @flow
//The call to pull in the auction list
export const QUERY_SMETA = 'QUERY_SMETA'

//Intermediaries for the request
export const REQUEST_SMETA = 'REQUEST_SMETA'
export const RECEIVE_SMETA = 'RECEIVE_SMETA'

export function querysmeta() {
  return {
    type: QUERY_SMETA,
  }
}

export function requestsmeta() {
  return {
    type: REQUEST_SMETA,
  }
}

export function receivesmeta(payload) {
  return {
    type: RECEIVE_SMETA,
    payload,
    receivedAt: Date.now()
  }
}