import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AuthLayout from "./pages/AuthenLayout";
import UnauthLayout from "./pages/UnauthenLayout";
import Keranjang from "./pages/Cart";
import SidebarProvider from "./Component/SidebarProvider";
import { Provider } from "react-redux";
import store from "./store";
import CartProvider from "./Component/CartContext";
import DetailProduct from "./pages/DetailProduct";
import BestSellingProducts from "./pages/BestSellingProduct";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SidebarProvider>
        <CartProvider>
          <Provider store={store}>
            <Routes>
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
              <Route element={<UnauthLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/best-sellers" element={<BestSellingProducts />} />
                <Route path="/carts" element={<Keranjang />} />
                <Route path="/product/:id" element={<DetailProduct />} />
              </Route>
            </Routes>
          </Provider>
        </CartProvider>
      </SidebarProvider>
    </BrowserRouter>
  </StrictMode>
);
