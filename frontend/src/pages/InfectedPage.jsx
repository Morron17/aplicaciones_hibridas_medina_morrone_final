import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Navbar from "../components/Navbar.jsx";
import InfectedForm from "../components/InfectedForm.jsx";
import Modal from "../components/Modal.jsx";

export default function InfectedsPage() {
  const { token } = useContext(AuthContext);
  const [infecteds, setInfecteds] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchInfecteds = async () => {
    const res = await fetch("http://localhost:5000/api/infecteds", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setInfecteds(data);
  };

  const deleteInfected = async (id) => {
    if (!confirm("¿Eliminar localización?")) return;
    await fetch(`http://localhost:5000/api/infecteds/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchInfecteds();
  };

  useEffect(() => {
    fetchInfecteds();
  }, []);

  const handleEdit = (infected) => {
    setSelected(infected);
    setShowModal(true);
  };

  const handleSaved = () => {
    setShowModal(false);
    setSelected(null);
    fetchInfecteds();
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
      <h2 style={{ textAlign: "center"}}>Infectados</h2>

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
            {selected ? "Editar Infectado" : "Nuevo Infectado"}
          </h2>

          <InfectedForm
            token={token}
            selected={selected}
            onSaved={handleSaved}
            onCancel={handleCancel}
          />
        </Modal>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "15px",
          marginTop: "20px"
        }}
      >
        {infecteds.map((inf) => (
          <div
            key={inf._id}
            style={{
              background: "#2b2b2b",
              padding: "15px",
              borderRadius: "10px",
              width: "250px"
            }}
          >
            <img
              src={inf.image || "https://placehold.co/250x150"}
              alt={inf.name}
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <h3>{inf.name}</h3>
            <p>{inf.region}</p>
            <small>{inf.description}</small>

            <div style={{ marginTop: "10px" }}>
              <button onClick={() => handleEdit(inf)}>Editar</button>
              <button
                style={{ background: "crimson", marginLeft: "5px" }}
                onClick={() => deleteInfected(inf._id)}
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
