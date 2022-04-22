import React, { useState } from "react";
import i18next from "i18next";
import logo from "../../assets/logo.png";

import classes from "./Navbar.module.scss";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { ImSearch } from "react-icons/im";
import { IoHeartOutline, IoMenu } from "react-icons/io5";
import { RiShoppingCartFill, RiLoader3Fill } from "react-icons/ri";
import { BsFillEnvelopeFill } from "react-icons/bs";

import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
} from "@material-ui/core";

import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/modalSlice";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const currentLanguageCode = Cookies.get("i18next") || "en";

  const categories = useSelector((state) => state.products.categories);
  const cart = useSelector((state) => state.user.cart);
  const sendingStatus = useSelector((state) => state.user.sendingStatus);
  const [category, setCategory] = useState(
    categories[categories.length - 1].slug
  );
  const [searchInput, setSearchInput] = useState("");

  const changeCategoryHandler = (event) => {
    setCategory(event.target.value);
  };
  const changeInputHandler = (e) => {
    setSearchInput(e.target.value);
  };
  const hideModalHandler = () => {
    dispatch(modalActions.toggleShowMenu());
  };

  const changeLangHandler = (e) => {
    i18next.changeLanguage(e.target.value);
  };

  const submitSearchHandler = (e) => {
    e.preventDefault();

    if (searchInput) {
      navigate(`/search/${category}/${searchInput}`);
    }
  };

  return (
    <React.Fragment>
      <header className={classes.header}>
        <div className={classes["header-logo"]}>
          <Link to="/">
            <img src={logo} alt="GrooveFinds" />
          </Link>
        </div>

        <form
          className={classes["header-search"]}
          onSubmit={submitSearchHandler}
        >
          <FormControl size="small" className={classes.select}>
            <Select
              displayEmpty
              value={category}
              onChange={changeCategoryHandler}
              input={<OutlinedInput />}
              inputProps={{ "aria-label": "Without label" }}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.slug}>
                  {t(`${cat.slug}`)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            size="small"
            className={classes["search-bar"]}
            variant="outlined"
            onChange={changeInputHandler}
            inputProps={{ style: { color: "#fff" } }}
          />
          <button className={classes.button} type="submit">
            <ImSearch className={classes.searchIcon} />
          </button>
        </form>

        <div className={classes["cart-wrapper"]}>
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

            <RiShoppingCartFill className={classes["cartIcon"]} />
          </Link>
        </div>
        <div className={classes["chat-wrapper"]}>
          <Link to="/help/contact">
            <BsFillEnvelopeFill className={classes.chatIcon} />
          </Link>
        </div>
      </header>

      <nav className={classes["navigation"]}>
        <div className={classes["navigation__menu-wrapper"]}>
          <button onClick={hideModalHandler}>
            <IoMenu className={classes["menu-icon"]} /> Menu
          </button>
        </div>
        <div className={classes["navigation-actions"]}>
          <Link to={`/help`} className={classes["button-help"]}>
            {t("help_center")}
          </Link>
          <select
            className={classes["country-selector"]}
            onChange={changeLangHandler}
            value={currentLanguageCode}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name} / {lang.country_currency}
              </option>
            ))}
          </select>
          <Link
            to={`${location.pathname}/wishlist`}
            className={classes.wishButton}
          >
            <IoHeartOutline className={classes["button-icon"]} />
            {t("wishlist")}
          </Link>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
