import React, { useState } from "react";
import CSSModules from "react-css-modules";
import styles from "./Navbar.module.scss";

import i18next from "i18next";
import logo from "../../assets/logo.png";

import { Link, useLocation } from "react-router-dom";

import { ImSearch } from "react-icons/im";
import { IoHeartOutline, IoMenu } from "react-icons/io5";
import { RiShoppingCartFill, RiLoader3Fill } from "react-icons/ri";
import { BsFillEnvelopeFill } from "react-icons/bs";

import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/modalSlice";

import SearchBar from "../SearchBar/SearchBar";
import SearchPage from "../../pages/SearchPage/SearchPage";

import {
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
} from "@material-ui/core";

const languages = [
  {
    code: "en",
    name: "English",
    country_currency: "USD",
  },
  {
    code: "pl",
    name: "Polski",
    country_currency: "PLN",
  },
];

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const currentLanguageCode = Cookies.get("i18next") || "en";
  const cart = useSelector((state) => state.user.cart);
  const sendingStatus = useSelector((state) => state.user.sendingStatus);

  const [activeSearch, setActiveSearch] = useState(false);

  const hideModalHandler = () => {
    dispatch(modalActions.toggleShowMenu());
  };

  const changeLangHandler = (e) => {
    i18next.changeLanguage(e.target.value);
  };

  const toggleSearchPageHandler = () => {
    setActiveSearch((prevState) => !prevState);
  };

  return (
    <React.Fragment>
      {activeSearch ? (
        <SearchPage
          activeSearch={activeSearch}
          onToggleSearch={toggleSearchPageHandler}
        />
      ) : (
        ""
      )}
      <header styleName="header">
        <div styleName="header-logo">
          <Link to="/">
            <img src={logo} alt="GrooveFinds" />
          </Link>
        </div>
        <SearchBar activeSearch={activeSearch} />
        <div styleName="cart-wrapper">
          <Link to="/cart">
            {cart.total_items && !sendingStatus ? (
              <span>{cart.total_items}</span>
            ) : (
              ""
            )}
            {sendingStatus && (
              <span>
                <RiLoader3Fill className="spinning" />
              </span>
            )}

            <RiShoppingCartFill styleName="cartIcon" />
          </Link>
        </div>
        <div styleName="chat-wrapper">
          <Link to="/help/contact">
            <BsFillEnvelopeFill styleName="chatIcon" />
          </Link>
        </div>
        <div styleName="search-wrapper">
          <button onClick={toggleSearchPageHandler}>
            <ImSearch styleName="searchIcon" />
          </button>
        </div>
      </header>

      <nav styleName="navigation">
        <div styleName="navigation__menu-wrapper">
          <button onClick={hideModalHandler}>
            <IoMenu styleName="menu-icon" /> Menu
          </button>
        </div>
        <div styleName="navigation-actions">
          <Link to={`/help`} styleName="button-help">
            {t("help_center")}
          </Link>
          <FormControl size="small">
            <Select
              displayEmpty
              styleName="country-selector"
              id="demo-simple-select"
              value={currentLanguageCode}
              onChange={changeLangHandler}
              input={<OutlinedInput />}
              inputProps={{ "aria-label": "Without label" }}
            >
              {languages.map((lang) => (
                <MenuItem key={lang.code} value={lang.code}>
                  {lang.name} / {lang.country_currency}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Link to={`${location.pathname}/wishlist`} styleName="wishButton">
            <IoHeartOutline styleName="button-icon" />
            {t("wishlist")}
          </Link>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default CSSModules(Navbar, styles);
