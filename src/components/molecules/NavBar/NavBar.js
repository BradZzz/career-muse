// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import styles from "./styles.css"

import * as AskNavActions from "../../../actions/asknav"
import * as AnalyzeNavActions from "../../../actions/analyzenav"
import * as EditNavActions from "../../../actions/editnav"

export class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      main: {
        current : props.mainCurrent,
        tabs : props.tabs,
      },
      tabs: this.tabState(),
    }
  }

  tabState = () => {
    const { mainCurrent, tabs } = this.props
    switch(tabs[mainCurrent]){
      case "Ask":
        const { askTab, askCurrent } = this.props
        return { names : askTab, current : askCurrent }
      case "Analyze":
        const { analyzeTab, analyzeCurrent } = this.props
        return { names : analyzeTab, current : analyzeCurrent }
      case "Edit":
        const { editTab, editCurrent } = this.props
        return { names : editTab, current : editCurrent }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { main, tabs } = this.state

    if(JSON.stringify(main.current) !== JSON.stringify(nextProps.mainCurrent))
    {
      main.current = nextProps.mainCurrent
    }
    this.setState({ main })

    switch(this.state.main.tabs[this.state.main.current]){
      case "Ask":
        tabs.current = nextProps.askCurrent
        tabs.names = nextProps.askTab
      break;
      case "Analyze":
        tabs.current = nextProps.analyzeCurrent
        tabs.names = nextProps.analyzeTab
      break;
      case "Edit":
        tabs.current = nextProps.editCurrent
        tabs.names = nextProps.editTab
      break;
    }
    this.setState({ tabs })

    console.log("Done Navbar: ")
    console.log(this.state.main.tabs[this.state.main.current])
    console.log(this.state)
  }

  renderTab = (tab, idx) => {
    const { dispatch } = this.props
    const { main, tabs } = this.state
    const { current } = tabs
    let clicky = () => dispatch(AskNavActions.nav({ nav : idx }))
    switch(main.tabs[main.current]){
      case "Analyze": clicky = () => dispatch(AnalyzeNavActions.nav({ nav : idx })); break;
      case "Edit": clicky = () => dispatch(EditNavActions.nav({ nav : idx })); break;
    }

    console.log("renderTab")
    console.log(idx + ":" + current)

    return <span className={ current === idx ? styles.tab + " " + styles.selected : styles.tab } onClick={ clicky } key={ idx }>
             { tab }
           </span>
  }

  render() {
    const { names, current } = this.state.tabs
    return (
      <div className={styles.root}>
        <div style={{ zIndex: '1' }}>
          { names.map(this.renderTab) }
        </div>
      </div>
    );
  }
}

NavBar.propTypes = {
  tabs: PropTypes.array.isRequired,
  mainCurrent: PropTypes.number.isRequired,

  askTab: PropTypes.array.isRequired,
  askCurrent: PropTypes.number.isRequired,

  analyzeTab: PropTypes.array.isRequired,
  analyzeCurrent: PropTypes.number.isRequired,

  editTab: PropTypes.array.isRequired,
  editCurrent: PropTypes.number.isRequired,

  type: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { mcurrent: mainCurrent, navTab : tabs } = state.mainnav
  const { navTab: askTab, acurrent: askCurrent } = state.asknav
  const { navTab: analyzeTab, ancurrent: analyzeCurrent } = state.analyzenav
  const { navTab: editTab, ecurrent: editCurrent } = state.editnav
  return {
    tabs,
    mainCurrent,
    askTab,
    askCurrent,
    analyzeTab,
    analyzeCurrent,
    editTab,
    editCurrent,
  }
}

export default connect(mapStateToProps)(NavBar)