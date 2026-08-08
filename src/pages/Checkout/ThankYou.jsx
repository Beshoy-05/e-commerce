import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ThankYou.css";

function ThankYou() {
  const location = useLocation();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const incomingOrder = location.state?.orderData;

    if (incomingOrder) {
      setOrderData(incomingOrder);
      localStorage.setItem("lastOrder", JSON.stringify(incomingOrder));
      return;
    }

    const savedOrder = localStorage.getItem("lastOrder");
    if (savedOrder) {
      try {
        setOrderData(JSON.parse(savedOrder));
      } catch (error) {
        console.warn("Failed to load saved order", error);
      }
    }
  }, [location.state]);

  return (
    <div className="thank-container">
      <h1>Thank You!</h1>

      <p>Your order has been placed successfully.</p>
    </div>
  );
}

export default ThankYou;
