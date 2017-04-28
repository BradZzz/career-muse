// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import styles from "./styles.css"

export class MetaBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: props.type,
      main: {
        current : props.mainCurrent,
      },
      sub: this.update(),
    }
  }

  update = () => {
    const { type } = this.props
    switch(type){
      case "ask":
        const { askMeta, askCurrent } = this.props
        return { current : askCurrent, meta: askMeta }
      case "analyze":
        const { analyzeMeta, analyzeCurrent } = this.props
        return { current: analyzeCurrent, meta: analyzeMeta }
      case "edit":
        const { editMeta, editCurrent } = this.props
        return { current : editCurrent, meta: editMeta }
      default : return { current : 0, meta: [""] }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { type, main, sub } = this.state
    switch(type){
      case "ask":
        if(JSON.stringify(this.state.sub.current) !== JSON.stringify(nextProps.askCurrent))
        {
          sub.current = nextProps.askCurrent
        }
      break;
      case "analyze":
        if(JSON.stringify(this.state.sub.current) !== JSON.stringify(nextProps.analyzeCurrent))
        {
          sub.current = nextProps.analyzeCurrent
        }
      break;
      case "edit":
        if(JSON.stringify(this.state.sub.current) !== JSON.stringify(nextProps.editCurrent))
        {
          sub.current = nextProps.editCurrent
        }
      break;
    }
    if(JSON.stringify(this.state.main.current) !== JSON.stringify(nextProps.mainCurrent))
    {
      main.current = nextProps.mainCurrent
    }
    this.setState({ sub, main })
  }

  render() {
    const { main, sub } = this.state
    console.log(sub)
    console.log(sub.meta)
    console.log(sub.meta[sub.current])
    return (
      <div className={styles.root}>
        <div className={styles.desc}>{ sub.meta[sub.current].elems[0] }</div>
      </div>
    );
  }
}

MetaBar.propTypes = {
  mainCurrent: PropTypes.number.isRequired,
  askMeta: PropTypes.array.isRequired,
  askCurrent: PropTypes.number.isRequired,
  analyzeMeta: PropTypes.array.isRequired,
  analyzeCurrent: PropTypes.number.isRequired,
  editMeta: PropTypes.array.isRequired,
  editCurrent: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired
}

function mapStateToProps(state) {
  const { mcurrent: mainCurrent } = state.mainnav
  const { navMeta: askMeta, acurrent: askCurrent } = state.asknav
  const { navMeta: analyzeMeta, ancurrent: analyzeCurrent } = state.analyzenav
  const { navMeta: editMeta, ecurrent: editCurrent } = state.editnav
  return {
    mainCurrent,
    askMeta,
    askCurrent,
    analyzeMeta,
    analyzeCurrent,
    editMeta,
    editCurrent,
  }
}

export default connect(mapStateToProps)(MetaBar)