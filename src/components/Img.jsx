import React from "react";

const Img = ({ className, src = "defaultNoData.png", alt = "testing", ...restProps }) => {
  return <img className={className} src={src} alt={alt} {...restProps} loading="lazy" />;
};
//.....
export { Img };