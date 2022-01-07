import classNames from "classnames";
import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className={classNames("main-loader")}>
      <div className={classNames("loader")}>
        <svg className={classNames("circular-loader")} viewBox="25 25 50 50">
          <circle
            className={classNames("loader-path")}
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke="#EB2B44"
            strokeWidth="2.5"
          />
        </svg>
      </div>
    </div>
  );
};

export default Loader;
