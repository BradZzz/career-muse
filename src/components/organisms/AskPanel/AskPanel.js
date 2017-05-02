// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import * as NavActions from "../../../actions/asknav"
import { NavBar, DescBar, MetaBar } from "../../../components/molecules/"
import styles from "./styles.css"

export class AskPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabs: {
        names : props.navTab,
        current : props.acurrent,
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.tabs.current) !== JSON.stringify(nextProps.acurrent))
    {
      const tabs = this.state.tabs
      tabs.current = nextProps.acurrent
      this.setState({ tabs })
    }
  }

  render() {
    const { names, current } = this.state.tabs
    return (
      <div>
        <MetaBar type="ask"></MetaBar>
      </div>
    )
  }

}

AskPanel.propTypes = {
  navTab: PropTypes.array.isRequired,
  acurrent: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const { navTab, acurrent } = state.asknav
  return {
    navTab,
    acurrent,
  }
}

export default connect(mapStateToProps)(AskPanel)