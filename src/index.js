import React from "react";
import ReactDOM from "react-dom";
import HeeraWeb from "./heera-web";
import HeeraMobile from "./heera-mobile";
import "./index.css";

var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);


if (isMobile) {
  ReactDOM.render(
    <React.StrictMode>
      <HeeraMobile />
    </React.StrictMode>,
    document.getElementById("root")
  );
} else {
  ReactDOM.render(
    <React.Fragment>
      <HeeraWeb />
    </React.Fragment>,
    document.getElementById("root")
  );
}
