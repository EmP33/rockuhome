import React, { useEffect } from "react";
import classes from "./CartItem.module.scss";
import CSSModules from "react-css-modules";

import { HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import { RiLoader3Fill } from "react-icons/ri";

import { useDispatch } from "react-redux";

import { userActions } from "../../../store/userSlice";
import { Link } from "react-router-dom";

import useHttp from "../../../hooks/use-http";
import { removeProductCart, updateProductCart } from "../../../lib/api";

import { AnimatePresence, motion } from "framer-motion";

const cartItemVariants = {
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
    x: "-100vw",
    opacity: 0,
    transition: { duration: 1, ease: "easeInOut" },
  },
};

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const {
    sendRequest: sendRemoveReq,
    status: removeStatus,
    data: cart,
  } = useHttp(removeProductCart);

  const {
    sendRequest: sendUpdateReq,
    status: updateStatus,
    data: updatedCart,
  } = useHttp(updateProductCart);

  const itemClass = `${
    removeStatus || updateStatus === "pending" ? "item-active" : "item"
  }`;

  const removeItemHandler = () => {
    sendRemoveReq(item.id);
  };
  const changeQtyHandler = (value) => {
    sendUpdateReq(item.id, value);
  };

  useEffect(() => {
    if (removeStatus === "completed") {
      dispatch(userActions.setCart(cart));
    }
  }, [removeStatus, cart, dispatch]);
  useEffect(() => {
    if (updateStatus === "completed") {
      dispatch(userActions.setCart(updatedCart));
    }
  }, [updateStatus, updatedCart, dispatch]);

  return (
    <AnimatePresence>
      {removeStatus !== "pending" && (
        <motion.div
          styleName={itemClass}
          variants={cartItemVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {<img src={item.image.url} alt="Icon" />}
          <div styleName={"itemName"}>
            <Link to={`/cart/${item.product_id}`}>{item.name}</Link>
            {item.selected_options.length !== 0 && (
              <p>
                {item.selected_options[0]?.group_name}:{" "}
                {item.selected_options[0]?.option_name}
              </p>
            )}
          </div>
          <div styleName={"itemCounter"}>
            <span>
              {/* Conditional render on button element to prevent span clicks */}
              {updateStatus === "pending" ? (
                <button
                  onClick={() => changeQtyHandler(item.quantity - 1)}
                  disabled
                >
                  <HiOutlineMinusSm />
                </button>
              ) : (
                <button onClick={() => changeQtyHandler(item.quantity - 1)}>
                  <HiOutlineMinusSm />
                </button>
              )}
              {!updateStatus || updateStatus === "completed" ? (
                <span>{item.quantity}</span>
              ) : (
                ""
              )}
              {updateStatus === "pending" && (
                <span>
                  <RiLoader3Fill className="spinning" />
                </span>
              )}
              {/* Conditional render on button element to prevent span clicks */}
              {updateStatus === "pending" ? (
                <button
                  onClick={() => changeQtyHandler(item.quantity + 1)}
                  disabled
                >
                  <HiOutlinePlusSm />
                </button>
              ) : (
                <button onClick={() => changeQtyHandler(item.quantity + 1)}>
                  <HiOutlinePlusSm />
                </button>
              )}
            </span>
          </div>
          <span styleName={"itemPrice"}>{item.price.formatted_with_code}</span>
          <div styleName={"itemRemoveDiv"}>
            {/* Conditional render on button element to prevent span clicks */}
            {removeStatus ? (
              <button
                styleName={"itemRemoveButton"}
                onClick={removeItemHandler}
                disabled
              >
                {!removeStatus && <IoCloseOutline />}
                {removeStatus && <IoCloseOutline className={"spinning"} />}
              </button>
            ) : (
              <button
                styleName={"itemRemoveButton"}
                onClick={removeItemHandler}
              >
                {!removeStatus && <IoCloseOutline />}
                {removeStatus && <IoCloseOutline className={"spinning"} />}
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CSSModules(CartItem, classes);
