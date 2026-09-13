function Products() {
  const products = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Headphones", price: 2000 },
    { id: 3, name: "Smartphone", price: 30000 }
  ];

  return (
    <div style={{ padding: "30px" }}>
      <h1>Products</h1>

      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid gray",
            padding: "20px",
            margin: "20px 0"
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