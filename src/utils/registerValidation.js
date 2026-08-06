export const validateRegister = (form) => {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Name is required";
  }

  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!form.email.includes("@")) {
    errors.email = "Please enter a valid email";
  }

  if (!form.password) {
    errors.password = "Password is required";
  } else if (form.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  const existingUser = JSON.parse(localStorage.getItem("user"));

  if (existingUser?.email === form.email) {
    errors.email = "Email already exists";
  }

  return errors;
};