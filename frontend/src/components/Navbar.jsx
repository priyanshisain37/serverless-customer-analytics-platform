import "./Navbar.css";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };
  return (
    <nav className="navbar">
      <div className="logo">SCAP</div>

      <ul>
        <li>
          <a href="/">Home</a>
        </li>

        <li>
          <a href="/#products">Products</a>
        </li>

        <li>
          <a href="/dashboard">Dashboard</a>
        </li>

        <li>
          {isLoggedIn ? (
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <a href="/login">Login</a>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;