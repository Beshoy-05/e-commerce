 import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthInput from "../../components/AuthInput/AuthInput";
import { validateLogin } from "../../utils/loginValidation";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  function handleChange({ target }) {
    setForm((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  }

  function handleLogin(e) {
    e.preventDefault();

    const newErrors = validateLogin(form);

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      setSuccess("");
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      setErrors({
        email: "No account found. Please register first.",
      });
      return;
    }

    if (
      form.email === savedUser.email &&
      form.password === savedUser.password
    ) {
      localStorage.setItem("isLoggedIn", "true");

      setErrors({});
      setSuccess("Login Successful!");

      setTimeout(() => {
        navigate("/");
      }, 1500);

      return;
    }

    setErrors({
      password: "Invalid email or password.",
    });

    setSuccess("");
  }

  return (
    <div className="login-container">
      <div className="login-card">

        <h2>Login</h2>

        <form onSubmit={handleLogin}>

          {success && (
            <div className="alert alert-success">
              {success}
            </div>
          )}

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

          <button className="login-btn">
            Login
          </button>

          <p className="register-link mt-3">
            Don't have an account?
            <Link to="/register"> Register</Link>
          </p>

        </form>

      </div>
    </div>
  );
};

export default Login;