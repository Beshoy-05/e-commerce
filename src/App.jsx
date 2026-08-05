import { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import PagesLoading from "./components/PageLoading/PagesLoading";
import SupportChat from "./components/SupportChat/SupportChat";

import { SearchContext } from "./context/search";
import { CartContext } from "./context/CartContext";
import { WishlistContext } from "./context/WishlistContext";
import { lazy } from "react";

import "./index.css";

const Home = lazy(() => import("./pages/Home/Home"));
const About = lazy(() => import("./pages/About/About"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const Wishlist = lazy(() => import("./pages/Wishlist/Wishlist"));
const ProductDetails = lazy(
  () => import("./pages/ProductDetails/ProductDetails"),
);
const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));

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

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

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
        <WishlistContext.Provider value={{ wishlist, setWishlist }}>
          <Router>
            <Suspense fallback={<PagesLoading />}>
            <Navbar />

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
                <SupportChat />
            </Suspense>
          </Router>
        </WishlistContext.Provider>
      </CartContext.Provider>
    </SearchContext.Provider>
  );
}

export default App;
