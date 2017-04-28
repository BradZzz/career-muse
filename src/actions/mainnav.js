// @flow
//Navigating to info page
export const NAV = 'MNAV'

export function nav(payload) {
  return {
    type: NAV,
    payload,
  }
}