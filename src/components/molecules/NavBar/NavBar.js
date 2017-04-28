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
    const { type } = this.state
    switch(type){
      case "ask":
        if(JSON.stringify(this.state.tabs.current) !== JSON.stringify(nextProps.askCurrent))
        {
          const tabs = this.state.tabs
          tabs.current = nextProps.askCurrent
          this.setState({ tabs })
        }
      break;
      case "analyze":
        if(JSON.stringify(this.state.tabs.current) !== JSON.stringify(nextProps.analyzeCurrent))
        {
          const tabs = this.state.tabs
          tabs.current = nextProps.analyzeCurrent
          this.setState({ tabs })
        }
      break;
      case "edit":
        if(JSON.stringify(this.state.tabs.current) !== JSON.stringify(nextProps.editCurrent))
        {
          const tabs = this.state.tabs
          tabs.current = nextProps.editCurrent
          this.setState({ tabs })
        }
      break;
    }
  }

  renderTab = (tab, idx) => {
    const { dispatch } = this.props
    const { type } = this.state
    switch(type){
      case "ask":
        return <span className={styles.nav} onClick={ () => dispatch(AskNavActions.nav({ nav : idx })) } key={ idx }>
                 { tab }
               </span>
      case "analyze":
        return <span className={styles.nav} onClick={ () => dispatch(AnalyzeNavActions.nav({ nav : idx })) } key={ idx }>
                 { tab }
               </span>
      case "edit":
        return <span className={styles.nav} onClick={ () => dispatch(EditNavActions.nav({ nav : idx })) } key={ idx }>
                 { tab }
               </span>
    }
  }

  render() {
    const { names, current } = this.state.tabs
    return (
      <div className={ "center" }>
        <div style={{ zIndex: '1' }}>
          { names.map(this.renderTab) }
        </div>
        { current }
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