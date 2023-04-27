import React from "react";

// * components
import Header from "./component/Header";
import Footer from "./component/Footer";
import Slider from "./component/Slider/Slider";
import Home from "./pages/Home";
function App() {
  return <div>
    <Header/>
    <Slider/>
    <Home/>
    <Footer/>
  </div>;
}

export default App;
