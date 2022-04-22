import React from "react";
import classes from "./Nothing.module.scss";

import { RiShoppingCartFill } from "react-icons/ri";

const Nothing = () => {
  return (
    <div className={classes["nothing"]}>
      <RiShoppingCartFill />
    </div>
  );
};

export default Nothing;
