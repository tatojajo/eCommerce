import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

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
import SearchPage from "./pages/SearchPage";
import { Box } from "@mui/material";

import "react-toastify/dist/ReactToastify.css";
import { isAuthenticated } from "./Helpers/Auth/isAuthenticated";
import AdminHeader from "./Admin/Components/Header";

const App = () => {
  const navigate = useNavigate();
  const { isAdmin, isUser } = isAuthenticated();

  return (
    <Box>
      <Header />
      <BreadCrumbs />
      <Routes>
        {!isAdmin && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<User />} />
            <Route path="/product/:category/:title" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/brand/:brand" element={<BrandPage />} />
            <Route path="/search/:inputValue" element={<SearchPage />} />
          </>
        )}
        {isAdmin && (
          <>
            <Route path="/admin-page" element={<Admin />} />
          </>
        )}
      </Routes>
      <Footer />
    </Box>
  );
};

export default App;
