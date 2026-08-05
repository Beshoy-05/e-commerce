import { Link } from "react-router-dom";
import { useContext } from "react";
import "./ProductCard.css";
import { WishlistContext } from "../../context/WishlistContext";

const ProductCard = ({ product }) => {
  const { wishlist, setWishlist } = useContext(WishlistContext);

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  function toggleWishlist() {
    if (isWishlisted) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  }

  return (
    <div className="product-card card h-100 border-0 bg-transparent">
      <div className="product-image-container">
        <button
          type="button"
          className={`wishlist-btn btn d-flex justify-content-center align-items-center ${isWishlisted ? "wish-active" : ""}`}
          onClick={toggleWishlist}
        >
          <i
            className={`bi ${isWishlisted ? "bi-heart-fill" : "bi-heart"}`}
          ></i>
        </button>
        <Link to={`/product/${product.id}`} className="text-decoration-none">
          <div className="product-image">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="img-fluid w-100 h-100 object-fit-contain"
            />
          </div>
        </Link>
      </div>

      <div className="card-body p-0 pt-3 d-flex flex-column">
        <Link to={`/product/${product.id}`} className="text-decoration-none">
          <h5 className="product-title mb-2">{product.title}</h5>
        </Link>
        <p className="product-description mb-3">{product.description}</p>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <span className="product-price">${product.price}</span>

          <span className="badge text-bg-light border text-capitalize">
            {product.category}
          </span>
        </div>
        <Link to={`/product/${product.id}`} className="btn btn-dark w-100 mt-3">
          View Details
        </Link>{" "}
      </div>
    </div>
  );
};

export default ProductCard;
