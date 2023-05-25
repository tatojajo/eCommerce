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

const AdminRoutes = () => {
  const navigate = useNavigate();
  const { isAdmin } = isAuthenticated();

  if (!isAdmin) {
    navigate("/home");
    return null;
  }

  return (
    <>
      <AdminPage />
    </>
  );
};

const UserRoutes = () => {
  const navigate = useNavigate();
  const { isUser } = isAuthenticated();

  if (!isUser) {
    navigate("/home");
    return null;
  }

  return (
    <>
      <User />
    </>
  );
};

const App = () => {
  const navigate = useNavigate();
  const { isAdmin, isUser } = isAuthenticated(); // Your authentication logic

  useEffect(() => {
    if (isAdmin) {
      navigate("/admin-page");
    }
  }, [navigate, isAdmin]);

  return (
    <>
      <Header />
      <BreadCrumbs />
      <Routes>
        {isAdmin && <Route path="/admin-page" element={<AdminRoutes />} />}
        {isUser && <Route path="/user" element={<UserRoutes />} />}

        <Route path="/" element={<Home />} />
        <Route path="/product/:id/:title" element={<Product />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/brand" element={<BrandPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
