import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function RegisterPage() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.errors && data.errors.length > 0) {
          return setError(data.errors[0].msg);
        }
        if (data.msg) return setError(data.msg);
        throw new Error("Error desconocido al registrarse");
      }
      login(data.token, data.user);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Error al registrarse");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Crear Cuenta</h2>

        <input
          name="username" // Cambiado de "username" a "name"
          type="text"
          placeholder="Nombre de usuario"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Contraseña (mínimo 6 caracteres)"
          value={form.password}
          onChange={handleChange}
          required
        />

        {error && <p className="error-msg">{error}</p>}

        <button type="submit">Registrarse</button>
        <p>
          ¿Ya tenés cuenta? <Link to="/">Iniciar sesión</Link>
        </p>
      </form>
    </div>
  );
}