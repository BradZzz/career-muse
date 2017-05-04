// @flow
import React from "react"
import { handleActions } from "redux-actions"
import * as A from "../actions/asknav"
import TextField from 'material-ui/TextField'
import { IteratorPanel } from "../components/organisms/"
import { ButtonAlt, TxtEditor } from "../components/atoms/"
import * as su from "../constants/sampleUsr"
import Checkbox from 'material-ui/Checkbox'
import {List, ListItem} from 'material-ui/List'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import styles from "./styles.css"

const genHeader = (text) => {
  return <h1>{ text }</h1>
}

const genNews = (text) => {
  return <h3>{ text }</h3>
}

const genPar = (text) => {
  return <p>{ text }</p>
}

const renderCheck = (text, idx) => {
  return <Checkbox key={ idx } label={ text } className={styles.checkbox} />
}

const flexCol = {
  "flex-flow": "column wrap",
  "display": "flex",
  "flex-direction": "row",
  "align-items": "flex-start",
  "margin-bottom": "1em",
}

const genChecks = (title, checks) => {
  return <div className={styles.block} >
      { genNews(title) }
      <div style={ flexCol }>
        { checks.map(renderCheck) }
      </div>
  </div>
}

const retResume = (job) => {
  const { employer, position, summary, highlights } = job
  return "Employer: " + employer + "\n" +
    "Position: " + position + "\nSummary:\n\n" + highlights.map((light)=> " " + light + "")
}

const renderJob = (job, idx) => {
  const { employer, position, summary, highlights } = job
  return <div style={{ width: '96%', margin: '1em', height: '45vh', 'background': 'white',
             'borderRadius' : '5px', 'textAlign' : 'left' }}>
             <TxtEditor key={ idx } content={ retResume(job) }></TxtEditor>
          </div>
}

const genEmpHist = (profile) => {
  const { employment } = profile
  const { history } = employment
  return <div style={{ "overflowY" : "auto", "height" : "300px", "background" : "white", "borderRadius" : "5px",
    "margin" : "2em", "padding" : "1em" }}>
      { history.map(renderJob) }
  </div>
}

const genVisMap = () => {
  return [
    <div>
      { genHeader("Add more results and achievements to stand out!") }
      { genNews("Based on the work you'll be doing, here are some impact statements to set you apart...") }
    </div>
  ].concat(su.TEST_USRS[0].employment.history.map(renderJob))
}

const genMultiForm = (resumeString) => {
  return <div style={{ width: '96%', margin: '1em', height: '45vh', 'background': 'white',
    'borderRadius' : '5px', 'textAlign' : 'left' }}>
      <TxtEditor content={ resumeString }></TxtEditor>
  </div>
}

const renderButton = (text, idx) => {
  return <ButtonAlt clickable={ true } key={ idx }>{ text }</ButtonAlt>
}

const renderButtonUnClk = (text, idx) => {
  return <ButtonAlt clickable={ false } key={ idx }>{ text }</ButtonAlt>
}

const renderButtonUnClkFull = (text, idx) => {
  return <ButtonAlt style={{ 'width':'100%' }} clickable={ false } key={ idx }>{ text }</ButtonAlt>
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
  return <div>
    <div style={{ width: "20%", float: "left", "margin-left" : "5em"}}>
      <h3 style={{ "width" : "100%" }}>Current Jobs:</h3>
      <List>
        { ["Astronaut","Firefighter","Cowboy"].map((txt) => <ListItem primaryText={ txt } leftIcon={<ActionGrade />} /> ) }
      </List>
      <div className={styles.formbutton}>Add</div>
    </div>
    <div style={{ width: "70%", float: "left", margin: "0 1em" }}>
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
  buttons : [ "Kick off the process" ]
}

const initialState = {
  navTab : ['Upload','Tell','Share','Select','Summary','Keywords','Impact','Review'],
  navDesc : ['Upload Your Resume','Tell Your Story','Share Your Sentiments','Select Your Jobs',
  'Summary','Keywords','Impact','Review'],
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
    elems : [ genForm( form )]
  },{
    elems : [
     <div>
      { genNews("Let's kick off the resume tailoring process!") }
      { genPar("We scanned your resume and job description. Our analysis shows that you have 3 years of experience in 'Cat Wrangling'") }
      { genPar("Good news. We have identified 7 matching keywords and phrases related to 'Cat Wrangling'") }
      { genPar("Not so good news. We have identified 7 missing keywords and phrases related to 'Cat Wrangling'") }
      { genNews("Let's optimize your resume ranking by adding more content!") }
      { genPar("Be honest. Anything you add here is up for grabs in an interview.") }
     </div>
    ]
  },{ elems : [
  <IteratorPanel>
   { genChecks("What other skills do you bring to the table?", su.TEST_USR_SKILLS) }
   { genChecks("How would you describe yourself at work?", su.TEST_USR_SKILLS_SOFT) }
   { genHeader("Nice! We've added 10 new keywords and phrases to your profile.") }
   </IteratorPanel>
   ] },{ elems : [
   <IteratorPanel>
    { genVisMap().map((elem) => <div> {elem} </div>) }
   </IteratorPanel>
   ] },{ elems : [
    genHeader("Let's take one last look at your resume. Feel free to change anything you like!"),
    genMultiForm(JSON.stringify(su.TEST_USRS[0]))
   ] }],
  acurrent : 0,
}


export default handleActions({
  [A.NAV]: (state = { }, action) => ({
    ...state,
    acurrent: action.payload.nav
  }),
}, initialState);