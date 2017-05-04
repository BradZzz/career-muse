// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import styles from "./styles.css"

import { NavBar, DescBar } from "../../../components/molecules/"

export class TitlePanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signedin: props.signedIn,
      current: props.mcurrent,
      types: ["ask","analyze","edit"]
    }
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.signedIn) !== JSON.stringify(nextProps.signedIn)) // Check if it's a new user, you can also use some unique, like the ID
    {
      this.setState({ signedIn: nextProps.signedIn })
    }
    if(JSON.stringify(this.state.current) !== JSON.stringify(nextProps.mcurrent)) // Check if it's a new user, you can also use some unique, like the ID
    {
      this.setState({ current: nextProps.mcurrent })
    }
  }

  title = () => <header>
                  <img src="../images/logo.png" style={{ 'width' : '200px', 'top' : '1em', 'left' : '1em',
                    'position' : 'absolute' }}/>
                  <h1 className={styles.title}>Goodbye Resume Tailoring. Hello Career Muse.</h1>
                </header>

  render() {
    const { signedIn, types, current } = this.state
    let head = this.title()
    if (signedIn) {
//      head = <div className={ "hide" }>
//            <DescBar>
//              <NavBar></NavBar>
//            </DescBar>
//          </div>
        head = <NavBar></NavBar>
    }
    return (
      <div className={styles.root} style={{
        'paddingTop': this.state.signedIn ? '1.8em' : '10em',
        'paddingBottom': this.state.signedIn ? '1.8em' : '0',
        height: this.state.signedIn ? '150px' : '200px',
      }}>
        { head }
      </div>
    )
  }
}

TitlePanel.propTypes = {
  mcurrent: PropTypes.number.isRequired,
  signedIn: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
  const { mcurrent } = state.mainnav
  const { signedIn } = state.user
  return {
    mcurrent,
    signedIn,
  }
}

export default connect(mapStateToProps)(TitlePanel)