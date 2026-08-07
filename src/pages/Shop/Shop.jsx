import { useContext, useEffect, useState } from "react";

import { SearchContext } from "../../context/search";

import Footer from "../../components/Footer/Footer";
import ProductCard from "../../components/ProductCard/ProductCard";
import Filter from "../../components/Filter/Filter";
import Loader from "../../components/Loader/Loader";
import EmptyProducts from "../../components/EmptyProduct/EmptyProduct";

import { filterLogic } from "../../utils/FilterLogic";

import "./Shop.css";

const Shop = () => {
  const { search, category, price } = useContext(SearchContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    setLoading(true);

    filterLogic(search, category, price).then((data) => {
      setProducts(data.products);
      setTotalProducts(data.totalProducts);
      setLoading(false);
    });
  }, [search, category, price]);

  return (
    <div className="shop-page">
      <section className="hero-section text-center">
        <div className="container">
          <h1 className="display-3 fw-bold mb-3">Shop Smarter, Live Better</h1>

          <p className="lead text-muted mx-auto">
            Find everything you need in one place with premium quality, great
            prices, and a seamless shopping experience.
          </p>
        </div>
      </section>

      <section className="shop-container pb-5">
        <div className="products-section">
          <div className="row g-5">
            <div className="col-lg-3">
              <div className="filter">
                <Filter />
              </div>
            </div>

            <div className="col-lg-9">
              <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                <h5 className="products-title mb-2 mb-lg-0">Products</h5>

                <span className="text-muted">
                  Showing {products.length} of {totalProducts} Products
                </span>
              </div>

              {loading ? (
                <Loader />
              ) : products.length === 0 ? (
                <EmptyProducts />
              ) : (
                <div className="row g-4">
                  {products.map((product) => (
                    <div
                      className="col-md-6 col-lg-6 col-xl-3"
                      key={product.id}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shop;
