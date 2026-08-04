import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import { SearchContext } from "../../context/search";

import SearchBar from "../SearchBar/SearchBar";

import "./Navbar.css";

const Navbar = () => {
  const { setSearch } = useContext(SearchContext);

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
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>

          <div className="navbar-actions d-flex align-items-center gap-3">
            <SearchBar setSearch={setSearch} />

            <Link to="/register" className="text-dark text-decoration-none">
              <i className="bi bi-person fs-5"></i>
            </Link>

            <Link to="/cart" className="cart-icon position-relative text-dark">
              <i className="bi bi-bag fs-5"></i>

              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
