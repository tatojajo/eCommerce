import React from "react";
import { Routes, Route } from "react-router-dom";

// * components
import Header from "./component/Header";
import Footer from "./component/Footer";
import Home from "./pages/Home";
import Product from "./pages/Product";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";

const App = () => {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
