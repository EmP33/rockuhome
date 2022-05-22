import React from "react";
import classes from "./Cart.module.scss";
import logo from "../../assets/logo.png";

import CartItem from "./CartItem/CartItem";
import EmptyCart from "./EmptyCart/EmptyCart";
import CartBackdrop from "./CartBackdrop";

import { BsArrowLeft } from "react-icons/bs";

import { Helmet } from "react-helmet";

import { Link, useNavigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const cart = useSelector((state) => state.user.cart);

  const goToPaymentHandler = () => {
    if (cart?.total_items) {
      navigate("/checkout");
    }
  };

  return (
    <CartBackdrop>
      <Helmet>
        <meta charSet="utf-8" />
        <title>RockUHome - Cart</title>
      </Helmet>
      <Outlet />
      <div className={classes.cart}>
        <section className={classes["order-section"]}>
          <div className={classes["order-section__header"]}>
            <Link to="/" className={classes["order-section__header-logo"]}>
              <img src={logo} alt="Logo" />
            </Link>
            <h2>{t("your_orders")}</h2>
            <span>
              {cart.total_items ? cart.total_items : 0} {t("numb_of_items")}
            </span>
          </div>
          <div className={classes["order-section__list"]}>
            {cart["line_items"]?.length ? (
              cart["line_items"].map((item) => (
                <CartItem item={item} key={item.id} />
              ))
            ) : (
              <EmptyCart />
            )}
          </div>
          <div className={classes["order-section__footer"]}>
            <button onClick={() => navigate("/")}>
              <BsArrowLeft className={classes["backIcon"]} />
              {t("back_to_shop")}
            </button>
          </div>
        </section>
        <section className={classes["payments-section"]}>
          <div className={classes["payments-section__results"]}>
            <h3 className={classes["results-header"]}>{t("summary")}</h3>
            <span className={classes["results-qty"]}>
              {cart.total_items ? cart.total_items : 0} {t("numb_of_items")}
            </span>
            <span className={classes["results-price"]}>
              {cart.subtotal ? cart.subtotal.formatted_with_code : 0}
            </span>
          </div>
          <div className={classes["payments-section__summary"]}>
            <h6>{t("total_price")}</h6>
            <span>
              {cart.subtotal ? cart.subtotal.formatted_with_code : 0}{" "}
            </span>
            <button disabled={!cart?.total_items} onClick={goToPaymentHandler}>
              {t("go_to_checkout")}
            </button>
          </div>
        </section>
      </div>
    </CartBackdrop>
  );
};

export default Cart;
