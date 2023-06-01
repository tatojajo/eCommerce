import { Routes, Route } from "react-router-dom";

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
import { Box } from "@mui/material";

const App = () => {
  return (
    <Box sx={{position:'relative'}}>
      <Header />
      <BreadCrumbs />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/product/:category/:title" element={<Product />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/brand/:brand" element={<BrandPage />} />
        <Route path="/admin-page" element={<Admin />} />
      </Routes>
      <Footer />
    </Box>
  );
};

export default App;
