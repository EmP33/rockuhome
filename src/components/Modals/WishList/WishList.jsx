import React from "react";
import ReactDOM from "react-dom";

import classes from "./WishList.module.scss";

import ItemCard from "../../ShopItems/ItemCard/ItemCard";

import Modal from "@mui/material/Modal";

import { IoClose } from "react-icons/io5";

import { useSelector } from "react-redux";

import { useNavigate, Outlet, useLocation } from "react-router-dom";

import { useTranslation } from "react-i18next";

const WishList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const products = useSelector((state) => state.products.products);
  const wishlist = useSelector((state) => state.user.wishlist);

  let link = `/`;
  if (location.pathname.includes("/home")) {
    link = `/home`;
  } else if (location.pathname.includes("category/")) {
    link = location.pathname.slice(0, location.pathname.length - 9);
  } else if (location.pathname.includes("help/")) {
    link = location.pathname.slice(0, location.pathname.length - 9);
  } else if (location.pathname.includes("search/")) {
    link = location.pathname.slice(0, location.pathname.length - 9);
  }

  let wishProducts = [];
  if (JSON.parse(localStorage.getItem("wishlist"))) {
    wishProducts = JSON.parse(localStorage.getItem("wishlist")).map((id) =>
      products.find((product) => product.id === id)
    );
  }

  const toggleWishlistHandler = () => {
    navigate(link);
  };

  return ReactDOM.createPortal(
    <React.Fragment>
      <Outlet />
      <Modal
        open={true}
        onClose={toggleWishlistHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ overflow: "auto" }}
      >
        <div className={classes["wishlist"]}>
          <button
            className={classes["wishlist__close-btn"]}
            onClick={toggleWishlistHandler}
          >
            <IoClose />
          </button>
          <section className={classes["wishlist__products"]}>
            <h1>{t("wishlist")}</h1>
            <ul className={classes["wishlist__products-list"]}>
              {wishlist.length
                ? wishProducts.map((product) => (
                    <ItemCard product={product} key={product.id} />
                  ))
                : ""}
              {!wishlist.length && (
                <h5 style={{ padding: "2rem" }}>{t("nothing-there")}</h5>
              )}
            </ul>
          </section>
        </div>
      </Modal>
    </React.Fragment>,
    document.querySelector("#modals-root")
  );
};

export default WishList;
