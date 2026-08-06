 import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthInput from "../../components/AuthInput/AuthInput";
import { validateRegister } from "../../utils/registerValidation";

import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function handleChange({ target }) {
    setForm((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  }

  function handleRegister(e) {
    e.preventDefault();

    const newErrors = validateRegister(form);

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    localStorage.setItem(
      "user",
      JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
      })
    );

    setSuccess("Registration Successful!");

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  }

  return (
    <div className="register-container">
      <div className="register-card">

        <h2>Create Account</h2>

        <form onSubmit={handleRegister}>

          {success && (
            <div className="alert alert-success">
              {success}
            </div>
          )}

          <AuthInput
            label="Full Name"
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
          />

          <AuthInput
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />

          <AuthInput
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            showPassword={showPassword}
            togglePassword={() => setShowPassword(!showPassword)}
          />

          <AuthInput
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={form.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            showPassword={showConfirmPassword}
            togglePassword={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
          />

          <button className="register-btn">
            Register
          </button>

          <p className="login-link mt-3">
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>

        </form>

      </div>
    </div>
  );
};

export default Register;