import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error loading dashboard data:", error);
      });
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Analytics Dashboard</h1>

      <p>Monitor customer activity and product views.</p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            padding: "25px",
            width: "220px",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Total Views</h3>
          <h2>0</h2>
        </div>

        <div
          style={{
            padding: "25px",
            width: "220px",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Total Products</h3>
          <h2>{products.length}</h2>
        </div>

        <div
          style={{
            padding: "25px",
            width: "220px",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Active Events</h3>
          <h2>0</h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;