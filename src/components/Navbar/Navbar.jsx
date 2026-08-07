import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { SearchContext } from "../../context/search";
import { CartContext } from "../../context/CartContext";

import SearchBar from "../SearchBar/SearchBar";

import "./Navbar.css";

const Navbar = () => {
  const { setSearch } = useContext(SearchContext);
  const { cart } = useContext(CartContext);
  const [isSearch, setIsSearch] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand logo-text" to="/">
          A U R A
        </Link>

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto text-uppercase">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/shop">
                Shop
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>

          <div className="navbar-actions d-flex align-items-center gap-3">
            <div className={`search-bar-wrapper ${isSearch ? "open" : ""}`}>
              <SearchBar setSearch={setSearch} />
            </div>

            <i
              className={`bi ${isSearch ? "bi-x-circle" : "bi-search"} fs-4 text-dark`}
              onClick={() => setIsSearch(!isSearch)}
            ></i>

            <Link to="/login" className="text-dark text-decoration-none">
              <i className="bi bi-person fs-4"></i>
            </Link>

            <Link to="/wishlist" className="text-dark text-decoration-none">
              <i className="bi bi-heart fs-5"></i>
            </Link>

            <Link to="/cart" className="cart-icon position-relative text-dark">
              <i className="bi bi-bag fs-5"></i>

              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark d-flex justify-content-center align-items-center">
                {cart.length}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
