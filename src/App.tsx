import { Routes, Route, useNavigate } from 'react-router-dom';

// * components
import Header from './component/Header';
import Footer from './component/Footer';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import BreadCrumbs from './component/BreadCrumbs';
import User from './pages/User';
import BrandPage from './pages/BrandPage';
import AdminPage from './Admin/Components/AdminPage';
import SearchPage from './pages/SearchPage';
import Category from './pages/Category';

import { Box } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthenticated } from './Helpers/Auth/isAuthenticated';
import Contact from './pages/Contact';

const App = () => {
  const { isAdmin, isUser } = isAuthenticated();
  const navigate = useNavigate();

  if (isAdmin) {
    return (
      <Box>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/product/:category/:title" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/brand/:brand" element={<BrandPage />} />
          <Route path="/search/:inputValue" element={<SearchPage />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin-page" element={<AdminPage />} />
        </Routes>
      </Box>
    );
  } else if (!isAdmin) {
    return (
      <Box>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/product/:category/:title" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/brand/:brand" element={<BrandPage />} />
          <Route path="/search/:inputValue" element={<SearchPage />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </Box>
    );
  } else {
    navigate('/'); 
    return null;
  }
};

export default App;
