import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { CssVarsProvider } from "@mui/joy/styles";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Context } from "./contexts/log-register-context";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CssVarsProvider>
    <Context>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Context>
  </CssVarsProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
