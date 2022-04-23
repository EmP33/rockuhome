import React from "react";
import classes from "./ItemCard.module.scss";
import CSSModules from "react-css-modules";
// import styles from "./ItemCard.module.scss";

import {
  IoHeartOutline,
  IoEllipsisHorizontal,
  IoHeart,
  IoCheckmarkOutline,
} from "react-icons/io5";
import { RiShoppingCartFill, RiLoader3Fill } from "react-icons/ri";

import { Link, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addCartData, userActions } from "../../../store/userSlice";

const ItemCard = ({ product }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.user.cart);
  const wishlist = useSelector((state) => state.user.wishlist);
  const sendingStatus = useSelector((state) => state.user.sendingStatus);
  const variantGroupID = product.variant_groups[0]?.id;
  let isInCart = false;
  let detailsPath = "";

  if (!!cart.line_items) {
    isInCart = cart.line_items
      .map((item) => item.product_id === product.id)
      .includes(true);
  }

  const addFavoriteHandler = () => {
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

  const addCartDataHandler = () => {
    if (product.variant_groups.length !== 0) {
      dispatch(
        addCartData(product.id, 1, {
          [variantGroupID]: product.variant_groups[0]?.options[0].id,
        })
      );
    } else {
      dispatch(addCartData(product.id, 1));
    }
  };

  if (location.pathname.includes("wishlist")) {
    detailsPath = `${location.pathname}/${product.id}`;
  } else {
    detailsPath = `product/${product.id}`;
  }

  return (
    <React.Fragment>
      <div
        styleName={
          location.pathname.includes("category") ? "card-list" : "card"
        }
      >
        <div styleName="card-container">
          <div styleName="card-backdrop">
            {/* Conditional render on button element to prevent spam clicks */}
            {sendingStatus ? (
              <button onClick={addCartDataHandler} disabled>
                {sendingStatus && <RiLoader3Fill className="spinning" />}
                {isInCart && !sendingStatus && <IoCheckmarkOutline />}
                {!isInCart && !sendingStatus && <RiShoppingCartFill />}
              </button>
            ) : (
              <button onClick={addCartDataHandler}>
                {sendingStatus && <RiLoader3Fill className="spinning" />}
                {isInCart && !sendingStatus && <IoCheckmarkOutline />}
                {!isInCart && !sendingStatus && <RiShoppingCartFill />}
              </button>
            )}
            <button onClick={addFavoriteHandler}>
              {wishlist.includes(product.id) ? <IoHeart /> : <IoHeartOutline />}
            </button>
            <Link to={detailsPath}>
              <IoEllipsisHorizontal />
            </Link>
          </div>
          {
            <img
              src={product.image.url}
              alt={product.name}
              styleName="card-image"
            />
          }
        </div>
        <div styleName="card-content">
          <Link to={detailsPath}>
            <h3>{product.name}</h3>
          </Link>
          <span styleName="price">{product.price.formatted_with_code} </span>
          {/* <div styleName={classes["discount-wrapper"]}>
            <span styleName={classes["discount-price"]}>
              {(product.price.raw * 1.1).toFixed(2)} zł
            </span>{" "}
            <span styleName={classes["discount-badge"]}>-10%</span>
          </div> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CSSModules(ItemCard, classes);
