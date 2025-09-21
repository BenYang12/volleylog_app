import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./styles.css";

/*Essentially, browser router manages UI synchronization with URL*/
/* Wrap entire React application/part where routing is needed within Browser Router component at highest level*/
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
