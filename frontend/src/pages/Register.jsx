function Register() {
  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>Create Account</h1>

      <form style={{
        display: "flex",
        flexDirection: "column",
        width: "300px",
        margin: "auto",
        gap: "15px"
      }}>
        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email Address" />
        <input type="password" placeholder="Password" />

        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;