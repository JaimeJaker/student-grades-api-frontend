import { useEffect, useState } from "react";
import API from "../services/api";
import type { Alumno, Materia } from "../types";

export default function NotaForm({ onNotaCreated }: { onNotaCreated?: () => void }) {
  const [valor, setValor] = useState("");
  const [alumnoId, setAlumnoId] = useState<number | "">("");
  const [materiaId, setMateriaId] = useState<number | "">("");

  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    API.get("/alumnos").then(res => setAlumnos(res.data));
    API.get("/materias").then(res => setMaterias(res.data));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!valor || !alumnoId || !materiaId) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    API.post("/notas", {
      valor: Number(valor),
      alumnoId,
      materiaId
    }).then(() => {
      setSuccess("Nota registrada");
      setValor("");
      setAlumnoId("");
      setMateriaId("");
      if(onNotaCreated) onNotaCreated();
      setTimeout(() => setSuccess(""), 3000);
    }).catch((err) => setError("Error al guardar: " + err.message));
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h3 className="card-title h5 mb-3">Registrar Nota</h3>
        
        {error && <div className="alert alert-danger p-2">{error}</div>}
        {success && <div className="alert alert-success p-2">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Valor de la Nota</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              className="form-control"
              placeholder="Ej: 4.5"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Alumno</label>
            <select
              className="form-select"
              value={alumnoId}
              onChange={(e) => setAlumnoId(Number(e.target.value))}
            >
              <option value="">Seleccionar Alumno...</option>
              {alumnos.map(a => (
                <option key={a.id} value={a.id}>
                  {a.nombre} {a.apellido}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Materia</label>
            <select
              className="form-select"
              value={materiaId}
              onChange={(e) => setMateriaId(Number(e.target.value))}
            >
              <option value="">Seleccionar Materia...</option>
              {materias.map(m => (
                <option key={m.id} value={m.id}>
                  {m.nombre} ({m.codigo})
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100">Guardar Nota</button>
        </form>
      </div>
    </div>
  );
}
