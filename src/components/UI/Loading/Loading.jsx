import React from "react";
import classes from "./Loading.module.scss";

import logo from "../../../assets/logo.png";

import { DotWave } from "@uiball/loaders";

const Loading = () => {
  return (
    <div className={classes.checkoutLoading}>
      <img src={logo} alt="logo" />
      <DotWave size={47} speed={1} color="#cdbe78" className="spinning" />;
    </div>
  );
};

export default Loading;
