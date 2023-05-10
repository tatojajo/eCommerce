import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import ProductsProvider from "./StoreContext/ProductStore/ProductStroreContext";

import { Provider } from "react-redux";
import store from "./redux/store";
import './Translation'


import App from "./App";



import "./index.css";




ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);