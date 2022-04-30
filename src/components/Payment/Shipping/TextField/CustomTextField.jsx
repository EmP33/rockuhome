import React from "react";

import TextField from "@mui/material/TextField";
import { useFormContext, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

const CustomTextField = ({ name, label, placeholder, inputRef, isInValid }) => {
  const { t } = useTranslation();
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      fullWidth
      render={({ field }) => (
        <TextField
          error={!isInValid}
          label={label}
          placeholder={placeholder}
          variant="outlined"
          helperText={!isInValid ? t("incorrect-entry") : ""}
          value={""}
          inputRef={inputRef}
          {...field}
        />
      )}
    />
  );
};
export default CustomTextField;
