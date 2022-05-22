import React, { useEffect, useState } from "react";
import CSSModules from "react-css-modules";
import styles from "./Payment.module.scss";

import logo from "../../assets/logo.png";

// COMPONENTS
import PaymentBackdrop from "./PaymentBackdrop";
import Review from "./Review/Review";
import Shipping from "./Shipping/Shipping";
import PaymentDetail from "./PaymentDetail/PaymentDetail";
import Loading from "../UI/Loading/Loading";
import Confirmation from "./Confirmation/Confirmation";

// MUI
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

// ICONS

import { RiShoppingCartFill } from "react-icons/ri";

// OTHER
import { commerce } from "../../lib/commerce";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const cart = useSelector((state) => state.user.cart);
  const checkoutToken = useSelector((state) => state.user.checkout);

  const steps = [t("shipping-address"), t("payment-details")];

  const [activeStep, setActiveStep] = useState(0);
  const [loadingNextStep, setLoadingNextStep] = useState(false);

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        dispatch(userActions.setCheckoutToken(token));
      } catch (err) {}
    };

    generateToken();
  }, [cart, dispatch]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getShippingDataHandler = async (data) => {
    setLoadingNextStep(true);
    await commerce.checkout.checkShippingOption(checkoutToken.id, {
      shipping_option_id: checkoutToken.shipping_methods[0].id,
      country: data.shippingCountry,
      region: data.shippingSubdivision,
    });

    dispatch(userActions.setShippingData(data));
    handleNext();
    setLoadingNextStep(false);
  };

  if (!cart.total_items) {
    navigate("/", { replace: true });
  }

  if (loadingNextStep || !checkoutToken) {
    return <Loading />;
  }

  return (
    <PaymentBackdrop>
      <Helmet>
        <meta charSet="utf-8" />
        <title>RockUHome - Payment</title>
      </Helmet>
      <Outlet />
      <div styleName="payment-navbar">
        <Link to="/" styleName="payment-navbar__header-logo">
          <img src={logo} alt="Logo" />
        </Link>
        {activeStep === 2 ? (
          ""
        ) : (
          <div styleName="cart-wrapper">
            <Link to="/cart">
              <span>{cart.total_items}</span>
              <RiShoppingCartFill styleName="cartIcon" />
            </Link>
          </div>
        )}
      </div>
      {activeStep === 2 && !loadingNextStep && <Confirmation />}
      {activeStep !== 2 && (
        <>
          <h1 styleName="payment-header">{t("checkout")}</h1>
          <div styleName="payment">
            <section styleName="content-section">
              <div styleName="content-section__form-wrapper">
                <Stepper activeStep={activeStep} styleName="stepper">
                  {steps.map((step) => (
                    <Step
                      key={step}
                      sx={{
                        "& .MuiStepLabel-root .Mui-completed": {
                          color: "#383838", // circle color (COMPLETED)
                        },
                        "& .MuiStepLabel-root .Mui-active": {
                          color: "#383838", // circle color (ACTIVE)
                        },
                        "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                          fill: "#cdbe78", // circle's number (ACTIVE)
                        },
                      }}
                    >
                      <StepLabel styleName="step-label">{step}</StepLabel>
                    </Step>
                  ))}
                </Stepper>

                {activeStep === 0 && checkoutToken && !loadingNextStep && (
                  <Shipping getShippingData={getShippingDataHandler} />
                )}
                {activeStep === 1 && !loadingNextStep && (
                  <PaymentDetail
                    handleBack={handleBack}
                    handleNext={handleNext}
                  />
                )}
              </div>
            </section>
            <section styleName="review-section">
              {activeStep === 2 ? "" : <Review />}
            </section>
          </div>
        </>
      )}
    </PaymentBackdrop>
  );
};

export default CSSModules(Cart, styles);
