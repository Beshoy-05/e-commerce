import { useContext, useEffect, useState } from "react";
import { getCategories } from "../../services/api";
import { SearchContext } from "../../context/search";
import "./Filter.css";

const Filter = () => {
  const { setCategory, setPrice } = useContext(SearchContext);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState(1000);

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res.data);
    });
  }, []);

  function handleApply() {
    setCategory(selectedCategory);
    setPrice(selectedPrice);
  }

  return (
    <div className="filter-card">
      <h4>Categories</h4>

      <div className="categories-list">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="category"
            id="all"
            checked={selectedCategory === "all"}
            onChange={() => setSelectedCategory("all")}
          />

          <label className="form-check-label" htmlFor="all">
            All Products
          </label>
        </div>

        {categories.map((item) => (
          <div className="form-check" key={item.slug}>
            <input
              className="form-check-input"
              type="radio"
              name="category"
              id={item.slug}
              checked={selectedCategory === item.slug}
              onChange={() => setSelectedCategory(item.slug)}
            />

            <label
              className="form-check-label text-capitalize"
              htmlFor={item.slug}
            >
              {item.name}
            </label>
          </div>
        ))}
      </div>

      <hr />

      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">Max Price</h5>

        <span className="price-value">${selectedPrice}</span>
      </div>

      <input
        type="range"
        className="form-range"
        min="0"
        max="10000"
        step="10"
        value={selectedPrice}
        onChange={(e) => setSelectedPrice(Number(e.target.value))}
      />

      <button className="btn btn-dark w-100 mt-3" onClick={handleApply}>
        Apply Filter
      </button>
    </div>
  );
};

export default Filter;
