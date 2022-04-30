import React, { useState } from "react";
import CSSModules from "react-css-modules";
import styles from "./Review.module.scss";

import { IoChevronDownOutline } from "react-icons/io5";

import ReviewItem from "./ReviewItem";

import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Review = () => {
  const { t } = useTranslation();
  const checkoutToken = useSelector((state) => state.user.checkout);
  const [showReview, setShowReview] = useState(false);

  const showReviewHandler = () => {
    setShowReview((prevState) => !prevState);
  };

  return (
    checkoutToken && (
      <section styleName="review">
        <div styleName="review-header">
          <h3>{t("in-your-basket")}</h3>
          <button onClick={showReviewHandler}>
            <IoChevronDownOutline
              styleName={!showReview && `review-header__icon`}
            />
          </button>
        </div>
        <div styleName={showReview && `review-total`}>
          <div styleName="result">
            <p>
              {t("products-price")}:
              <span>{checkoutToken.live.subtotal.formatted_with_code}</span>
            </p>
            {checkoutToken.amount_saved && (
              <p styleName="result-discount">
                {t("discount")}:
                <span>{checkoutToken.amount_saved.formatted_with_code}</span>
              </p>
            )}
            {!!checkoutToken.shipping.price.raw && (
              <p>
                {t("estimated-shipping-cost")}:
                <span>{checkoutToken.shipping.price.formatted_with_code}</span>
              </p>
            )}
            <p styleName="result-total">
              {t("total")}:
              <span>{checkoutToken.live.total.formatted_with_code}</span>
            </p>
          </div>
          <div styleName="products">
            {checkoutToken &&
              checkoutToken.line_items.map((item) => (
                <ReviewItem key={item.id} item={item} />
              ))}
          </div>
        </div>
      </section>
    )
  );
};

export default CSSModules(Review, styles);
