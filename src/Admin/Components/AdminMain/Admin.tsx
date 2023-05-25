import Sidebar from "../Sidebar";
import Products from "../Products";
import Customers from "../Customers";
import Dashboard from "../Dashboard";
import Orders from "../Order";
import Header from "../Header";

const Admin = () => {
  return (
    <>
      <div style={{ width: "100%", height: "100vh" }}>
        <Header />
        <Sidebar />
      </div>
    </>
  );
};

export default Admin;
