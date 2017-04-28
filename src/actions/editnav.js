// @flow
//Navigating to info page
export const NAV = 'ENAV'

export function nav(payload) {
  return {
    type: NAV,
    payload,
  }
}