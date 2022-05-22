import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import { useLocation } from "react-router-dom";

import {
  CartPage,
  PaymentPage,
  ProductsPage,
  HelpPage,
  NotFoundPage,
  LoadingPage,
  RegulationsPage,
  ShippingPage,
  PaymentsPage,
  ContactPage,
  PrivacyPage,
  SearchingPage,
  ProductDetailPage,
} from "./pages";

// COMMERCE
import { commerce } from "./lib/commerce.js";

// REDUX STORE
import { useDispatch } from "react-redux";
import { productActions } from "./store/productsSlice";
import { userActions } from "./store/userSlice";

import useHttp from "./hooks/use-http";
import { getAllProducts, getAllCategories } from "./lib/api";
import IntroPage from "./pages/Intro/IntroPage";

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const {
    data: products,
    sendRequest: sendProductRequest,
    status: productStatus,
  } = useHttp(getAllProducts, true);
  const {
    data: categories,
    sendRequest: sendCategoryRequest,
    status: categoryStatus,
  } = useHttp(getAllCategories, true);

  const fetchCart = async () => {
    dispatch(userActions.setCart(await commerce.cart.retrieve()));
  };

  const fetchWishlist = () => {
    const products = JSON.parse(localStorage.getItem("wishlist"));
    if (products) {
      dispatch(userActions.addItemToWishlist(products));
    }
  };

  useEffect(() => {
    sendProductRequest();
    sendCategoryRequest();
    fetchCart();
    fetchWishlist();
  }, []);

  if (productStatus === "pending" || categoryStatus === "pending") {
    return <LoadingPage />;
  }
  dispatch(productActions.setProducts(products));
  dispatch(productActions.setCategories(categories));

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home/*" element={<IntroPage />}>
          <Route path={`product/:productID`} element={<ProductDetailPage />} />
        </Route>
        <Route path="/cart/*" element={<CartPage />}>
          <Route path={`:productID`} element={<ProductDetailPage />} />
        </Route>
        <Route path="/checkout/*" element={<PaymentPage />}>
          <Route path={`:productID`} element={<ProductDetailPage />} />
        </Route>
        <Route path="/category/:categoryID/*" element={<ProductsPage />}>
          <Route path={`product/:productID`} element={<ProductDetailPage />} />
        </Route>
        <Route
          path="/search/:categoryID/:searchInput/*"
          element={<SearchingPage />}
        >
          <Route path={`product/:productID`} element={<ProductDetailPage />} />
        </Route>
        <Route
          path="/search/:categoryID"
          element={<Navigate to="/category/wszystkie-kategorie" />}
        ></Route>
        <Route path="/help/*" element={<HelpPage />}>
          <Route path={`privacy`} element={<PrivacyPage />} />
          <Route path={`shipping`} element={<ShippingPage />} />
          <Route path={`payments`} element={<PaymentsPage />} />
          <Route path={`regulations`} element={<RegulationsPage />} />
          <Route path={`contact`} element={<ContactPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
