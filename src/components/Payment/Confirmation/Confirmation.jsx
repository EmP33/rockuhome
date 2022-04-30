import React from "react";
import classes from "./Confirmation.module.scss";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ImHappy2 } from "react-icons/im";

const Confirmation = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.shippingData);

  const navigateToHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className={classes.confirmationWrapper}>
      <div className={classes.confirmation}>
        <ImHappy2 />
        <h3>
          Thank you for your purchase, {user.name} {user.surname}
        </h3>
        <button onClick={navigateToHome}>Go back to Home</button>
      </div>
    </div>
  );
};

export default Confirmation;
