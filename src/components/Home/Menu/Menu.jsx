import React, { useCallback } from "react";
import ReactDOM from "react-dom";
import "./menu.scss";

import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../store/modalSlice";
import Backdrop from "../../UI/Backdrop/Backdrop";

import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Menu = ({ showModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const categories = useSelector((state) => state.products.categories);

  const hideModalHandler = useCallback(() => {
    dispatch(modalActions.toggleShowMenu());
  }, [dispatch]);

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <React.Fragment>
          <Backdrop isActive={showModal} onHideModal={hideModalHandler} />
          <menu className={showModal ? "menu menu-active" : "menu"}>
            <h3>{t("browse_categories")}</h3>
            <button onClick={hideModalHandler}>&times;</button>
            <ul>
              {categories.map((category) => (
                <Link to={`/category/${category.slug}`} key={category.id}>
                  <li onClick={hideModalHandler}>{t(`${category.slug}`)}</li>
                </Link>
              ))}
            </ul>
            <h3>{t("help_and_settings")}</h3>
            <ul>
              <Link to={`/help`}>
                <li onClick={hideModalHandler}>{t("help_center")}</li>
              </Link>
              <Link to={`${location.pathname}/wishlist`}>
                <li onClick={hideModalHandler}>{t("wishlist")}</li>
              </Link>
            </ul>
          </menu>
        </React.Fragment>,
        document.querySelector("#menu-root")
      )}
    </React.Fragment>
  );
};

export default React.memo(Menu);
