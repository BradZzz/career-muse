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