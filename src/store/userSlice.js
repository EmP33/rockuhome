import { createSlice } from "@reduxjs/toolkit";

import { commerce } from "../lib/commerce";

const initialState = {
  formType: "",
  cart: [],
  wishlist: [],
  sendingStatus: false,

  checkout: null,
  shippingData: null,
  order: null,
  errorMessage: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleFormType(state, action) {
      state.formType = action.payload;
    },
    setCart(state, action) {
      state.cart = action.payload;
    },
    refreshCart(state) {
      state.cart = [];
    },
    changeSendingStatus(state) {
      state.sendingStatus = !state.sendingStatus;
    },
    addItemToWishlist(state, action) {
      state.wishlist = [...state.wishlist, ...action.payload];
    },
    removeItemFromWishlist(state, action) {
      state.wishlist = state.wishlist.filter((item) => item !== action.payload);
    },
    setCheckoutToken(state, action) {
      state.checkout = action.payload;
    },
    setShippingData(state, action) {
      state.shippingData = action.payload;
    },
    setOrder(state, action) {
      state.order = action.payload;
    },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
    },
  },
});

export const addCartData = (productId, quantity, options = {}) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      if (options.undefined !== "") {
        const { cart } = await commerce.cart.add(productId, quantity, {
          ...options,
        });
        dispatch(userActions.setCart(cart));
      } else {
        const { cart } = await commerce.cart.add(productId, quantity);
        dispatch(userActions.setCart(cart));
      }
    };
    dispatch(userActions.changeSendingStatus());
    await sendRequest();
    dispatch(userActions.changeSendingStatus());
  };
};

// export const updateCartData = (productId, quantity) => {
//   return async (dispatch) => {
//     const sendRequest = async () => {
//       const { cart } = await commerce.cart.update(productId, { quantity });
//       dispatch(userActions.setCart(cart));
//     };
//     await sendRequest();
//   };
// };

// export const removeFromCartData = (productId) => {
//   return async (dispatch) => {
//     const sendRequest = async () => {
//       const { cart } = await commerce.cart.remove(productId);
//       dispatch(userActions.setCart(cart));
//     };
//     await sendRequest();
//   };
// };

export const handleCaptureCheckout = (checkoutTokenId, newOrder) => {
  return async (dispatch) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      dispatch(userActions.setOrder(incomingOrder));
      dispatch(userActions.refreshCart());
    } catch (err) {
      dispatch(userActions.setErrorMessage(err.data.error.message));
    }
  };
};

export const userActions = userSlice.actions;
export default userSlice;
