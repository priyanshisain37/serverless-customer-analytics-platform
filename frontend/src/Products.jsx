import { useEffect, useState } from "react";
import API from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Products</h1>

      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid gray",
            padding: "20px",
            margin: "20px 0",
          }}
        >
          <h3>{product.name}</h3>
          <p>₹{product.price}</p>
          <button>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default Products;