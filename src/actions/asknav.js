// @flow
//Navigating to info page
export const NAV = 'ANAV'

export function nav(payload) {
  return {
    type: NAV,
    payload,
  }
}