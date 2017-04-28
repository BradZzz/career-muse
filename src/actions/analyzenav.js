// @flow
//Navigating to info page
export const NAV = 'ANNAV'

export function nav(payload) {
  return {
    type: NAV,
    payload,
  }
}