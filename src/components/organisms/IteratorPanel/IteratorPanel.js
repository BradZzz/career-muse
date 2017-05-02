// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { Button } from "../../atoms/"
import Left from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import Right from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import IconButton from 'material-ui/IconButton';
import styles from "./styles.css"


export class IteratorPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      position: 0,
    }
  }

  //If any tabs are changed, we want to go to reset to the first position
  //TODO: maybe change this behavior in the future depending
  componentWillReceiveProps(nextProps) {
    this.setState({ position: 0 })
  }

  renderElem = (elem, idx) => {
    return (
      <div style={{ display: (this.state.position == idx) ? 'block' : 'none' }}  key={ idx }>
        { elem }
      </div>
    )
  }

  back = () => {
    const { position } = this.state
    const { children } = this.props
    console.log("Back: " + position )
    console.log(children)
    console.log("length" in children)
    this.setState({ position: ( position < 1 ? 0 : position - 1 ) })
  }

  forward = () => {
    const { position } = this.state
    const { children } = this.props
    console.log("Forward: " + position )
    console.log(children)
    console.log("length" in children)
    this.setState({ position: ( position > children.length - 2 ? children.length - 1 : position + 1 ) })
  }

  render() {
    const { position } = this.state
    const { children } = this.props
    return (
      <div>
        { React.Children.map(this.props.children, this.renderElem ) }
        <div style={{ "margin" : "1em" }}>
        <IconButton tooltip="Back" onClick={ this.back }>
          <Left />
        </IconButton>
        <IconButton tooltip="Forward" onClick={ this.forward }>
          <Right />
        </IconButton>
        </div>
        <div>{ (position + 1) + "/" + children.length }</div>
      </div>
    )
  }

}

IteratorPanel.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(IteratorPanel)