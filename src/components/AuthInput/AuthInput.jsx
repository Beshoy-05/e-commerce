const AuthInput = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  name,
  error,
  showPassword,
  togglePassword,
}) => {
  return (
    <div className="form-group">
      <label>{label}</label>

      {type === "password" ? (
        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            value={value}
            name={name}
            className={error ? "error" : ""}
            onChange={onChange}
          />

          <span className="eye-icon" onClick={togglePassword}>
            <i
              className={`bi ${
                showPassword ? "bi-eye-slash" : "bi-eye"
              }`}
            ></i>
          </span>
        </div>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          name={name}
          className={error ? "error" : ""}
          onChange={onChange}
        />
      )}

      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default AuthInput;