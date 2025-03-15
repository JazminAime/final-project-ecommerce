import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ProductList from "../pages/ProductList";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/ProtectedRoute";
import MyOrders from "../pages/MyOrders";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
      <Route
        path="/mis-pedidos"
        element={<ProtectedRoute element={<MyOrders />} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routing;
