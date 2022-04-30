import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./SearchPage.scss";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { ImSearch } from "react-icons/im";
import { IoCloseSharp } from "react-icons/io5";

import { useTranslation } from "react-i18next";

import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
} from "@material-ui/core";

import logo from "../../assets/logo.png";

const SearchPage = ({ onToggleSearch, activeSearch }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.products.categories);
  const [category, setCategory] = useState(
    categories[categories?.length - 1].slug
  );
  const [searchInput, setSearchInput] = useState("");
  const submitSearchHandler = (e) => {
    e.preventDefault();

    if (searchInput) {
      navigate(`/search/${category}/${searchInput}`);
    }
  };

  const changeCategoryHandler = (event) => {
    setCategory(event.target.value);
  };

  const changeInputHandler = (e) => {
    setSearchInput(e.target.value);
  };
  return (
    <>
      {ReactDOM.createPortal(
        <div className="search-page">
          <button onClick={onToggleSearch} className="toggle-button">
            <IoCloseSharp className="closeIcon" />
          </button>
          <img src={logo} alt="logo" />
          <form className="header-search" onSubmit={submitSearchHandler}>
            <FormControl size="small" className="select">
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
              className="search-bar"
              variant="outlined"
              onChange={changeInputHandler}
              inputProps={{ style: { color: "#383838", fontSize: "1.6rem" } }}
            />
            <button className="button" type="submit">
              <ImSearch className="searchIcon" />
            </button>
          </form>
        </div>,
        document.querySelector("#modals-root")
      )}
    </>
  );
};

export default SearchPage;
