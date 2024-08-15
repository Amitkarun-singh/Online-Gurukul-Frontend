import React from "react";
import PropTypes from "prop-types";

const shapes = {
  round: "rounded-tl-[10px] rounded-bl-[10px]",
};

const variants = {
  fill: {
    white_A700: "bg-white_A700 text-gray_700_01",
    white_A700_33: "bg-white_A700_33 text-white_A700_33",
  },
};
//......
const sizes = {
  md: "p-[1.13rem] sm:p-[1.25rem] pl-[2.13rem] text-[1.00rem]",
  sm: "p-[1.13rem] pl-[1.13rem] text-[0.88rem]",
  lg: "p-[1.3rem] sm:p-[1.25rem] pl-[2.13rem] text-[1.00rem]",
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
      color = "white_A700_33",
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
        {label && <>{label}</>}
        {prefix && <>{prefix}</>}
        <input
          ref={ref}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          {...restProps}
        />
        {suffix && <>{suffix}</>}
      </label>
    );
  }
);

Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.node,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  onChange: PropTypes.func,
  shape: PropTypes.oneOf(["round"]),
  size: PropTypes.oneOf(["md", "lg", "sm"]),
  variant: PropTypes.oneOf(["fill"]),
  color: PropTypes.oneOf(["white_A700", "white_A700_33"]),
};

export { Input };
