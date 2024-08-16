import React from "react";

const sizes = {
  textxs: "text-[0.75rem] font-medium",
  textmd: "text-[1.00rem] font-medium sm:text-[0.81rem]",
  textlg: "text-[1.25rem] font-medium sm:text-[1.06rem]",
  textxl: "text-[1.88rem] font-medium md:text-[1.75rem] sm:text-[1.56rem]",
  headingxs: "text-[1.25rem] font-semibold sm:text-[1.06rem]",
  headings: "text-[1.56rem] font-semibold md:text-[1.44rem] sm:text-[1.31rem]",
  headingmd: "text-[1.88rem] font-semibold md:text-[1.75rem] sm:text-[1.56rem]",
  headinglg: "text-[1.56rem] font-semibold md:text-[1.44rem] sm:text-[1.31rem]",
  headingxl: "text-[1.88rem] font-semibold md:text-[1.75rem] sm:text-[1.56rem]",
  heading2xl: "text-[2.50rem] font-bold md:text-[2.38rem] sm:text-[2.13rem]",
  heading3xl: "text-[2.81rem] font-bold md:text-[2.56rem] sm:text-[2.38rem]",
  texts: "text-[0.88rem] font-medium not-italic",
};

const Heading = ({ children, className = "", size = "texts", as, ...restProps }) => {
  const Component = as || "h6";

  return (//.......
    <Component className={`text-gray-700_01 font-inter ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Heading };