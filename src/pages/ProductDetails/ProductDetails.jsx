import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../services/api";
import Loader from "../../components/Loader/Loader";
import Footer from "../../components/Footer/Footer";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();

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

              <h1 className="product-title">
                {product.title}
              </h1>

              <h2 className="product-price mb-4">
                ${product.price}
              </h2>

              <hr />

              <h6 className="text-uppercase text-muted mb-3">
                About This Product
              </h6>

              <p className="product-description">
                {product.description}
              </p>

              <div className="product-info mt-4">

                <p>
                  <strong>Category:</strong>{" "}
                  <span className="text-capitalize">
                    {product.category}
                  </span>
                </p>

                <p>
                  <strong>Brand:</strong> {product.brand}
                </p>

                <p>
                  <strong>Rating:</strong>  {product.rating}
                </p>

                <p>
                  <strong>Stock:</strong> {product.stock}
                </p>

                <p>
                  <strong>Discount:</strong> {product.discountPercentage}%
                </p>

              </div>

              <button className="btn btn-dark rounded-pill px-5 py-3 mt-4">
                Add To Cart
              </button>

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;