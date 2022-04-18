import React, { useState } from "react";
import CSSModules from "react-css-modules";
import styles from "./IntroPage.module.scss";

import images from "../../constants/images.js";
import IntroElement from "../../components/IntroElement/IntroElement";

const IntroPage = () => {
  return (
    <div styleName="wrapper">
      <div styleName="intro">
        <div styleName="intro__svg">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#3a3845"
              fill-opacity="1"
              d="M0,64L26.7,74.7C53.3,85,107,107,160,133.3C213.3,160,267,192,320,176C373.3,160,427,96,480,96C533.3,96,587,160,640,192C693.3,224,747,224,800,218.7C853.3,213,907,203,960,176C1013.3,149,1067,107,1120,122.7C1173.3,139,1227,213,1280,234.7C1333.3,256,1387,224,1413,208L1440,192L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
            ></path>
          </svg>
        </div>
        <h2 styleName="header">CHOOSE A ROOM</h2>
        <section styleName="navigation">
          <IntroElement title="Bedroom" image={images.bedroom} link="bedroom" />
          <IntroElement
            title="Bathroom"
            image={images.bathroom}
            link="bathroom"
          />
          <IntroElement title="Hall" image={images.hall} link="hall" />
          <IntroElement title="Office" image={images.office} link="office" />
          <IntroElement title="Kitchen" image={images.kitchen} link="kitchen" />
          <IntroElement
            title="Living Room"
            image={images.living_room}
            link="livingroom"
          />
          <IntroElement
            title="Dining Room"
            image={images.dining_room}
            link="diningroom"
          />
        </section>
      </div>
    </div>
  );
};

export default CSSModules(IntroPage, styles);
