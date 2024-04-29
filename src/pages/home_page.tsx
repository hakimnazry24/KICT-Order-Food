import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import path from "path";

type Item = {
  id: number;
  name: string;
  price: number;
  stallId: number;
  image: string;
};

export default function HomePage() {
  const [items, setItems] = useState<Item[]>([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState<number>();
  const [totalItem, setTotalItem] = useState<number>();
  const [showAlert, setShowAlert] = useState<boolean>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8081/api/items`);
        const data = await res.json();
        console.log(data)
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
  return (
    <div>
      
      <div className="flex justify-center mt-32 text-center">
        <div>
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
                      // onClick={(e) => addToCart(item.id, item.price)}
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
