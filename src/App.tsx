import { Routes, Route } from "react-router-dom";
import { isAuthenticated } from "./Helpers/Auth/isAuthenticated";
// * components
import Header from "./component/Header";
import Footer from "./component/Footer";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
<<<<<<< HEAD
import BreadCrumbs from "./component/BreadCrumbs";
import User from "./pages/User";
import BrandPage from "./pages/BrandPage";
import Admin from "./Admin/Components/AdminMain/Admin";
=======
import { HomeState } from "./@types/general";
import SignIn from "./pages/SignIn";
import BreadCrumbs from "./component/BreadCrumbs";
import User from "./pages/User";
>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b

const App = () => {
  return (
    <>
<<<<<<< HEAD
      <Header />
      <BreadCrumbs />
=======
      <Header   />
      <BreadCrumbs/>

>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
      <Routes>
        <Route path="/user" element={<User />} />
        <Route path="/" element={<Home />} />
<<<<<<< HEAD
        <Route path="/product/:id/:title" element={<Product />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/brand" element={<BrandPage />} />
        <Route path="/admin-page" element={<Admin />} />
      </Routes>
=======
        <Route
          path={`/product/:id/${selectedProduct?.title}`}
          element={<Product />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/user" element={<User/>}/>
      </Routes>


>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
      <Footer />
    </>
  );
};

export default App;
