import React from "react";
import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import styles from "./IntroElement.module.scss";

const IntroElement = ({ image, title, link }) => {
  return (
    <Link to={`/category/${link}`}>
      <div styleName="navigation__element">
        <img src={image} alt="By Minh Pham on Unsplash" />
        <div styleName="navigation__element__content">
          <h3>{title}</h3>
        </div>
      </div>
    </Link>
  );
};

export default CSSModules(IntroElement, styles);
