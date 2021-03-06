// @flow
import React from "react";
import { Link } from "react-router";
import styles from "./CoreLayout.css";
import { HeaderPanel, TitlePanel } from "../components/organisms/"


type Props = {
  children: React$Element<any>;
};

const CoreLayout = (props: Props) => {
  const { children } = props;

  return (
    <div className={styles.root}>
      <HeaderPanel></HeaderPanel>
      <TitlePanel></TitlePanel>

      <div className={styles.frame}>
        {children}
      </div>
    </div>
  )
};

export default CoreLayout;
