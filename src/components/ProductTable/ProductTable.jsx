import { useState } from "react";
import "./ProductTable.css";

const ProductTable = ({
  products,
  setProducts,
  currentPage,
  setCurrentPage,
  totalProducts,
  itemsPerPage,
  setEditingProduct,
  setShowModal,
}) => {
  const [search, setSearch] = useState("");
  

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const getStatus = (product) => {
    if (product.status) return product.status;

    if (!product.stock || product.stock === 0) return "out-of-stock";
    if (product.stock < 10) return "low-stock";
    return "in-stock";
  };

  const statusText = (product) => {
    if (product.status) {
      switch (product.status) {
        case "in-stock":
          return "In Stock";
        case "low-stock":
          return "Low Stock";
        case "out-of-stock":
          return "Out of Stock";
        default:
          return "Unknown";
      }
    }

    if (!product.stock || product.stock === 0) return "Out of Stock";
    if (product.stock < 10) return `Low Stock (${product.stock})`;
    return `In Stock (${product.stock})`;
  };

  function handleDelete(id) {
    if (window.confirm("Delete this product?")) {
      setProducts(products.filter((product) => product.id !== id));
    }
  }

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()),
  );

  const startEntry =
    totalProducts === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endEntry = Math.min(currentPage * itemsPerPage, totalProducts);

  function handleEdit(product) {
    setEditingProduct(product);
    setShowModal(true);
  }

  return (
    <div className="product-table-wrapper">
      <div className="table-toolbar">
        <div className="search-box">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="toolbar-actions">
          <button className="btn btn-outline">
            <i className="bi bi-funnel"></i>
            Category
          </button>
          <button className="btn btn-outline">
            <i className="bi bi-arrow-down-up"></i>
            Sort By: Newest
          </button>
          <span className="divider"></span>
          <button
            className="btn-clear"
            onClick={() => {
              setSearch("");
              setCurrentPage(1);
            }}
          >
            <i className="bi bi-arrow-clockwise"></i>
            Clear
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="product-cell">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="product-thumb"
                    />
                    <div>
                      <div className="product-name">{product.title}</div>
                      <div className="product-sku">
                        SKU: {product.sku || `#${product.id}`}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="category-cell">{product.category}</td>
                <td className="price-cell">${product.price}</td>
                <td>
                  <span className={`status-badge status-${getStatus(product)}`}>
                    <span className="status-dot"></span>
                    {statusText(product)}
                  </span>
                </td>
                <td className="actions-cell">
                  <button
                    className="icon-btn"
                    onClick={() => handleEdit(product)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="icon-btn icon-btn-danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <span className="entries-info">
          Showing {startEntry} to {endEntry} of {totalProducts} entries
        </span>

        <div className="pagination">
          <button
            className="page-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            <i className="bi bi-chevron-left"></i>
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`page-btn ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="page-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
