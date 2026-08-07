import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import "./EmptyCart.css";

const EmptyCart = () => {
  return (
    <div className="empty-cart">
      <div className="empty-box">
        <div className="empty-cart-icon">
          <ShoppingBag size={55} />
        </div>

        <h2>Your cart feels lonely</h2>

        <p>
          Looks like you haven't added anything to your cart yet.
          Start exploring our latest collections.
        </p>

        <Link to="/shop">
          <button>
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;