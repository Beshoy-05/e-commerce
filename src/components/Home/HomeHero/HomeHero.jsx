import "./HomeHero.css";
import { Link } from "react-router-dom";
import hero from "../../../assets/hero.jpg";

const HomeHero = () => {
  return (
    <section className="home-hero" style={{ backgroundImage: `url(${hero})` }}>
      <div className="hero-overlay">
        <div className="container h-100 d-flex align-items-center">
          <div className="hero-content">
            <span className="hero-subtitle">PREMIUM SHOPPING EXPERIENCE</span>

            <h1 className="hero-title">
              Discover Products
              <br />
              You'll Love
              <br />
              Every Day.
            </h1>

            <p className="hero-text mt-4">
              Explore thousands of premium products carefully selected to bring
              quality, style, and value to your everyday life.
            </p>
            <Link
              to="/shop"
              className="btn btn-light rounded-pill px-4 py-3 mt-3 fw-semibold"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
