import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Navbar from "../components/Navbar.jsx";
import HumanForm from "../components/HumanForm.jsx";
import Modal from "../components/Modal.jsx";

export default function HumansPage() {
  const { token } = useContext(AuthContext);
  const [humans, setHumans] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchHumans = async () => {
    const res = await fetch("http://localhost:5000/api/humans", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setHumans(data);
  };

  const deleteHuman = async (id) => {
    if (!confirm("¿Eliminar personaje?")) return;
    await fetch(`http://localhost:5000/api/humans/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchHumans();
  };

  useEffect(() => {
    fetchHumans();
  }, []);

  const handleEdit = (human) => {
    setSelected(human);
    setShowModal(true);
  };

  const handleSaved = () => {
    setShowModal(false);
    setSelected(null);
    fetchHumans();
  };

  const handleCancel = () => {
    setShowModal(false);
    setSelected(null);
  };

  // 👉 NUEVO: abrir modal vacío para crear un humano
  const handleCreate = () => {
    setSelected(null);
    setShowModal(true);
  };

  return (
    <div>
      <Navbar />
      <h2 style={{ textAlign: "center"}}>Humanos</h2>

      {/* 👉 BOTÓN PARA AGREGAR NUEVO */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
  <button
    onClick={handleCreate}
    style={{
      padding: "8px 15px",
      background: "#76c893",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold"
    }}
  >
    Agregar nuevo +
  </button>
</div>

      {/* MODAL DEL FORMULARIO */}
      {showModal && (
        <Modal onClose={handleCancel}>
          <h2 style={{ textAlign: "center" }}>
            {selected ? "Editar Humano" : "Nuevo Humano"}
          </h2>

          <HumanForm
            token={token}
            selected={selected}
            onSaved={handleSaved}
            onCancel={handleCancel}
          />
        </Modal>
      )}

      {/* LISTA DE HUMANOS */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "15px",
          marginTop: "20px"
        }}
      >
        {humans.map((hum) => (
          <div
            key={hum._id}
            style={{
              background: "#2b2b2b",
              padding: "15px",
              borderRadius: "10px",
              width: "250px"
            }}
          >
            <img
              src={hum.image || "https://placehold.co/250x150"}
              alt={hum.name}
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <h3>{hum.name}</h3>
            <p>{hum.role}</p>
            <small>{hum.description}</small>

            <div style={{ marginTop: "10px" }}>
              <button onClick={() => handleEdit(hum)}>Editar</button>

              <button
                style={{ background: "crimson", marginLeft: "5px" }}
                onClick={() => deleteHuman(hum._id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
