// @flow
import React, { Component, PropTypes } from "react"
import { Name, Button } from "../../../components/atoms/"
import { CenterBox, LogoutButton, UsrImgBox } from "../../../components/molecules/"
import { connect } from "react-redux"
import { browserHistory } from 'react-router'
import * as NavActions from "../../../actions/mainnav"
import styles from "./styles.css"

const imgStyle = {
  display: 'inline-flex',
  border: '1px solid #ffffff',
}

const nameStyle = {
  display: 'inline-flex',
  height: "100%",
  position: "relative",
  "vertical-align": "super",
  margin: "0 0 0 1em",
  bottom: "5px",
  "font-weight": "bold",
  color: "white",
  width: "150px",
}

const buttonStyle = {
  display: 'inline-flex',
  position: 'absolute',
  margin: '.05em 0 0 1em',
}

export class HeaderPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signedin: props.signedIn,
      tabs: {
        names : props.navTab,
        mcurrent : props.mcurrent,
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.signedIn) !== JSON.stringify(nextProps.signedIn))
    {
      this.setState({ signedIn: nextProps.signedIn })
    }
    if(JSON.stringify(this.state.mcurrent) !== JSON.stringify(nextProps.mcurrent))
    {
      this.setState({ mcurrent: nextProps.mcurrent })
    }
  }

  renderTab = (tab, idx) => {
    const { dispatch } = this.props
    const { mcurrent } = this.state
    return (
      <span className={ mcurrent == idx ? styles.nav + " " + styles.selected : styles.nav } onClick={ () => dispatch(NavActions.nav({ nav : idx })) } key={ idx }>
        { tab }
      </span>
    )
  }

  render() {
    const { names } = this.state.tabs
    console.log(names)
    return (
      <div className={styles.root} style={{ display: this.state.signedIn ? 'block' : 'none' }}>
        <img src="../images/cm-logo-sm-alt.png" style={{ 'width' : '50px', 'margin-left': '1em', 'position' : 'absolute' }}/>
        <div className={styles.navWrap + " hide"} style={{ zIndex: '1' }}>
          { names.map(this.renderTab) }
        </div>
        <CenterBox align="right" height="50px">
          <div className="flex layout-row layout-align-end-center" style={{ height: "100%"}}>
            <UsrImgBox style={ imgStyle }></UsrImgBox>
            <Name style={ nameStyle }></Name>
            <LogoutButton style={ buttonStyle }></LogoutButton>
          </div>
        </CenterBox>
      </div>
    )
  }
}

HeaderPanel.propTypes = {
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

export default connect(mapStateToProps)(HeaderPanel)