import { useState } from "react";
import "./ContactContent.css";

const ContactContent = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you.</p>
      </div>

      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="contact-card">
              <h4>Get In Touch</h4>

              <div className="contact-item">
                <i className="bi bi-geo-alt-fill me-2"></i>
                Mansoura, Egypt
              </div>

              <div className="contact-item">
                <i className="bi bi-envelope-fill me-2"></i>
                aura@example.com
              </div>

              <div className="contact-item">
                <i className="bi bi-telephone-fill me-2"></i>
                +20 100 000 0000
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="contact-card">
              <form onSubmit={handleSubmit}>
                <input
                  className="form-control"
                  placeholder="Full Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />

                <input
                  className="form-control mt-3"
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />

                <input
                  className="form-control mt-3"
                  placeholder="Subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                />

                <textarea
                  className="form-control mt-3"
                  rows="6"
                  placeholder="Message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                ></textarea>

                <button className="send-btn w-100 mt-4">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactContent;
