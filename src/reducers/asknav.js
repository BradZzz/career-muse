// @flow
import React from "react"
import { handleActions } from "redux-actions";
import * as A from "../actions/asknav"
import TextField from 'material-ui/TextField';
import { Button } from "../components/atoms/"

const renderButton = (text, idx) => {
  return <Button key={ idx }>{ text }</Button>
}

const genQuestions = (text, hint) => {
  return <div>
      { text }<TextField hintText={ hint }/><br />
  </div>
}

const genButtons = (question, buttons) => {
  return <div>
      { question }
      { buttons.map(renderButton) }
  </div>
}

const genForm = (info) => {
  const { header, sub, text, form, buttons } = info
  return <div>
      { header }
      { sub }
  </div>
}

const initialState = {
  navTab : ['Tell','Share','Select'],
  navDesc : ['Tell Your Story','Share Your Sentiments','Select Your Jobs'],
  navMeta : [{ elems : [
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
      genForm({
        header : "Nice! Tell us about the job(s) you want!",
        sub : "We'll tailor and optimize your resume for each job you add!",
        text: [
          { text: "I want to apply to be a ", hint: "job title" },
          { text: "I want to work at ", hint: "company" }
        ],
        form : "Paste a job description. Why not a link? It could disappear at any time!",
        buttons : [ "Yes, let's add another job", "No, let's kick off the process" ]
      })
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