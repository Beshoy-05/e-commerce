import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [payment, setPayment] = useState({
    fullName: "",
    email: "",
    address: "",
    cardHolder: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  useEffect(() => {
    if (cart.length === 0 && !isSubmitting) {
      navigate("/cart");
    }
  }, [cart, navigate, isSubmitting]);

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);

    if (digits.length >= 3) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }

    return digits;
  };

  const formatCVV = (value) => {
    return value.replace(/\D/g, "").slice(0, 4);
  };

  // Validation
  const validateField = (name, value) => {
    switch (name) {
      case "fullName":
        return value.trim().length < 3 ? "Enter your full name" : "";

      case "email":
        return !/\S+@\S+\.\S+/.test(value) ? "Enter a valid email" : "";

      case "address":
        return value.trim().length < 5 ? "Enter your address" : "";

      case "cardHolder":
        return value.trim().length < 3 ? "Enter a valid card holder name" : "";

      case "cardNumber":
        return value.replace(/\D/g, "").length !== 16
          ? "Card number must be 16 digits"
          : "";

      case "expiry":
        if (!/^\d{2}\/\d{2}$/.test(value)) return "Format must be MM/YY";

        const month = Number(value.slice(0, 2));

        if (month < 1 || month > 12) return "Invalid month";

        return "";

      case "cvv":
        return value.length < 3 ? "CVV must be 3 or 4 digits" : "";

      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (name === "cardNumber") formattedValue = formatCardNumber(value);

    if (name === "expiry") formattedValue = formatExpiry(value);

    if (name === "cvv") formattedValue = formatCVV(value);

    setPayment((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, formattedValue),
    }));
  };

  const validateAll = () => {
    const newErrors = {};

    Object.keys(payment).forEach((key) => {
      const error = validateField(key, payment[key]);

      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitError("");

    if (!validateAll()) return;

    if (cart.length === 0) {
      setSubmitError("Your cart is empty");
      return;
    }

    const orderData = {
      products: cart,
      paymentDetails: payment,
      subtotal,
      tax,
      total,
    };

    localStorage.setItem("lastOrder", JSON.stringify(orderData));
    setIsSubmitting(true);
    navigate("/thank-you", { state: { orderData } });
    setCart([]);
  };
  return (
    <>
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-container">
        <div className="payment-section">
          <h2>Billing Information</h2>

          {submitError && <div className="error-banner">{submitError}</div>}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={payment.fullName}
              onChange={handleChange}
            />

            {errors.fullName && (
              <span className="field-error">{errors.fullName}</span>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={payment.email}
              onChange={handleChange}
            />

            {errors.email && (
              <span className="field-error">{errors.email}</span>
            )}

            <input
              type="text"
              name="address"
              placeholder="Shipping Address"
              value={payment.address}
              onChange={handleChange}
            />

            {errors.address && (
              <span className="field-error">{errors.address}</span>
            )}

            <h2>Payment Information</h2>

            <input
              type="text"
              name="cardHolder"
              placeholder="Card Holder Name"
              value={payment.cardHolder}
              onChange={handleChange}
            />

            {errors.cardHolder && (
              <span className="field-error">{errors.cardHolder}</span>
            )}

            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={payment.cardNumber}
              onChange={handleChange}
            />

            {errors.cardNumber && (
              <span className="field-error">{errors.cardNumber}</span>
            )}

            <div className="small-inputs">
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={payment.expiry}
                onChange={handleChange}
              />

              <input
                type="password"
                name="cvv"
                placeholder="CVV"
                value={payment.cvv}
                onChange={handleChange}
              />
            </div>

            {errors.expiry && (
              <span className="field-error">{errors.expiry}</span>
            )}

            {errors.cvv && <span className="field-error">{errors.cvv}</span>}

            <button type="submit">
              {isSubmitting ? "Processing..." : "Place Order"}
            </button>
          </form>
        </div>

        <div className="summary-section">
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div key={item.id} className="summary-item">
              <p>
                {item.title} × {item.quantity}
              </p>

              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <hr />

          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
