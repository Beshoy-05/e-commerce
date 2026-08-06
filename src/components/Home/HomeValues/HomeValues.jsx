import "./HomeValues.css";

const values = [
  {
    icon: "bi-box-seam",
    title: "Quality Products",
    text: "Every product is carefully selected to ensure the best quality and value for our customers.",
  },
  {
    icon: "bi-truck",
    title: "Fast Delivery",
    text: "We work with trusted shipping partners to deliver your orders safely and on time.",
  },
  {
    icon: "bi-shield-check",
    title: "Secure Shopping",
    text: "Your information and payments are protected with secure checkout technology.",
  },
  {
    icon: "bi-headset",
    title: "Customer Support",
    text: "Our support team is always ready to help you with any questions or concerns.",
  },
];

const HomeValues = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <small className="text-uppercase text-secondary fw-semibold">
            Why Choose Us
          </small>

          <h2 className="display-5 fw-bold mt-2">What Makes Us Different</h2>
        </div>

        <div className="row g-4">
          {values.map((value, index) => (
            <div className="col-md-6 col-lg-3" key={index}>
              <div className="card h-100 border-0 shadow-sm rounded-4 p-4 value-card">
                <div className="icon-box mb-4">
                  <i className={`bi ${value.icon}`}></i>
                </div>

                <h5 className="fw-bold">{value.title}</h5>

                <p className="text-secondary mb-0">{value.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeValues;
