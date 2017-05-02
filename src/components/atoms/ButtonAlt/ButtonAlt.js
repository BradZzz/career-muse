// @flow
import React, { Component } from "react";
import styles from "./Button.css";

export default class ButtonAlt extends Component {
  props: { children: React$Element<any> }

  constructor(props) {
    super(props)
    this.state = {
      active: false,
    }
  }

  action = () => this.setState({ active: !this.state.active })

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
