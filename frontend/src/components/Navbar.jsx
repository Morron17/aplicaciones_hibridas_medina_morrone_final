import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={{
      background: "#5b5a5aff",
      padding: "10px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "#76c893"
    }}>
      <h3>The Last of Us API</h3>
      <div style={{ display: "flex", gap: "15px" }}>
           <Link to="/home" style={{ color: "#76c893", textDecoration: "none" }}>Inicio</Link>
        <Link to="/humans" style={{ color: "#76c893", textDecoration: "none" }}>Humanos</Link>
        <Link to="/infecteds" style={{ color: "#76c893", textDecoration: "none" }}>Infectados</Link>
        <button onClick={handleLogout} style={{
          background: "#76c893",
          border: "none",
          color: "#111",
          borderRadius: "5px",
          padding: "5px 10px",
          cursor: "pointer"
        }}>
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}