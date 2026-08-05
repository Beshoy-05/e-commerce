import "./AboutProcess.css";

const steps = [
  {
    number: "01",
    title: "Browse Products",
    text: "Explore hundreds of carefully selected products across multiple categories.",
  },
  {
    number: "02",
    title: "Choose Your Items",
    text: "Add your favorite products to your cart and review your selections.",
  },
  {
    number: "03",
    title: "Secure Checkout",
    text: "Complete your purchase quickly with our safe and secure payment process.",
  },
  {
    number: "04",
    title: "Fast Delivery",
    text: "Sit back while we deliver your order right to your doorstep.",
  },
];

const AboutProcess = () => {
  return (
    <section className="py-5">

      <div className="container">

        <div className="text-center mb-5">

          <small className="text-uppercase text-secondary fw-semibold">
            How It Works
          </small>

          <h2 className="display-5 fw-bold mt-2">
            Shopping Made Easy
          </h2>

        </div>

        <div className="row g-4">

          {steps.map((step) => (
            <div className="col-md-6 col-lg-3 text-center" key={step.number}>

              <div className="process-circle mx-auto mb-4">
                {step.number}
              </div>

              <h5 className="fw-bold">
                {step.title}
              </h5>

              <p className="text-secondary">
                {step.text}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default AboutProcess;