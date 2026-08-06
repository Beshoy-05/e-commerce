import { useState } from "react";
import "./SearchBar.css";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ setSearch }) => {
  const [text, setText] = useState("");
  const navigate = useNavigate();
  function handleSearch() {
    setSearch(text.trim());
    navigate("/shop");
  }

  return (
    <div className="search-container d-flex">
      <input
        type="text"
        className="form-control"
        placeholder="Search products..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />

      <button className="btn btn-dark ms-2" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
