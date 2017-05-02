// @flow
import React from "react"
import { handleActions } from "redux-actions"
import * as A from "../actions/asknav"
import TextField from 'material-ui/TextField'
import { IteratorPanel } from "../components/organisms/"
import { ButtonAlt } from "../components/atoms/"

const renderButton = (text, idx) => {
  return <ButtonAlt clickable={ true } key={ idx }>{ text }</ButtonAlt>
}

const renderButtonUnClk = (text, idx) => {
  return <ButtonAlt clickable={ false } key={ idx }>{ text }</ButtonAlt>
}

const genQuestions = (text, hint) => {
  return <div>
      { text }<TextField style={{ "margin-left" : ".6em" }} hintText={ hint }/><br />
  </div>
}

//const genButtonsUnClk = (question, buttons) => {
//  return <div>
//      <div style={{ "margin" : "1em" }}>{ question }</div>
//      <div>{ buttons.map(renderButtonUnClk) }</div>
//  </div>
//}

const genButtons = (question, buttons) => {
  return <div>
      <div style={{ "margin" : "1em" }}>{ question }</div>
      <div>{ buttons.map(renderButton) }</div>
  </div>
}

const genForm = (info) => {
  const { header, sub, text, form, buttons } = info
//  return <div>
//      <h3>{ header }</h3>
//      <!--<div>{ sub }</div>-->
//      { text.map((txt) => genQuestions(txt.text,txt.hint)) }
//      <div style={{ "margin":"1em" }}>{ form }</div>
//      <div style={{ "width":"540px", "border-radius":"5px", "background":"#eeeeee", "margin":"0 auto" }}>
//        <TextField
//          style={{ "width":"500px", "margin":"0 auto" }}
//          multiLine={true}
//          rows={5}/>
//      </div>
//      <div style={{ 'margin' : '1em' }}>{ buttons.map(renderButton) }</div>
//  </div>
  return <div>
      <h3>{ header }</h3>
      { text.map((txt) => genQuestions(txt.text,txt.hint)) }
      <div style={{ "margin":"1em" }}>{ form }</div>
      <div style={{ "width":"540px", "border-radius":"5px", "background":"#eeeeee", "margin":"0 auto" }}>
        <TextField
          style={{ "width":"500px", "margin":"0 auto" }}
          multiLine={true}
          rows={5}/>
      </div>
      <div style={{ 'margin' : '1em' }}>{ buttons.map(renderButtonUnClk) }</div>
  </div>
}

const form = {
  header : "Nice! Tell us about the job(s) you want!",
  sub : "We'll tailor and optimize your resume for each job you add!",
  text: [
    { text: "I want to apply to be a ", hint: "job title" },
    { text: "I want to work at ", hint: "company" }
  ],
  form : "Paste a job description. A link may disappear!",
  buttons : [ "Yes, let's add another job", "No, let's kick off the process" ]
}

const initialState = {
  navTab : ['Upload','Tell','Share','Select'],
  navDesc : ['Upload Your Resume','Tell Your Story','Share Your Sentiments','Select Your Jobs'],
  navMeta : [{ elems : [
    (
      <div>
        <h3>Click on the button below to select you resume and upload it!</h3>
        { ["Upload Resume"].map(renderButtonUnClk) }
      </div>
    )
   ]},{ elems : [
    genQuestions("I'm passionate about ","Go after it!"),
    genQuestions("I'm most recognized by my peers / managers for ","Way to go rock star!"),
    genQuestions("My top skills are ","Look at those mad skills!"),
  ]},{
    elems : [
      genButtons("How is your job search going?",["Making Progress","Slowly Moving","Hearing Crickets"]),
      genButtons("How are you feeling about your resume right now?",["Good","Not Sure","Bad"]),
      genButtons("Are any of these things impacting you?",
        ["Graduated recently", "Have work gaps in resume", "Got laid off", "Left military", "No work experience"]
      ),
    ]
  },{
    elems : [
      genForm( form )
    ]
  }],
  acurrent : 0,
}


export default handleActions({
  [A.NAV]: (state = { }, action) => ({
    ...state,
    acurrent: action.payload.nav
  }),
}, initialState);