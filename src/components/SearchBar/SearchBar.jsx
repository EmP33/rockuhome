import React, { useState } from "react";
import CSSModules from "react-css-modules";
import styles from "./SearchBar.module.scss";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { ImSearch } from "react-icons/im";

import { useTranslation } from "react-i18next";

import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
} from "@material-ui/core";

const SearchPage = () => {
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
    <form styleName="header-search" onSubmit={submitSearchHandler}>
      <FormControl size="small" styleName="select">
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
        styleName="search-bar"
        variant="outlined"
        onChange={changeInputHandler}
        inputProps={{ style: { color: "#fff" } }}
      />
      <button className="button" type="submit">
        <ImSearch styleName="searchIcon" />
      </button>
    </form>
  );
};

export default CSSModules(SearchPage, styles);
