// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { NavBar, DescBar } from "../../../components/molecules/"
import * as NavActions from "../../../actions/editnav"
import styles from "./styles.css"

export class EditPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabs: {
        names : props.navTab,
        current : props.ecurrent,
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.tabs.current) !== JSON.stringify(nextProps.ecurrent))
    {
      const tabs = this.state.tabs
      tabs.current = nextProps.ecurrent
      this.setState({ tabs })
    }
  }

  render() {
    const { names, current } = this.state.tabs
    console.log(this.state)
    return (
      <div>
        <NavBar type="edit"></NavBar>
        <DescBar type="edit"></DescBar>
      </div>
    )
  }

}

EditPanel.propTypes = {
  navTab: PropTypes.array.isRequired,
  ecurrent: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const { navTab, ecurrent } = state.editnav
  return {
    navTab,
    ecurrent,
  }
}

export default connect(mapStateToProps)(EditPanel)