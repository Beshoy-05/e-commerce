import { useEffect, useState } from "react";
import { getProducts } from "../../services/api";

import "./Admin.css";
import ProductTable from "../../components/ProductTable/ProductTable";
import ProductModal from "../../components/ProductModal/ProductModal";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const itemsPerPage = 10;

  useEffect(() => {
    loadProducts();
  }, [currentPage]);

  async function loadProducts() {
    const skip = (currentPage - 1) * itemsPerPage;

    const res = await getProducts(itemsPerPage, skip);

    setProducts(res.data.products);
    setTotalProducts(res.data.total);
  }

  function handleSaveProduct(product) {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((item) =>
          item.id === editingProduct.id
            ? { ...product, id: editingProduct.id }
            : item,
        ),
      );
    } else {
      setProducts((prev) => [product, ...prev]);
      setTotalProducts((prev) => prev + 1);
    }

    setEditingProduct(null);
  }

  return (
    <div className="admin-layout">
      <main className="admin-content">
        <div className="admin-header">
          <div>
            <h1>Products Management</h1>
            <p>Manage your catalog, track inventory, and update pricing.</p>
          </div>

          <button
            className="btn btn-dark"
            onClick={() => {
              setEditingProduct(null);
              setShowModal(true);
            }}
          >
            <i className="bi bi-plus-lg me-2"></i>
            Add Product
          </button>
        </div>

        <ProductTable
          products={products}
          setProducts={setProducts}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalProducts={totalProducts}
          itemsPerPage={itemsPerPage}
          setEditingProduct={setEditingProduct}
          setShowModal={setShowModal}
        />

        <ProductModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSaveProduct}
          editingProduct={editingProduct}
        />
      </main>
    </div>
  );
};

export default Admin;
