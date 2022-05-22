import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import classes from "./ProductDetail.module.scss";

import {
  IoHeartOutline,
  IoHeart,
  IoClose,
  IoCheckmarkOutline,
} from "react-icons/io5";
import { RiLoader3Fill, RiShoppingCartFill } from "react-icons/ri";

import { useSelector, useDispatch } from "react-redux";

import { addCartData, userActions } from "../../store/userSlice";

// import Review from "./Review";
import Variants from "./Variants";
import ProductSlider from "./ProductSlider";

import Modal from "@mui/material/Modal";

import { useTranslation } from "react-i18next";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const ProductDetail = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state?.products?.products.find((product) => product.id === params.productID)
  );
  const cart = useSelector((state) => state.user.cart);
  const sendingStatus = useSelector((state) => state.user.sendingStatus);
  const wishlist = useSelector((state) => state.user.wishlist);
  const [variant, setVariant] = useState("");
  const variantGroupID = product.variant_groups[0]?.id;

  let isInCart = false;

  if (!!cart.line_items) {
    isInCart = cart.line_items
      .map((item) => item.product_id === product.id)
      .includes(true);
  }

  const toggleModalHandler = () => {
    navigate(
      location.pathname.slice(
        0,
        location.pathname.length - params["*"].length - 1
      )
    );
  };

  const setIsInCartHandler = () => {
    dispatch(addCartData(product.id, 1, { [variantGroupID]: variant }));
  };
  const toggleIsFavoriteHandler = () => {
    if (wishlist.includes(product.id)) {
      // Removing from localstorage functionality
      localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist.filter((item) => item !== product.id))
      );
      dispatch(userActions.removeItemFromWishlist(product.id));
      return;
    }
    // Add to localstorage functionality
    localStorage.setItem("wishlist", JSON.stringify([...wishlist, product.id]));
    dispatch(userActions.addItemToWishlist([product.id]));
  };

  const changeVariantHandler = (option) => {
    setVariant(option);
  };

  const buyItemHandler = () => {
    dispatch(addCartData(product.id, 1, { [variantGroupID]: variant }));
    navigate("/cart");
  };

  if (product) {
    return (
      <Modal
        component={motion.div}
        open={true}
        onClose={toggleModalHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ overflow: "auto", outline: "none" }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className={classes["details"]}>
          <button
            className={classes["details-close"]}
            onClick={toggleModalHandler}
          >
            <IoClose />
          </button>

          <div className={classes["details-images"]}>
            <ProductSlider images={product.assets} />
          </div>
          <div className={classes["details-shipping"]}>
            <p>
              <strong>Wysyłka:</strong> 20.00 zł
            </p>
            <p className={classes["details-shipping--days"]}>4 dni</p>
          </div>
          {/* <div className={classes["details-review"]}>
              <h4>Opinie klientów</h4>
              <ul className={classes["review-list"]}>
                <Review />
                <Review />
              </ul>
            </div> */}

          <div className={classes["details-header"]}>
            <h1>{product.name}</h1>
            {/* <div className={classes["details-rate"]}>
                <IoStar />
                <IoStar />
                <IoStar />
                <IoStar />
                <IoStar />
              </div> */}
            <h3>{product.price.formatted_with_code}</h3>
            {!!product.variant_groups.length && (
              <div className={classes["details-variants"]}>
                <Variants
                  onChangeVariant={changeVariantHandler}
                  label={product.variant_groups[0].name}
                  options={product.variant_groups[0].options}
                />
              </div>
            )}
          </div>

          <div className={classes["details-actions"]}>
            <button
              className={classes["details-actions--btn-buy"]}
              onClick={buyItemHandler}
            >
              {t("buy")}
            </button>
            {sendingStatus && (
              <button
                className={classes["details-actions--btn-cart"]}
                onClick={setIsInCartHandler}
                disabled
              >
                <RiLoader3Fill className={classes.spinning} disabled />
              </button>
            )}
            {!sendingStatus && (
              <button
                className={classes["details-actions--btn-cart"]}
                onClick={setIsInCartHandler}
              >
                {sendingStatus && (
                  <RiLoader3Fill className={classes.spinning} disabled />
                )}
                {isInCart && !sendingStatus && <IoCheckmarkOutline />}
                {!isInCart && !sendingStatus && <RiShoppingCartFill />}
              </button>
            )}
          </div>
          <button
            className={classes["details-btn-wishlist"]}
            onClick={toggleIsFavoriteHandler}
          >
            {!wishlist.includes(product.id) ? (
              <IoHeartOutline className={classes["btn-wishlist__icon"]} />
            ) : (
              <IoHeart className={classes["btn-wishlist__icon"]} />
            )}
            {t("add_to_wishlist")}
          </button>
          <div className={classes["details-desc"]}>
            <h4>{t("description")}</h4>
            <p dangerouslySetInnerHTML={{ __html: product.description }}></p>
          </div>
          <button className={classes["details-report"]}>
            {t("report_problem")}
          </button>
        </div>
      </Modal>
    );
  } else {
    return "";
  }
};

export default React.memo(ProductDetail);
