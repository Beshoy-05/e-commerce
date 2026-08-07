import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../services/api";
import Loader from "../../components/Loader/Loader";
import Footer from "../../components/Footer/Footer";
import "./ProductDetails.css";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const { cart, setCart } = useContext(CartContext);
  const { wishlist, setWishlist } = useContext(WishlistContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct(id).then((res) => {
      setProduct(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  const itemInCart = cart.find((item) => item.id === product?.id);
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  function addToCart(product) {
    if (!itemInCart) {
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
    toast.success('Successfully added to cart!')
  }

  function increase() {
    setCart(
      cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  function decrease() {
    if (itemInCart.quantity === 1) {
      setCart(cart.filter((item) => item.id !== product.id));
      toast.error("Item removed from cart!")
    } else {
      setCart(
        cart.map((item) =>
          item.id === product.id ?
            {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1,
            }
          : item,
        ),
      );
    }
  }

  function toggleWishlist(product) {
    if (isWishlisted) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
      toast.success("Successfully added to cart!")
    } else {
      setWishlist([...wishlist, product]);
      toast.error("Item removed from wishlist!")
    }
  }

  return (
    <>
      <div className="product-details-page py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <div className="product-image-box">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="img-fluid w-100"
                />
              </div>
            </div>

            <div className="col-lg-6">
              <span className="badge bg-success-subtle text-success border px-3 py-2 mb-3">
                In Stock
              </span>

              <h1 className="product-title">{product.title}</h1>

              <h2 className="product-price mb-4">${product.price}</h2>

              <hr />

              <h6 className="text-uppercase text-muted mb-3">
                About This Product
              </h6>

              <p className="product-description">{product.description}</p>

              <div className="product-info mt-4">
                <p>
                  <strong>Category:</strong>{" "}
                  <span className="text-capitalize">{product.category}</span>
                </p>

                <p>
                  <strong>Brand:</strong> {product.brand}
                </p>

                <p>
                  <strong>Rating:</strong> {product.rating}
                </p>

                <p>
                  <strong>Stock:</strong> {product.stock}
                </p>

                <p>
                  <strong>Discount:</strong> {product.discountPercentage}%
                </p>
              </div>

              <div className="d-flex align-items-center gap-3 mt-4">
                {itemInCart ?
                  <div className="product-quantity d-flex align-items-center rounded-pill overflow-hidden">
                    <button className="border-0 bg-transparent" onClick={decrease}>-</button>
                    <span className="text-dark fw-bold text-center">{itemInCart.quantity}</span>
                    <button className="border-0 bg-transparent" onClick={increase}>+</button>
                  </div>
                : <button
                    onClick={() => addToCart(product)}
                    className="btn btn-dark rounded-pill px-5 py-3"
                  >
                    Add To Cart
                  </button>
                }

                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className={`wishlist-btn-2 btn rounded-circle d-flex justify-content-center align-items-center ${isWishlisted ? "wish-active" : ""}`}
                >
                  <i
                    className={`bi ${isWishlisted ? "bi-heart-fill" : "bi-heart"}`}
                  ></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;
