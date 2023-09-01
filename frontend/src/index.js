import React from "react";
import ReactDOM from "react-dom/client";
import "../src/components/css/index.css";
import App from "./pages/App";
import Routing from "./Routing";
import Stats from "./pages/Stats";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>
);
