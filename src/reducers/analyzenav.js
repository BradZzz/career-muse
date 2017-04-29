// @flow
import React from "react"
import { handleActions } from "redux-actions"
import * as A from "../actions/analyzenav"
import * as su from "../constants/sampleUsr"
import Checkbox from 'material-ui/Checkbox'

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
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

const genChecks = (title, checks) => {
  return <div style={styles.block}>
      <p>{ title }</p>
      { checks.map(renderCheck) }
  </div>
}

const renderJob = (job, idx) => {
  const { employer, position, summary, highlights } = job
  return <div key={ idx }>
    <span>Employer: { genPar(employer) }</span>
    <span>Position: { genPar(position) }</span>
    <span>Summary: { genPar(summary) }</span>
    <div style={{ margin: '1em' }}>
      { highlights.map((light)=> <span>Summary: { genPar(light) } </span>) }
    </div>
  </div>
}

const genEmpHist = (profile) => {
  const { employment } = profile
  const { history } = employment
  return <div>
      { history.map(renderJob) }
  </div>
}

const initialState = {
  navTab : ['Build','Style'],
  navDesc : ['Build Results','Style Your Product'],
  navMeta : [{ elems : [
     genHeader("Let's kick off the resume tailoring process!"),
     genNews("We scanned your resume and job description. Our analysis shows that you have 3 years of experience in 'Cat Wrangling'"),
     genNews("Good news. We have identified 7 matching keywords and phrases related to 'Cat Wrangling'"),
     genNews("Not so good news. We have identified 7 missing keywords and phrases related to 'Cat Wrangling'"),
     genNews("Let's optimize your resume ranking by adding more content!"),
     genPar("Be honest. Anything you add here is up for grabs in an interview."),
     genChecks("What other skills do you bring to the table?", su.TEST_USR_SKILLS),
     genChecks("How would you describe yourself at work?", su.TEST_USR_SKILLS_SOFT),
     genNews("Nice! We added 10 new keywords and phrases to your profile."),
    ] },{ elems : [
     genHeader("Add more results and achievements to stand out!"),
     genNews("Based on the work you'll be doing, here are some impact statements to set you apart..."),
     genEmpHist(su.TEST_USRS[0]),
    ] }],
  ancurrent : 0,
}


export default handleActions({
  [A.NAV]: (state = { }, action) => ({
    ...state,
    ancurrent: action.payload.nav
  }),
}, initialState);