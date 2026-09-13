function Login() {
  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>Login</h1>

      <form style={{
        display: "flex",
        flexDirection: "column",
        width: "300px",
        margin: "auto",
        gap: "15px"
      }}>
        <input type="email" placeholder="Enter Email" />
        <input type="password" placeholder="Enter Password" />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;