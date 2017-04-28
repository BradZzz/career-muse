// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import styles from "./styles.css"

export class FooterPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      info : ["Made with <3 in Seattle","Copyright " + new Date().getFullYear() + " Career Muse"]
    }
  }

  renderInfo = (info, idx) => {
    return <div className={styles.elem} key={ idx }>
             { info }
           </div>
  }

  render() {
    const { info } = this.state
    return (
      <div className={styles.root}>
        { info.map(this.renderInfo) }
      </div>
    )
  }
}

FooterPanel.propTypes = {
  signedIn: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  meta: PropTypes.object.isRequired,
  navTab: PropTypes.array.isRequired,
  mcurrent: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { signedIn, isFetching, meta } = state.user
  const { navTab, mcurrent } = state.mainnav
  return {
    signedIn,
    isFetching,
    meta,
    navTab,
    mcurrent,
  }
}

export default connect(mapStateToProps)(FooterPanel)