import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import { useAppSelector } from "./redux/hooks";
// * components
import Header from "./component/Header";
import Footer from "./component/Footer";
import Home from "./pages/Home";
import Product from "./pages/Product";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import { HomeState } from "./@types/general";

const App = () => {
  const { selectedProduct } = useAppSelector<HomeState>(
    (state) => state.homeReducer
  );

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path={`/product/:id/${selectedProduct?.title}`}
          element={<Product />}
        />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;


