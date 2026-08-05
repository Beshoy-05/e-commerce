import { Link } from "react-router-dom";
import "./AboutStory.css";


const AboutStory = () => {
  return (
    
    <section className="py-5">
      <div className="container">

        <div className="row align-items-center g-5">

          <div className="col-lg-6">

            <small className="text-uppercase text-secondary fw-semibold">
              Who We Are
            </small>

            <h2 className="display-5 fw-bold my-3">
              More Than Just
              <br />
              An Online Store.
            </h2>

            <p className="text-secondary">
              Our platform was built to make online shopping easier,
              faster, and more enjoyable. We offer a wide range of
              carefully selected products that combine quality,
              affordability, and modern design.
            </p>

            <p className="text-secondary">
              From browsing to checkout, we focus on creating a smooth
              shopping experience with trusted products and excellent
              customer service.
            </p>

            <Link to="/" className="btn btn-dark rounded-pill px-4 py-2 mt-2">
              Explore Products
            </Link>

          </div>

          <div className="col-lg-6">

            <div className="row g-3">

              <div className="col-8">

                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                  className="img-fluid rounded-4 h-100 object-fit-cover"
                  alt=""
                />

              </div>

              <div className="col-4 d-flex flex-column gap-3">

                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
                  className="img-fluid rounded-4"
                  alt=""
                />

                <div className="bg-light rounded-4 p-4 text-center shadow-sm flex-grow-1 d-flex flex-column justify-content-center">

                  <h2 className="fw-bold mb-1">
                    10K+
                  </h2>

                  <small className="text-muted">
                    Products Sold
                  </small>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutStory;