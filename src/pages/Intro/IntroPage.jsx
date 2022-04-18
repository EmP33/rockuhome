import React, { useState } from "react";
import CSSModules from "react-css-modules";
import styles from "./IntroPage.module.scss";
import logo from "../../assets/logo.png";
import images from "../../constants/images.js";

const calcValue = (a, b) => ((a / b) * 40 - 40 / 2).toFixed(1);

const IntroPage = () => {
  const [backgroundText, setBackgroundText] = useState("");
  const [yValue, setYValue] = useState();
  const [xValue, setXValue] = useState();

  const changeBackgroundTextHandler = (text) => {
    setBackgroundText(text);
    console.log("event");
  };

  const moveIconHandler = (e) => {
    const yValue = calcValue(e.clientY, window.innerHeight);
    const xValue = calcValue(e.clientX, window.innerWidth);
    setXValue(xValue);
    setYValue(yValue);
    console.log(yValue, xValue);
  };
  return (
    <div styleName="intro" onMouseMove={moveIconHandler}>
      <img src={logo} alt="logo" />
      <img
        src={images.bed}
        alt="icon"
        styleName="room-icon--1"
        style={{
          transform: `rotateX(${yValue}deg) rotateY(${xValue}deg) translateX(${
            -xValue / 5
          }px) translateY(${yValue / 5}px)`,
        }}
      />{" "}
      <img
        src={images.cloakroom}
        alt="icon"
        styleName="room-icon--2"
        style={{
          transform: `rotateX(${yValue}deg) rotateY(${xValue}deg) translateX(${
            -xValue / 5
          }px) translateY(${yValue / 5}px)`,
        }}
      />
      <h1>{backgroundText}</h1>
      <section styleName="navigation">
        <div
          styleName="navigation__bedroom"
          onMouseOver={() => changeBackgroundTextHandler("Bedroom")}
        >
          Bedroom
        </div>
        <div
          styleName="navigation__office"
          onMouseOver={() => changeBackgroundTextHandler("Office")}
        >
          Office
        </div>
        <div
          styleName="navigation__toilet"
          onMouseOver={() => changeBackgroundTextHandler("Toilet")}
        >
          Toilet
        </div>
        <div
          styleName="navigation__livingroom"
          onMouseOver={() => changeBackgroundTextHandler("Living Room")}
        >
          Living Room
        </div>
        <div
          styleName="navigation__kitchen"
          onMouseOver={() => changeBackgroundTextHandler("Kitchen")}
        >
          Kitchen
        </div>
        <div
          styleName="navigation__diningroom"
          onMouseOver={() => changeBackgroundTextHandler("Dining Room")}
        >
          Dining Room
        </div>
        <div
          styleName="navigation__hall"
          onMouseOver={() => changeBackgroundTextHandler("Hall")}
        >
          Hall
        </div>
      </section>
    </div>
  );
};

export default CSSModules(IntroPage, styles);
