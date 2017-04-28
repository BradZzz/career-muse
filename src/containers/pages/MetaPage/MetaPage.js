// @flow
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import * as SMetaActions from "../../../actions/smeta"
import { AskPanel, AnalyzePanel, EditPanel } from "../../../components/organisms/"
import styles from "./styles.css"
import type { Dispatch } from "redux"

export class MetaPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      meta : props.meta,
      mcurrent : props.mcurrent,
      panels : [<AskPanel></AskPanel>,<AnalyzePanel></AnalyzePanel>,<EditPanel></EditPanel>]
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(SMetaActions.querysmeta())
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.state.mcurrent) !== JSON.stringify(nextProps.mcurrent))
    {
      this.setState({ mcurrent: nextProps.mcurrent })
    }
  }

  renderPanel = (panel, idx) => {
    return (
      <div style={{ display: (this.state.mcurrent == idx) ? 'block' : 'none' }}  key={ idx }>
        { panel }
      </div>
    )
  }

  render() {
    const { panels } = this.state
    return (
      <div className={styles.root}>
        { panels.map(this.renderPanel) }
      </div>
    )
  }

}

MetaPage.propTypes = {
  meta: PropTypes.object.isRequired,
  mcurrent: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { meta } = state.smeta
  const { mcurrent } = state.mainnav
  return {
    meta,
    mcurrent,
  }
}

export default connect(mapStateToProps)(MetaPage)