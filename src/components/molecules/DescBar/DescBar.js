// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import styles from "./styles.css"

export class DescBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: props.type,
      main: {
        desc : props.mainDesc,
        current : props.mainCurrent,
      },
      sub: this.update(),
    }
  }

  update = () => {
    const { type } = this.props
    switch(type){
      case "ask":
        const { askDesc, askCurrent } = this.props
        return { current : askCurrent, desc: askDesc }
      case "analyze":
        const { analyzeDesc, analyzeCurrent } = this.props
        return { current: analyzeCurrent, desc: analyzeDesc }
      case "edit":
        const { editDesc, editCurrent } = this.props
        return { current : editCurrent, desc: editDesc }
      default : return { current : 0, desc: [""] }
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
    return (
      <div className={styles.root}>
        <div className={styles.main}>{ main.desc[main.current] }</div>
        <div className={styles.desc}>{ sub.desc[sub.current] }</div>
      </div>
    );
  }
}

DescBar.propTypes = {
  mainDesc: PropTypes.array.isRequired,
  mainCurrent: PropTypes.number.isRequired,
  askDesc: PropTypes.array.isRequired,
  askCurrent: PropTypes.number.isRequired,
  analyzeDesc: PropTypes.array.isRequired,
  analyzeCurrent: PropTypes.number.isRequired,
  editDesc: PropTypes.array.isRequired,
  editCurrent: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired
}

function mapStateToProps(state) {
  const { navDesc: mainDesc, mcurrent: mainCurrent } = state.mainnav
  const { navDesc: askDesc, acurrent: askCurrent } = state.asknav
  const { navDesc: analyzeDesc, ancurrent: analyzeCurrent } = state.analyzenav
  const { navDesc: editDesc, ecurrent: editCurrent } = state.editnav
  return {
    mainDesc,
    mainCurrent,
    askDesc,
    askCurrent,
    analyzeDesc,
    analyzeCurrent,
    editDesc,
    editCurrent,
  }
}

export default connect(mapStateToProps)(DescBar)