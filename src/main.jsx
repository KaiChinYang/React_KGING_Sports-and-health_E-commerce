import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/all.scss";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import './Custom.css'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
