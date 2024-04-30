import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function LogoutPage() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  function logout() {
    removeCookie("token");
    removeCookie("matricNo");
    removeCookie("fullName");
    removeCookie("totalItem");
    removeCookie("totalPrice");
    removeCookie("cart");
  }

  useEffect(() => {
    logout()
  }, [])
  return (
    <div
      className="flex justify-center items-center"
      style={{ height: "90vh" }}
    >
      <div>
        <p className="text-4xl font-semibold pb-5">
          Thank you for using our service
        </p>
        <a href="/">
          <div className="flex justify-center">
            <button className="btn btn-primary px-5">Direct to Login</button>
          </div>
        </a>
      </div>
    </div>
  );
}
