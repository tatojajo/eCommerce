import React, { useState } from "react";
import { Routes, Route, Router } from "react-router-dom";
import { useAppSelector } from "./redux/hooks";
// * components
import Header from "./component/Header";
import Footer from "./component/Footer";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import { HomeState } from "./@types/general";
import SignIn from "./pages/SignIn";
import BreadCrumbs from "./component/BreadCrumbs";
import User from "./pages/User";

const App = () => {
  const [open, setOpen] = useState(false)
  const { selectedProduct } = useAppSelector<HomeState>((state) => state);

  return (
    <>
      <Header   />
      <BreadCrumbs/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path={`/product/:id/${selectedProduct?.title}`}
          element={<Product />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/user" element={<User/>}/>
      </Routes>


      <Footer />
    </>
  );
};

export default App;
