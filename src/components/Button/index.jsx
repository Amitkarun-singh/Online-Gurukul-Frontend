import React from "react";
import PropTypes from "prop-types";

const shapes = {
  circle: "rounded-[50%]",
  round: "rounded-[5px]",
};

const variants = {
  fill: {
    orange_200_01: "bg-orange-200_01 text-white-a700",
    white_a700: "bg-white-a700 text-gray-988",
    red_50: "bg-red-50",
    red_300_01: "bg-red-300_01 text-white-a700",
  },
  outline: {
    red_300_01: "border-red-300_01 border border-solid text-red-300_01",
  },
};

const sizes = {
  "2xl": "h-[3.75rem] px-[1.38rem]",
  lg: "h-[3.38rem] px-[2.13rem] text-[1.13rem]",
  xl: "h-[3.63rem] px-[1.8rem] text-[1.00rem]",
  md: "h-[3.13rem] px-[2.13rem] text-[1.00rem]",
  xs: "h-[2.63rem] px-[0.88rem] text-[1.00rem]",
  sm: "h-[2.75rem] px-[0.63rem]",
};

const Button = ({
  children,
  className,
  leftIcon,
  rightIcon,
  shape,
  variant = "fill",
  size = "",
  color = "red_300_01",
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex flex-row items-center justify-center text-center cursor-pointer whitespace-nowrap ${
        shape && shapes[shape]
      } ${size && sizes[size]} ${variant && variants[variant]?.[color]}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  shape: PropTypes.oneOf(["circle", "round"]),
  size: PropTypes.oneOf(["2xl", "lg", "xl", "md", "xs", "sm"]),
  variant: PropTypes.oneOf(["fill", "outline"]),
  color: PropTypes.oneOf(["orange_200_01", "white_a700", "red_50", "red_300_01"]),
};
//added
export { Button };