import "./HomeStats.css";

const stats = [
  {
    number: "10K+",
    title: "Happy Customers",
  },
  {
    number: "500+",
    title: "Products Available",
  },
  {
    number: "99%",
    title: "Positive Reviews",
  },
  {
    number: "24/7",
    title: "Customer Support",
  },
];

const HomeStats = () => {
  return (
    <section className="stats-section py-5">
      <div className="container">
        <div className="row text-center">
          {stats.map((item, index) => (
            <div className="col-6 col-lg-3 mb-4 mb-lg-0" key={index}>
              <h2 className="display-4 fw-bold text-white">{item.number}</h2>

              <p className="text-light mb-0">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeStats;
