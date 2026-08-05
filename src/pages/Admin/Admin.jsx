import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import "./Admin.css";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../services/api";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    category: "",
    thumbnail: "",
  });

  const [editingProduct, setEditingProduct] = useState(null);

  const handleChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProduct = async () => {
    if (
      !newProduct.title ||
      !newProduct.price ||
      !newProduct.category ||
      !newProduct.thumbnail
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const newItem = {
        id: Date.now(),
        ...newProduct,
      };

      const updatedProducts = [newItem, ...products];

      setProducts(updatedProducts);

      localStorage.setItem("products", JSON.stringify(updatedProducts));

      setNewProduct({
        title: "",
        price: "",
        category: "",
        thumbnail: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct({ ...product });
  };

  const handleUpdateProduct = () => {
    const updatedProducts = products.map((item) =>
      item.id === editingProduct.id
        ? {
            ...editingProduct,
            price: Number(editingProduct.price),
          }
        : item,
    );

    setProducts(updatedProducts);

    localStorage.setItem("products", JSON.stringify(updatedProducts));

    setEditingProduct(null);
  };

  useEffect(() => {
    const savedProducts = localStorage.getItem("products");

    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      getProducts(100, 0)
        .then((res) => {
          setProducts(res.data.products);

          localStorage.setItem("products", JSON.stringify(res.data.products));
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      const handleDelete = (id) => {
        if (!window.confirm("Are you sure?")) return;

        const updatedProducts = products.filter((item) => item.id !== id);

        setProducts(updatedProducts);

        localStorage.setItem("products", JSON.stringify(updatedProducts));
      };

      const updatedProducts = products.filter((item) => item.id !== id);

      setProducts(updatedProducts);

      localStorage.setItem("products", JSON.stringify(updatedProducts));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="admin-page">
        <div className="container">
          <div className="admin-header">
            <div>
              <h2>Admin Panel</h2>
              <p>Manage your store products</p>
            </div>

            <button
              className="btn btn-dark"
              data-bs-toggle="modal"
              data-bs-target="#addProductModal"
            >
              <i className="bi bi-plus-lg me-2"></i>
              Add Product
            </button>
          </div>

          <div className="row g-4">
            {products.map((product) => (
              <div className="col-md-6 col-lg-4 col-xl-3" key={product.id}>
                <div className="admin-card">
                  <div className="admin-image">
                    <img src={product.thumbnail} alt={product.title} />
                  </div>

                  <div className="admin-body">
                    <h5>{product.title}</h5>

                    <p>{product.category}</p>

                    <span>${product.price}</span>

                    <div className="admin-actions">
                      <button
                        className="btn btn-outline-dark"
                        data-bs-toggle="modal"
                        data-bs-target="#editProductModal"
                        onClick={() => handleEditClick(product)}
                      >
                        <i className="bi bi-pencil-square me-2"></i>
                        Edit
                      </button>

                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(product.id)}
                      >
                        <i className="bi bi-trash me-2"></i>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="modal fade" id="addProductModal" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Product</h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label>Product Name</label>

                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={newProduct.title}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>Price</label>

                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={newProduct.price}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>Category</label>

                <input
                  type="text"
                  className="form-control"
                  name="category"
                  value={newProduct.category}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>Image URL</label>

                <input
                  type="text"
                  className="form-control"
                  name="thumbnail"
                  value={newProduct.thumbnail}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>

              <button
                className="btn btn-dark"
                data-bs-dismiss="modal"
                onClick={handleAddProduct}
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="editProductModal" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Product</h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            {editingProduct && (
              <>
                <div className="modal-body">
                  <div className="mb-3">
                    <label>Product Name</label>

                    <input
                      type="text"
                      className="form-control"
                      value={editingProduct.title}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label>Price</label>

                    <input
                      type="number"
                      className="form-control"
                      value={editingProduct.price}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          price: Number(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label>Category</label>

                    <input
                      type="number"
                      className="form-control"
                      value={editingProduct.price}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          price:
                            e.target.value === "" ? "" : Number(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label>Image URL</label>

                    <input
                      type="text"
                      className="form-control"
                      value={editingProduct.thumbnail}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          thumbnail: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button className="btn btn-secondary" data-bs-dismiss="modal">
                    Cancel
                  </button>

                  <button
                    className="btn btn-dark"
                    data-bs-dismiss="modal"
                    onClick={handleUpdateProduct}
                  >
                    Save Changes
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Admin;
