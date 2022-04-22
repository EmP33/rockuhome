import React from "react";
import { useTranslation } from "react-i18next";

import classes from "./ReviewItem.module.scss";

const ReviewItem = ({ item }) => {
  const { t } = useTranslation();
  return (
    <div className={classes["review-item"]}>
      <img src={item.image.url} alt={item.name} />
      <div className={classes["review-item__description"]}>
        <h5>{item.name}</h5>
        <p>
          {t("quantity")}: {item.quantity} {t("for")}{" "}
          {item.price.formatted_with_code}
        </p>
        <p>{(item.quantity * item.price.raw).toFixed(2)} USD</p>
      </div>
    </div>
  );
};

export default ReviewItem;
