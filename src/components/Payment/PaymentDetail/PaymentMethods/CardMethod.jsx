import React, { useState } from "react";
import styles from "./CardMethod.module.scss";
import CSSModules from "react-css-modules";

import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { RiLoader3Fill } from "react-icons/ri";

import { useSelector, useDispatch } from "react-redux";

import { handleCaptureCheckout } from "../../../../store/userSlice";
import { useTranslation } from "react-i18next";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CardMethod = ({ handleBack, handleNext }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loadingPaying, setLoadingPaying] = useState(false);
  const checkoutToken = useSelector((state) => state.user.checkout);
  const shippingData = useSelector((state) => state.user.shippingData);

  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;
    setLoadingPaying(true);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setLoadingPaying(false);
    } else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.name,
          lastname: shippingData.surname,
          email: shippingData.email,
        },
        shipping: {
          name: "Primary",
          street: shippingData.address,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfillment: { shipping_method: checkoutToken.shipping.id },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };

      dispatch(handleCaptureCheckout(checkoutToken.id, orderData));
      setLoadingPaying(false);
      handleNext();
    }
  };

  return (
    <div styleName="card-method">
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br />
              <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  style={{
                    padding: "1rem 2rem 1rem 2rem",
                    border: "none",
                    background: "var(--color-primary)",
                    color: "var(--color-highlight)",
                    width: "15rem",
                    cursor: "pointer",
                    borderRadius: "3px",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                  variant="outlined"
                  onClick={handleBack}
                >
                  {t("back")}
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "1rem 2rem 1rem 2rem",
                    border: "none",
                    background: "var(--color-primary)",
                    color: "var(--color-highlight)",
                    width: "15rem",
                    cursor: "pointer",
                    borderRadius: "3px",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                  disabled={!stripe}
                >
                  {loadingPaying && <RiLoader3Fill className="spinning" />}
                  {!loadingPaying && (
                    <>
                      {t("pay")} {checkoutToken.live.total.formatted_with_code}
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </div>
  );
};

export default CSSModules(CardMethod, styles);
