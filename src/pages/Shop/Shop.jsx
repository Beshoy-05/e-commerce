import { useContext, useEffect, useState } from "react";

import { SearchContext } from "../../context/search";

import Footer from "../../components/Footer/Footer";
import ProductCard from "../../components/ProductCard/ProductCard";
import Filter from "../../components/Filter/Filter";
import Loader from "../../components/Loader/Loader";

import { filterLogic } from "../../utils/FilterLogic";

import "./Shop.css";

const Shop = () => {
  const { search, category, price } = useContext(SearchContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const itemsPerPage = 9;

  useEffect(() => {
    setLoading(true);

    filterLogic(search, category, price, currentPage, itemsPerPage).then(
      (data) => {
        setProducts(data.products);
        setTotalProducts(data.totalProducts);
        setLoading(false);
      },
    );
  }, [search, category, price, currentPage]);

  function handlePageChange(page) {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

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

              {loading ?
                <Loader />
              : <>
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

                  {totalPages > 1 && (
                    <div className="pagination d-flex justify-content-center mt-5 flex-wrap">
                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index}
                          onClick={() => handlePageChange(index + 1)}
                          className={`btn mx-1 my-1 ${
                            currentPage === index + 1 ?
                              "btn-dark"
                            : "btn-outline-dark"
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              }
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shop;
