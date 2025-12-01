import { useState, useEffect } from "react";

export default function HumanForm({ token, selected, onSaved, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    description: "",
    image: ""
  });

  useEffect(() => {
    if (selected) setForm(selected);
  }, [selected]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = selected ? "PUT" : "POST";
    const url = selected
      ? `http://localhost:5000/api/humans/${selected._id}`
      : "http://localhost:5000/api/humans";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      setForm({ name: "", age: "", description: "", image: "" });
      onSaved();
    } else {
      alert("❌ Error al guardar personaje");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Nombre"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Edad"
        value={form.age}
        onChange={(e) => setForm({ ...form, age: e.target.value })}
      />
      <input
        placeholder="URL de imagen"
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
      />
      <textarea
        placeholder="Descripción"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        style={{ background: "#222", color: "#fff", borderRadius: "5px", padding: "8px" }}
      />
      <button type="submit">{selected ? "Actualizar" : "Agregar"}</button>
      {selected && (
        <button
          type="button"
          style={{ background: "gray" }}
          onClick={onCancel}
        >
          Cancelar
        </button>
      )}
    </form>
  );
}
