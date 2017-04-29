// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import styles from "./styles.css"

import ReactDOM from 'react-dom'
import { Editor, EditorState, ContentState } from 'draft-js'

export class TxtEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createWithContent(ContentState.createFromText(props.content))
    }
    this.onChange = (editorState) => this.setState({ editorState })
  }

  render() {
    return (
      <div className={ styles.root }>
        <Editor editorState={this.state.editorState} onChange={this.onChange} />
      </div>
    )
  }
}

TxtEditor.propTypes = {
  content: PropTypes.string.isRequired
}

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(TxtEditor)