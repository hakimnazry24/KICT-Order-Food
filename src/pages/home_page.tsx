import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Alert from "../components/Alert";

type Item = {
  id: number;
  name: string;
  price: number;
  stallId: number;
  image: string;
};

type CartItem = {
  id: number;
  price: number;
};

type HomePageProps = {
  totalItem: number;
  setTotalItem: (totalItem: number) => void;
  totalPrice: number;
  setTotalPrice: (totalPrice: number) => void;
};

export default function HomePage({
  totalItem,
  setTotalItem,
  totalPrice,
  setTotalPrice,
}: HomePageProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [cookies, setCookie] = useCookies();

  useEffect(() => {
    if (cookies.cart === undefined) setCookie("cart", []);
    if (cookies.totalPrice === undefined || cookies.totalPrice === null)
      setCookie("totalPrice", 0);
    if (cookies.totalItem === undefined || cookies.totalItem === null)
      setCookie("totalItem", 0);
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8081/api/items`);
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showAlert]);

  function addToCart(item: CartItem) {
    // if (cookies.cart === undefined) setCookie("cart", []);
    // if (cookies.totalPrice === undefined || cookies.totalPrice === null) setCookie("totalPrice", 0);
    // if (cookies.totalItem === undefined || cookies.totalItem === null) setCookie("totalItem", 0);
    setShowAlert(true);

    const newCart = JSON.stringify([
      item,
      ...(cookies.cart !== undefined ? cookies.cart : []),
    ]);
    setCookie("cart", newCart);

    const newTotalPrice = cookies.totalPrice + item.price;
    setCookie("totalPrice", newTotalPrice);
    setTotalPrice(cookies.totalPrice);

    const newTotalItem = cookies.totalItem + 1;
    setCookie("totalItem", newTotalItem);
    setTotalItem(cookies.totalItem);
  }

  return (
    <div>
      {showAlert && <Alert />}
      <div className="flex justify-center mt-32 text-center">
        <div>
          <div className="flex justify-center mb-10">
            <p>Hello, {cookies.fullName}</p>
          </div>
          <div className="flex justify-center">
            <img src="/iium.png" alt="" className="h-14" />
          </div>
          <p className="text-2xl">KICT</p>
          <p className="text-5xl font-semibold">Online Food Order</p>
        </div>
      </div>

      <div className="grid place-content-center">
        <div className="m-10">
          <p className="text-xl font-semibold">Available food</p>
          <div className="grid grid-cols-3 gap-10 pt-10">
            {items.map((item) => (
              <div
                key={item.id}
                className="card card-compact w-96 bg-base-100 shadow-xl"
              >
                <figure>
                  <img src={item.image} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{item.name}</h2>
                  <p className="font-semibold text-lg">RM {item.price}</p>
                  <div className="card-actions justify-end">
                    <button
                      onClick={() =>
                        addToCart({ id: item.id, price: item.price })
                      }
                      className="btn btn-accent"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
