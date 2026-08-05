import { useContext } from "react";
import "./Wishlist.css";
import { WishlistContext } from "../../context/WishlistContext";
import EmptyWishlist from "../../components/EmptyWishlist/EmptyWishlist";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, setWishlist } = useContext(WishlistContext);

  function removeWishlist(id) {
    setWishlist(wishlist.filter((item) => item.id !== id));
  }

  return (
    <>
      <div className="wishlist-page py-5">
        <div className="container">
          <div className="wishlist-header mb-5">
            <h1 className="wishlist-title">Your Wishlist</h1>
            <p className="wishlist-subtitle">
              Items you've saved for later. Keep track of your favorites and add
              them to your cart anytime.
            </p>
          </div>
          {wishlist.length === 0 ?
            <EmptyWishlist />
          : <div className="d-flex flex-column gap-4">
              {wishlist.map((item) => (
                <div
                  className="wishlist-card card border-0 shadow"
                  key={item.id}
                >
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <Link to={`/product/${item.id}`}>
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="img-fluid rounded-start p-2"
                        />
                      </Link>
                    </div>

                    <div className="col-md-7">
                      <div className="card-body py-2">
                        <Link
                          to={`/product/${item.id}`}
                          className="text-decoration-none text-dark"
                        >
                          <h5 className="wishlist-card-title card-title mb-1">
                            {item.title}
                          </h5>
                        </Link>
                        <p className="wishlist-desc card-text small text-truncate mb-1">
                          {item.description}
                        </p>
                        <p className="wishlist-price card-text fw-bold mb-0">
                          ${item.price}
                        </p>
                      </div>
                    </div>

                    <div className="col-md-3 text-center">
                      <button
                        className="wishlist-remove btn text-white rounded-pill px-5 py-3"
                        onClick={() => removeWishlist(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;
