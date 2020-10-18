import "./assets/styles/index.scss";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

if (typeof window !== "undefined") {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
}
