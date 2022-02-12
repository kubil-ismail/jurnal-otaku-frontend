import React from "react";
import ReactDOM from "react-dom";
import Root from "app/root";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "style/main.style.css";

ReactDOM.render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
