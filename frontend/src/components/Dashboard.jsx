import { useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [totalViews, setTotalViews] = useState(0);
  const [productViews, setProductViews] = useState({});
  const [recentEvents, setRecentEvents] = useState([]);
  const [mostViewedProduct, setMostViewedProduct] = useState("No data");
  const [activeEvents, setActiveEvents] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

useEffect(() => {
  refreshDashboard();

  const interval = setInterval(() => {
    refreshDashboard();
  }, 30000);

  return () => clearInterval(interval);
}, []);

  const chartData = products.map((product) => ({
    name: product.name,
    views: productViews[product.product_id] || 0,
  }));

  const mostViewed = products.reduce(
  (max, product) => {
    const views = productViews[product.product_id] || 0;

    if (views > max.views) {
      return {
        name: product.name,
        views: views,
      };
    }

    return max;
  },
  { name: "No data", views: 0 }
);


const refreshDashboard = async () => {
  setLoading(true);
  setError("");

  try {
    const [
      productsResponse,
      productViewsResponse,
      totalViewsResponse,
      recentEventsResponse,
      activeEventsResponse,
    ] = await Promise.all([
      axios.get("http://127.0.0.1:5000/products"),
      axios.get("http://127.0.0.1:5000/product-views"),
      axios.get("http://127.0.0.1:5000/total-views"),
      axios.get("http://127.0.0.1:5000/recent-events"),
      axios.get("http://127.0.0.1:5000/active-events"),
    ]);

    setProducts(productsResponse.data);
    setProductViews(productViewsResponse.data);
    setTotalViews(totalViewsResponse.data.total_views);
    setRecentEvents(recentEventsResponse.data);
    setActiveEvents(activeEventsResponse.data.active_events);
    setRecentEvents(recentEventsResponse.data);
    setActiveEvents(activeEventsResponse.data.active_events);
  } catch (error) {
    console.error("Error refreshing dashboard:", error);
    setError("Unable to load analytics. Please try again.");
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  setMostViewedProduct(mostViewed.name);
}, [products, productViews]);

  return (
    <div className="dashboard">
      <h1>Analytics Dashboard</h1>

      <p className="dashboard-subtitle">
        Monitor customer activity and product views.
      </p>

      <div className="dashboard-status">
        <span className="status-dot"></span>
        Live Analytics Connected
      </div>

      {lastUpdated && (
      <p className="last-updated">
        Last updated: {lastUpdated.toLocaleString("en-IN")}
      </p>
      )} 
      <button
       className="refresh-button"
       onClick={refreshDashboard}
       disabled={loading}
      >
      {loading ? "Refreshing..." : "Refresh Analytics"}
      </button>

      {loading && (
      <p className="loading-message">
        Loading latest analytics...
      </p>
    )}

      {/* Dashboard Cards */}
      <div className="dashboard-cards">

        {/* Total Views */}
        <div className="dashboard-card">
          <h3>Total Views</h3>
          <h2>{totalViews}</h2>
        </div>

        {/* Total Products */}
        <div className="dashboard-card">
          <h3>Total Products</h3>
          <h2>{products.length}</h2>
        </div>

        {/* Active Events */}
        <div className="dashboard-card">
          <h3>Active Events</h3>
          <h2>{activeEvents}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Most Viewed Product</h3>
          <h2>{mostViewedProduct}</h2>
        </div>

      </div>

      {/* Product-wise Views */}
      <div className="analytics-section">
        <h2>Product-wise Views</h2>

        <div className="product-view-cards">
          {products.map((product) => (
            <div
              className="product-view-card"
              key={product.product_id}
            >
              <h3>{product.name}</h3>

              <p>
                Views: {productViews[product.product_id] || 0}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="analytics-section">
       <h2>Recent Activity</h2>

         {recentEvents.length > 0 ? (
      <div className="recent-events">
       {recentEvents.map((event, index) => (
        <div className="event-card" key={index}>
          <h3>Product View</h3>

          <p>
            Product:{" "}
             {products.find(
              (product) =>
                String(product.product_id) === String(event.product_id)
            )?.name || `Product ${event.product_id}`}
          </p>

          <p>
            Time:{" "}
            {new Date(event.timestamp).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
</p>
        </div>
      ))}
    </div>
  ) : (
    <p>No recent activity found.</p>
  )}
</div>

      {/* Analytics Chart */}
      <div className="analytics-section">
        <h2>Product View Analytics</h2>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis allowDecimals={false} />

              <Tooltip />

              <Bar dataKey="views" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;