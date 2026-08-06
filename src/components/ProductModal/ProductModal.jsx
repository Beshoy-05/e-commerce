import { useEffect, useState } from "react";

const ProductModal = ({ show, onClose, onSave, editingProduct }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    thumbnail: "",
    status: "",
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        title: editingProduct.title,
        category: editingProduct.category,
        price: editingProduct.price,
        thumbnail: editingProduct.thumbnail,
        status: editingProduct.status || "",
      });
    } else {
      setFormData({
        title: "",
        category: "",
        price: "",
        thumbnail: "",
        status: "",
      });
    }
  }, [editingProduct]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSave({
      ...formData,
      price: Number(formData.price),
      status: formData.status,
    });

    setFormData({
      title: "",
      category: "",
      price: "",
      thumbnail: "",
      status: "",
    });

    onClose();
  }

  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      tabIndex="-1"
      style={{
        background: "rgba(0,0,0,.5)",
      }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {editingProduct ? "Edit Product" : "Add Product"}
            </h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label>Title</label>

                <input
                  className="form-control"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Category</label>

                <input
                  className="form-control"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Price</label>

                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Status</label>

                <select
                  className="form-select"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="in-stock">In Stock</option>
                  <option value="low-stock">Low Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>

              <div className="mb-3">
                <label>Image URL</label>

                <input
                  className="form-control"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>

              <button type="submit" className="btn btn-dark">
                {editingProduct ? "Update Product" : "Save Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
