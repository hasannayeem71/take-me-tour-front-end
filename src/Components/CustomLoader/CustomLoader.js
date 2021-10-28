import React from "react";
import "./CustomLoader.css";
const CustomLoader = () => {
  return (
    <div className="outer-load">
      <div className="lds-hourglass"></div>
    </div>
  );
};

export default CustomLoader;
