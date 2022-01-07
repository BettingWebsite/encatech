import classNames from "classnames";
import React from "react";
import "../vip casino/Loader.css";


const FullPageLoader = () => {
  return (
    <div className={classNames("main-loader")} id="content-wrapper">
      <div className={classNames("loader")}>
 
        <i
          className="fa fa-spinner fa-spin fa-3x fa-fw text-danger mt-3"
          aria-hidden="true"
        ></i>
      </div>
    </div>
  );
};

export default FullPageLoader;
