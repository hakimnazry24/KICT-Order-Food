import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AdminLoginPage from "./pages/admin_login_page";
import AdminPanel from "./pages/admin_panel_page";
import CheckoutPage from "./pages/checkout_page";
import HomePage from "./pages/home_page";
import LoginPage from "./pages/login_page";
import LogoutPage from "./pages/logout_page";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/register_page";
import SuccessfulRegisterPage from "./pages/successful_register_page";

export default function App() {
  /* function addToCart(itemId: number, price: number) {
    var sum = 0;
    var total = 0;
    setCart([[itemId, price], ...cart]);
    cart.forEach((item) => {
      sum += item[1];
      total += 1;
    });
    setTotalPrice(sum);
    setTotalItem(total);
    setShowAlert(true);
  } */

  return (
    <div>
      <BrowserRouter>
        {location.pathname !== "/successful-register" &&
          location.pathname !== "/admin-panel" &&
          location.pathname !== "/administrator" &&
          location.pathname !== "/login" &&
          location.pathname !== "/logout" && <Navbar sum={10} totalItem={10} />}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/successful-register"
            element={<SuccessfulRegisterPage />}
          />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/administrator" element={<AdminLoginPage />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
