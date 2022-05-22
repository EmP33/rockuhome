import React from "react";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Menu from "../../components/Home/Menu/Menu";

import WishList from "../Modals/WishList/WishList";
import ProductDetail from "../ProductDetail/ProductDetail";

import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const Layout = (props) => {
  const showMenu = useSelector((state) => state.modal.showMenu);

  return (
    <React.Fragment>
      <Navbar />
      <Menu showModal={showMenu} />
      <Routes>
        <Route path="/wishlist/*" element={<WishList />}>
          <Route path={`:productID`} element={<ProductDetail />} />
        </Route>
      </Routes>
      {props.children}
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
