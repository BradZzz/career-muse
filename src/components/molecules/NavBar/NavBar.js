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
      type: props.type,
      tabs: this.tabState(),
    }
  }

  tabState = () => {
    const { type } = this.props
    switch(type){
      case "ask":
        const { askTab, askCurrent } = this.props
        return { names : askTab, current : askCurrent }
      case "analyze":
        const { analyzeTab, analyzeCurrent } = this.props
        return { names : analyzeTab, current : analyzeCurrent }
      case "edit":
        const { editTab, editCurrent } = this.props
        return { names : editTab, current : editCurrent }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { type, tabs } = this.state

    switch(type){
      case "ask":
        if(JSON.stringify(this.state.tabs.current) !== JSON.stringify(nextProps.askCurrent))
        {
          tabs.current = nextProps.askCurrent
          this.setState({ tabs })
        }
      break;
      case "analyze":
        if(JSON.stringify(this.state.tabs.current) !== JSON.stringify(nextProps.analyzeCurrent))
        {
          tabs.current = nextProps.analyzeCurrent
          this.setState({ tabs })
        }
      break;
      case "edit":
        if(JSON.stringify(this.state.tabs.current) !== JSON.stringify(nextProps.editCurrent))
        {
          tabs.current = nextProps.editCurrent
          this.setState({ tabs })
        }
      break;
    }
  }

  renderTab = (tab, idx) => {
    const { dispatch } = this.props
    const { type } = this.state
    const { current } = this.state.tabs
    let clicky = () => dispatch(AskNavActions.nav({ nav : idx }))
    switch(type){
      case "analyze": clicky = () => dispatch(AnalyzeNavActions.nav({ nav : idx })); break;
      case "edit": clicky = () => dispatch(EditNavActions.nav({ nav : idx })); break;
    }
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

  const { navTab: askTab, acurrent: askCurrent } = state.asknav
  const { navTab: analyzeTab, ancurrent: analyzeCurrent } = state.analyzenav
  const { navTab: editTab, ecurrent: editCurrent } = state.editnav
  return {
    askTab,
    askCurrent,
    analyzeTab,
    analyzeCurrent,
    editTab,
    editCurrent,
  }
}

export default connect(mapStateToProps)(NavBar)