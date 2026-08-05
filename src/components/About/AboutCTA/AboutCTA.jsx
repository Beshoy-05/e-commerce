import "./AboutCTA.css";
import { Link } from "react-router-dom";

const AboutCTA = () => {
  return (
    <section className="py-5">

      <div className="container">

        <div className="cta-box text-center rounded-5 p-5">

          <small className="text-uppercase text-secondary fw-semibold">
            Ready To Shop?
          </small>

          <h2 className="display-4 fw-bold my-4">
            Discover Amazing
            <br />
            Products Today
          </h2>

          <p className="text-secondary mx-auto w-75">
            Browse our carefully selected collection and find products
            that match your lifestyle. Quality, affordability, and
            convenience—all in one place.
          </p>

          <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">

            <Link
              to="/"
              className="btn btn-dark rounded-pill px-4 py-3"
            >
              Shop Now
            </Link>

            <Link
              to="/contact"
              className="btn btn-outline-dark rounded-pill px-4 py-3"
            >
              Contact Us
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutCTA;