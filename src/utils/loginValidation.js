export const validateLogin = (form) => {
  const errors = {};

  if (!form.email.trim()) {
    errors.email = "Email is required";
  }

  if (!form.password) {
    errors.password = "Password is required";
  }

  return errors;
};