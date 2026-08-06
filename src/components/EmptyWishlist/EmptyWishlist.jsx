import { Link } from "react-router-dom";
import "./EmptyWishlist.css";

const EmptyWishlist = () => {
  return (
    <div className="empty-wishlist d-flex flex-column justify-content-center align-items-center h-100">
      <h2 className="mb-3">Your wishlist is empty</h2>
      <p>Save items you love by tapping the heart icon.</p>
      <Link to="/shop">
        <button className="btn btn-dark rounded-pill px-4 py-2 mt-4">
          Continue Shopping
        </button>
      </Link>
    </div>
  );
};
export default EmptyWishlist;
