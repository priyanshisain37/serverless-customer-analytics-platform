function Hero() {
  const goToProducts = () => {
    const productsSection = document.getElementById("products");

    if (productsSection) {
      productsSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      style={{
        padding: "80px",
        textAlign: "center",
      }}
    >
      <h1>Serverless Customer Analytics Platform</h1>

      <p>
        Analyze customer behaviour using AWS Data Engineering.
      </p>

      <button onClick={goToProducts}>
        Explore Products
      </button>
    </section>
  );
}

export default Hero;