import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import Footer from "../../components/Footer/Footer";
import EmptyCart from "../../components/EmptyCart/EmptyCart";

import "./Cart.css";


import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);

  function increase(id) {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  function decrease(id) {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1,
            }
          : item,
      ),
    );
  }

  function removeItem(id) {
    setCart(cart.filter((item) => item.id !== id));
  }

  function clearCart() {
    setCart([]);
  }
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <>
      <div className="cart-page py-5">
        <div className="container">
          <div className="mb-5 d-flex justify-content-between align-items-center">
            <div className="leftHeader">
              <h1 className="cart-title">Your Cart</h1>
              <p className="cart-subtitle">
                Experience serenity with every selection.
              </p>
            </div>
            <div className="rightHeader">
              <button  className="btn btn-danger rounded-5" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </div>

          <div className="row g-5">
            <div className="col-lg-7">
              {cart.length === 0 ? (
               <EmptyCart />
              ) : (
                cart.map((item) => (
                  <div className="cart-item mb-4" key={item.id}>
                    <div className="cart-image">
                      <img src={item.thumbnail} alt={item.title} />
                    </div>

                    <div className="cart-content">
                      <h3>{item.title}</h3>

                      <p>{item.description}</p>

                      <span className="price">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>

                      <div className="cart-actions">
                        <div className="quantity">
                          <button onClick={() => decrease(item.id)}>-</button>

                          <span>{item.quantity}</span>

                          <button onClick={() => increase(item.id)}>+</button>
                        </div>

                        <button
                          className="remove-btn"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="col-lg-5">
              <div className="summary-card">
                <h2>Order Summary</h2>

                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>

                <div className="summary-row">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <hr />

                <div className="summary-row total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <button className="checkout-btn">Proceed To Checkout</button>

                <Link to="/shop" className="continue-btn">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Cart;
