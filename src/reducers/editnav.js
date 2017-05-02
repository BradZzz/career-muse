// @flow
import React from "react"
import TextField from 'material-ui/TextField'

import { handleActions } from "redux-actions"
import * as N from "../actions/editnav"
import * as su from "../constants/sampleUsr"
import { IteratorPanel } from "../components/organisms/"
import { ButtonAlt, TxtEditor } from "../components/atoms/"

const genHeader = (text) => {
  return <h1>{ text }</h1>
}

const genNews = (text) => {
  return <h3>{ text }</h3>
}

const genPar = (text) => {
  return <p>{ text }</p>
}

const genMultiForm = (resumeString) => {
  return <div style={{ width: '96%', margin: '1em', height: '45vh', 'background': 'white',
    'borderRadius' : '5px', 'textAlign' : 'left' }}>
      <TxtEditor content={ resumeString }></TxtEditor>
  </div>
}

const renderButton = (text, idx) => {
  return <ButtonAlt clickable={ false } key={ idx }>{ text }</ButtonAlt>
}

const genDownloadForm = (buttons) => {
  return <div>
      { buttons.map(renderButton)}
  </div>
}

const initialState = {
  navTab : ['Tailor','Download'],
  navDesc : ['Tailor Information','Download Resume'],
  navMeta : [ { elems : [

    genHeader("Let's take one last look at your resume. Feel free to change anything you like!"),
    genMultiForm(JSON.stringify(su.TEST_USRS[0]))

   ] }, { elems : [

    genHeader("Nice! Your resume has been optimized!"),
    genNews("Time to start pushing it out to the world! Here are your options:"),
    genDownloadForm(["Dropbox","Download","Email"]),
    genPar("All of your resume versions are safe, sound, and secure with us."),

   ] } ],
  usrMeta : su.TEST_USRS[0],
  ecurrent : 0,
}


export default handleActions({
  [N.NAV]: (state = { }, action) => ({
    ...state,
    ecurrent: action.payload.nav
  }),
}, initialState);