import { useContext } from "react";
import "./Wishlist.css";
import { WishlistContext } from "../../context/WishlistContext";
import EmptyWishlist from "../../components/EmptyWishlist/EmptyWishlist";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";

const Wishlist = () => {
  const { wishlist, setWishlist } = useContext(WishlistContext);
  const { cart, setCart } = useContext(CartContext);

  function addToCart(product) {
    const existingItem = cart.find((item) => item.id === product.id);
    if (!existingItem) {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    } else {
      const newCart = cart.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }

        return item;
      });

      setCart(newCart);
    }
    setWishlist(wishlist.filter((item) => item.id !== product.id));
    toast.success("Successfully added to cart!")
  }

  function removeWishlist(id) {
    setWishlist(wishlist.filter((item) => item.id !== id));
    toast.error("Item removed from wishlist!")
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

                    <div className="col-md-3 d-flex justify-content-center gap-5 text-center">
                      <button
                        className="cart-add item-actions btn text-dark p-0 m-0"
                        onClick={() => addToCart(item)}
                      >
                        <i className="bi bi-cart-plus fs-3"></i>
                      </button>
                      <button
                        className="wishlist-remove item-actions btn text-dark p-0 m-0"
                        onClick={() => removeWishlist(item.id)}
                      >
                        <i className="bi bi-trash fs-3"></i>
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
