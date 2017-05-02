// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import styles from "./Button.css";

export class ButtonAlt extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      clickable: props.clickable,
    }
  }

  action = () => this.setState({ active: this.state.clickable ? !this.state.active : false })

  render() {
    const { active } = this.state
    return (
      <button
         {...this.props}
         onClick={ this.action }
         className={ active ? styles.active : styles.root}>
         {this.props.children}
       </button>
    );
  }
}

ButtonAlt.propTypes = {
  clickable: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(ButtonAlt)
