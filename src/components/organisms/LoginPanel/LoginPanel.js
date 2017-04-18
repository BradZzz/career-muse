// @flow
import React, { Component, PropTypes } from "react"
import { Login, FoldingCube } from "../../../components/atoms/"
import { LogoutButton } from "../../../components/molecules/"
import { connect } from "react-redux"
import styles from "./styles.css"

export class LoginPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signedin: props.signedIn,
      auth: new firebaseui.auth.AuthUI(firebase.auth())
    }
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.signedIn) !== JSON.stringify(nextProps.signedIn)) // Check if it's a new user, you can also use some unique, like the ID
    {
      this.setState({ signedIn: nextProps.signedIn })
    }
  }

  render() {
    return (
      <div className={styles.root}>
        <FoldingCube style={{ 'margin-top' : '5em' }}></FoldingCube>
        <Login auth={ this.state.auth }></Login>
      </div>
    )
  }
}

LoginPanel.propTypes = {
  signedIn: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
  const { signedIn, isFetching } = state.user
  return {
    signedIn,
  }
}

export default connect(mapStateToProps)(LoginPanel)