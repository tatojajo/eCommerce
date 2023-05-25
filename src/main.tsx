import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
<<<<<<< HEAD
=======
import { ThemeProvider } from "@mui/material";
// import ProductsProvider from "./StoreContext/ProductStore/ProductStroreContext";

>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
import { Provider } from "react-redux";
import store from "./redux/store";
import "./Translation";

import App from "./App";

import "./index.css";
import AppTheme from "./theme/AppTheme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AppTheme>
          <App />
        </AppTheme>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
