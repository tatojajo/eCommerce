import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { isAuthenticated } from "./Helpers/Auth/isAuthenticated";
// * components
import Header from "./component/Header";
import Footer from "./component/Footer";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import BreadCrumbs from "./component/BreadCrumbs";
import User from "./pages/User";
import BrandPage from "./pages/BrandPage";
import AdminPage from "./Admin";

const UserRoutes = () => {
  return (
    <>
      <Header />
      <BreadCrumbs />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id/:title" element={<Product />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/user" element={<User />} />
        <Route path="/brand" element={<BrandPage />} />
      </Routes>
      <Footer />
    </>
  );
};

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated().isAdmin) {
      navigate("/admin-page");
    } else {
      navigate("/");
    }
  }, [isAuthenticated().isAdmin, navigate]);
  return (
    <Routes>
      <Route path="/*" element={<UserRoutes />} />
      <Route path="/admin-page" element={<AdminPage />} />
    </Routes>
  );
};

export default App;
