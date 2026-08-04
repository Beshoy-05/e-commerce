import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="pt-5 pb-4 mt-5">
      <div className="container pt-3">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6">
            <h4 className="font-serif fw-bold tracking-widest mb-3 logo-text fs-4 text-dark">
              A U R A
            </h4>
            <p className="text-muted small pe-lg-5 lh-lg">
              Elevating the everyday into the extraordinary through the art of
              sensory wellness and elegant fashion.
            </p>
          </div>
          <div className="col-lg-2 col-md-6 offset-lg-2">
            <h6 className="text-uppercase fw-bold mb-4 small text-dark tracking-widest">
              Company
            </h6>
            <ul className="list-unstyled text-muted small lh-lg">
              <li className="mb-2">
                <a
                  href="#"
                  className="text-decoration-none text-muted custom-hover"
                >
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-decoration-none text-muted custom-hover"
                >
                  Journal
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-decoration-none text-muted custom-hover"
                >
                  Sustainability
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6">
            <h6 className="text-uppercase fw-bold mb-4 small text-dark tracking-widest">
              Support
            </h6>
            <ul className="list-unstyled text-muted small lh-lg">
              <li className="mb-2">
                <a
                  href="#"
                  className="text-decoration-none text-muted custom-hover"
                >
                  Shipping
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-decoration-none text-muted custom-hover"
                >
                  Returns
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-decoration-none text-muted custom-hover"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6">
            <h6 className="text-uppercase fw-bold mb-4 small text-dark tracking-widest">
              Legal
            </h6>
            <ul className="list-unstyled text-muted small lh-lg">
              <li className="mb-2">
                <a
                  href="#"
                  className="text-decoration-none text-muted custom-hover"
                >
                  Privacy
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-decoration-none text-muted custom-hover"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
