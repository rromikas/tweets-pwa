import React from "react";
import ButtonBase from "@material-ui/core/ButtonBase";

const Button = ({ primary = true, className = "", ...rest }) => {
  return (
    <ButtonBase
      type="button"
      {...rest}
      className={`${className} outline-none h-10 w-36 text-center select-none rounded-xl font-bold ${
        primary ? "bg-blue-500 hover:bg-blue-501 " : "bg-red-500 hover:bg-red-501"
      }  transition cursor-pointer`}
    ></ButtonBase>
  );
};

export default Button;
