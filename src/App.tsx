import { Routes, Route } from "react-router-dom";
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
import Admin from "./Admin/Components/AdminMain/Admin";

const App = () => {
  return (
    <>
      <Header />
      <BreadCrumbs />
      <Routes>
        <Route path="/user" element={<User />} />
        <Route path="/" element={<Home />} />
        <Route path="/product/:id/:title" element={<Product />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/brand" element={<BrandPage />} />
        <Route path="/admin-page" element={<Admin />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
