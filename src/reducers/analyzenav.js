// @flow
import React from "react"
import { handleActions } from "redux-actions"
import * as A from "../actions/analyzenav"
import * as su from "../constants/sampleUsr"
import { IteratorPanel } from "../components/organisms/"
import Checkbox from 'material-ui/Checkbox'
import { TxtEditor } from "../components/atoms/"

const styles = {
  block: {
    margin: "0 auto",
    width: "90%",
  },
  checkbox: {
    maxWidth: 250,
    display: "inline-flex",
    marginBottom: 16,
  },
}

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
  return <Checkbox key={ idx } label={ text } style={styles.checkbox} />
}

const flexCol = {
  "flex-flow": "column wrap",
  "display": "flex",
  "flex-direction": "row",
  "align-items": "flex-start",
  "margin-bottom": "1em",
}

const genChecks = (title, checks) => {
  return <div style={styles.block}>
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

const initialState = {
  navTab : ['Build','Style'],
  navDesc : ['Build Results','Style Your Product'],
  navMeta : [{ elems : [
    <IteratorPanel>
     <div>
      { genNews("Let's kick off the resume tailoring process!") }
      { genPar("We scanned your resume and job description. Our analysis shows that you have 3 years of experience in 'Cat Wrangling'") }
      { genPar("Good news. We have identified 7 matching keywords and phrases related to 'Cat Wrangling'") }
      { genPar("Not so good news. We have identified 7 missing keywords and phrases related to 'Cat Wrangling'") }
      { genNews("Let's optimize your resume ranking by adding more content!") }
      { genPar("Be honest. Anything you add here is up for grabs in an interview.") }
     </div>
     { genChecks("What other skills do you bring to the table?", su.TEST_USR_SKILLS) }
     { genChecks("How would you describe yourself at work?", su.TEST_USR_SKILLS_SOFT) }
     { genHeader("Nice! We've added 10 new keywords and phrases to your profile.") }
     </IteratorPanel>
    ] },{ elems : [
    <IteratorPanel>
     { genVisMap().map((elem) => <div> {elem} </div>) }
    </IteratorPanel>
    ] }],
  ancurrent : 0,
}


export default handleActions({
  [A.NAV]: (state = { }, action) => ({
    ...state,
    ancurrent: action.payload.nav
  }),
}, initialState);