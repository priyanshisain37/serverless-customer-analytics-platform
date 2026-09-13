import axios from "axios";
import "./ProductCard.css";

function ProductCard({ product }) {
  const trackProduct = async () => {
    console.log("View Product clicked:", product.product_id);

    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/track-view/${product.product_id}`
      );

      console.log("Backend response:", response.data);

      alert("Product View Logged Successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to log product view.");
    }
  };

  let imagePath;

  const productName = product.name.trim().toLowerCase();

  if (productName === "laptop") {
    imagePath = "/images/laptop.jpeg";
  } else if (productName === "smartphone") {
    imagePath = "/images/smartphone.jpeg";
  } else {
    imagePath = "/images/headphone.jpeg";
  }

  return (
    <div className="product-card">
      <img
        src={imagePath}
        alt={product.name}
        className="product-image"
      />

      <h2>{product.name}</h2>

      <div className="product-price">
        ₹ {product.price}
      </div>

      <button
        className="product-button"
        onClick={trackProduct}
      >
        View Product
      </button>
    </div>
  );
}

export default ProductCard;