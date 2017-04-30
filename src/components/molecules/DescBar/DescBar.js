// @flow
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux"
import styles from "./styles.css"

export class DescBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      main: {
        desc : props.mainDesc,
        current : props.mainCurrent,
        tabs : props.tabs,
      },
      sub: this.update(),
    }
  }

  update = () => {
    const { mainCurrent, tabs } = this.props
    switch(tabs[mainCurrent]){
      case "Ask":
        const { askDesc, askCurrent } = this.props
        return { current : askCurrent, desc: askDesc }
      case "Analyze":
        const { analyzeDesc, analyzeCurrent } = this.props
        return { current: analyzeCurrent, desc: analyzeDesc }
      case "Edit":
        const { editDesc, editCurrent } = this.props
        return { current : editCurrent, desc: editDesc }
      default : return { current : 0, desc: [""] }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { sub, main } = this.state

    if(JSON.stringify(main.current) !== JSON.stringify(nextProps.mainCurrent))
    {
      main.current = nextProps.mainCurrent
    }
    this.setState({ main })

    switch(this.state.main.tabs[this.state.main.current]){
      case "Ask":
        if(JSON.stringify(sub.current) !== JSON.stringify(nextProps.askCurrent))
        {
          sub.current = nextProps.askCurrent
          sub.desc = nextProps.askDesc
        }
      break;
      case "Analyze":
        if(JSON.stringify(sub.current) !== JSON.stringify(nextProps.analyzeCurrent))
        {
          sub.current = nextProps.analyzeCurrent
          sub.desc = nextProps.analyzeDesc
        }
      break;
      case "Edit":
        if(JSON.stringify(sub.current) !== JSON.stringify(nextProps.editCurrent))
        {
          sub.current = nextProps.editCurrent
          sub.desc = nextProps.editDesc
        }
      break;
    }
    this.setState({ sub })

    console.log("Done DescBar: ")
    console.log(this.state)
  }

  render() {
    const { main, sub } = this.state
    return (
      <div className={styles.root}>
        <div className={styles.main}>{ main.desc[main.current] }</div>
        <div className={styles.desc}>{ sub.desc[sub.current] }</div>
        {this.props.children}
      </div>
    );
  }
}

DescBar.propTypes = {
  tabs: PropTypes.array.isRequired,
  mainDesc: PropTypes.array.isRequired,
  mainCurrent: PropTypes.number.isRequired,
  askDesc: PropTypes.array.isRequired,
  askCurrent: PropTypes.number.isRequired,
  analyzeDesc: PropTypes.array.isRequired,
  analyzeCurrent: PropTypes.number.isRequired,
  editDesc: PropTypes.array.isRequired,
  editCurrent: PropTypes.number.isRequired,
}

function mapStateToProps(state) {
  const { navDesc: mainDesc, mcurrent: mainCurrent, navTab : tabs } = state.mainnav
  const { navDesc: askDesc, acurrent: askCurrent } = state.asknav
  const { navDesc: analyzeDesc, ancurrent: analyzeCurrent } = state.analyzenav
  const { navDesc: editDesc, ecurrent: editCurrent } = state.editnav
  return {
    tabs,
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