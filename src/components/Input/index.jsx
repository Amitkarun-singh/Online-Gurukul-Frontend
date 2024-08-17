import React from "react";
import PropTypes from "prop-types";

const shapes = {
  round: "rounded-tl-[10px] rounded-bl-[10px]",
};

const variants = {
  fill: {
    white_A700: "bg-white_a700 text-gray_700_01",
    white_A700_33: "bg-white_a700_33 text-white_a700_33",
  },
};
//......
const sizes = {
  md: "h-[4.13rem] pl-[1.25rem] pr-[0.38rem] text-[1.00rem]",
  sm: "h-[3.13rem] pl-[1.13rem] pr-[2.13rem] text-[1.00rem]",
  lg: "h-[3.63rem] pl-[1.25rem] pr-[2.13rem] text-[1.00rem]",
};

const Input = React.forwardRef(
  (
    {
      className = "",
      name = "",
      placeholder = "",
      type = "text",
      label = "",
      prefix,
      suffix,
      onChange,
      shape,
      variant = "fill",
      size = "sm",
      color = "white_a700_33",
      ...restProps
    },
    ref
  ) => {
    return (
      <label
        className={`${className} flex items-center justify-center cursor-text rounded-tl-[10px] rounded-bl-[10px] text-[1.00rem] ${
          shape && shapes[shape]
        } ${variant && (variants[variant]?.[color] || variants[variant])} ${
          size && sizes[size]
        }`}
      >
        {!!label && label}
        {!!prefix && prefix}
        <input
          ref={ref}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          {...restProps}
        />
        {!!suffix && suffix}
      </label>
    );
  }
);

Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  onChange: PropTypes.func,
  shape: PropTypes.oneOf(["round"]),
  size: PropTypes.oneOf(["md", "sx", "sm"]),
  variant: PropTypes.oneOf(["fill"]),
  color: PropTypes.oneOf(["white_A700", "white_A700_33"]),
};

export { Input };
