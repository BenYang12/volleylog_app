//Entry point/bootstrapping React
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; //turns on client-side routing -> URLs like /auth and /charts without reloading page
import App from "./App.jsx"; //main react component, rest of app lives inside this
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

//main.jsx = plug React into the page + wrap app in routing + load styles
