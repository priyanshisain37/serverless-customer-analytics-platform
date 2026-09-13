import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";
import Login from "./components/Login";

function Home({ products }) {
  return (
    <>
      <Hero />

      <section id="products" style={{ padding: "40px" }}>
        <h2>Our Products</h2>

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.product_id}
                product={product}
              />
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/products")
      .then((response) => {
        console.log("Products received:", response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error loading products:", error);
      });
  }, []);

  return (
    <AuthProvider>
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Home products={products} />}
        />

        <Route
          path="/dashboard"
          element={
          <ProtectedRoute>
           <Dashboard />
          </ProtectedRoute>
        }
/>

        <Route
          path="/login"
          element={<Login />}
        />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;