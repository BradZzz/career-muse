// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import * as NavActions from "../../../actions/analyzenav"
import styles from "./styles.css"

export class AnalyzePanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabs: {
        names : props.navTab,
        current : props.ancurrent,
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.tabs.current) !== JSON.stringify(nextProps.ancurrent))
    {
      const tabs = this.state.tabs
      tabs.current = nextProps.ancurrent
      this.setState({ tabs })
    }
  }

  renderTab = (tab, idx) => {
    const { dispatch } = this.props
    return (
      <span className={styles.nav} onClick={ () => dispatch(NavActions.nav({ nav : idx })) } key={ idx }>
        { tab }
      </span>
    )
  }

  render() {
    const { names, current } = this.state.tabs
    console.log(this.state)
    return (
      <div>
        <div style={{ zIndex: '1' }}>
          { names.map(this.renderTab) }
        </div>
        { current }
        AnalyzePanel
      </div>
    )
  }

}

AnalyzePanel.propTypes = {
  navTab: PropTypes.array.isRequired,
  ancurrent: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const { navTab, ancurrent } = state.analyzenav
  return {
    navTab,
    ancurrent,
  }
}

export default connect(mapStateToProps)(AnalyzePanel)