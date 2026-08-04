import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Cart from "./pages/Cart/Cart";
import ProductDetails from "./pages/ProductDetails/ProductDetails";

import { SearchContext } from "./context/search";

import "./index.css";

function App() {
  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState(1000);

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,

        category,
        setCategory,

        price,
        setPrice,
      }}
    >
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </Router>
    </SearchContext.Provider>
  );
}

export default App;
