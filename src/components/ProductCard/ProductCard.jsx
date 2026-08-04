import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card card h-100 border-0 bg-transparent">
      <Link to={`/product/${product.id}`} className="text-decoration-none">
        <div className="product-image">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="img-fluid w-100 h-100 object-fit-contain"
          />
        </div>
      </Link>

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
