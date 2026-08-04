import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Cart from "./pages/Cart/Cart";
import ProductDetails from "./pages/ProductDetails/ProductDetails";

import { SearchContext } from "./context/search";
import { CartContext } from "./context/CartContext";
import "./index.css";

function App() {
  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState(1000);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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
      <CartContext.Provider value={{ cart, setCart }}>
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
      </CartContext.Provider>
    </SearchContext.Provider>
  );
}

export default App;
