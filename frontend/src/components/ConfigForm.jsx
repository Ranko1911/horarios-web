import { useState } from "react";

function ConfigForm({ setSchedule }) {
  const [form, setForm] = useState({
    apertura: "10:00",
    cierre: "23:59",
    trabajadores: "ANCOR,PACO,LIS,ADONAI,EVARISTO",
    numTurnos: 2,
    fechaInicio: "2025-07-18"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        trabajadores: form.trabajadores.split(",").map(t => t.trim())
      })
    });
    const data = await res.json();
    setSchedule(data.table);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 flex flex-col max-w-sm">
      <input type="text" value={form.apertura} onChange={e => setForm({ ...form, apertura: e.target.value })} placeholder="Hora apertura" />
      <input type="text" value={form.cierre} onChange={e => setForm({ ...form, cierre: e.target.value })} placeholder="Hora cierre" />
      <input type="text" value={form.trabajadores} onChange={e => setForm({ ...form, trabajadores: e.target.value })} placeholder="Trabajadores separados por coma" />
      <input type="number" value={form.numTurnos} onChange={e => setForm({ ...form, numTurnos: e.target.value })} placeholder="Número de turnos" />
      <input type="date" value={form.fechaInicio} onChange={e => setForm({ ...form, fechaInicio: e.target.value })} />
      <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">Generar</button>
    </form>
  );
}

export default ConfigForm;
