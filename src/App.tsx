import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AdminLoginPage from "./pages/admin_login_page";
import HomePage from "./pages/home_page";
import LoginPage from "./pages/login_page";
import LogoutPage from "./pages/logout_page";
import RegisterPage from "./pages/register_page";
import SuccessfulRegisterPage from "./pages/successful_register_page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./pages/not_found_page";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

type CartItem = {
  id: number;
  price: number;
};

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalItem, setTotalItem] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cookies, setCookie] = useCookies();

  // useEffect(() => {
  //   setTotalItem(cookies.totalItem);
  //   setTotalPrice(cookies.totalPrice);
  // }, [totalItem, totalPrice]);

  useEffect(() => {
    setTotalItem(cookies.totalItem);
    setTotalPrice(cookies.totalPrice);
  }, []);

  const excludedPaths = [
    "/",
    "/successful-register",
    "/admin-panel",
    "/administrator",
    "/logout",
  ];
  // render component based on path
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
      errorElement: <NotFoundPage />,
    },
    {
      path: "/logout",
      element: <LogoutPage />,
    },
    {
      path: "/home",
      element: (
        <HomePage
          setTotalItem={setTotalItem}
          setTotalPrice={setTotalPrice}
          totalItem={totalItem}
          totalPrice={totalPrice}
        />
      ),
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/successful-register",
      element: <SuccessfulRegisterPage />,
    },
    {
      path: "/administrator",
      element: <AdminLoginPage />,
    },
    {
      path: "/successful-register",
      element: <SuccessfulRegisterPage />,
    },
  ]);

  return (
    <div>
      {!excludedPaths.includes(location.pathname) && (
        <Navbar
          cart={cart}
          setCart={setCart}
          totalItem={totalItem}
          totalPrice={totalPrice}
        />
      )}
      <RouterProvider router={router}></RouterProvider>
      <Footer></Footer>
    </div>
  );
}
