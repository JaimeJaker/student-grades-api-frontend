import { useState, useEffect } from "react";
import API from "../services/api";
import { useAppContext } from "../context/AppContext";
import type { Alumno } from "../types";

type AlumnoFormProps = {
  alumnoToEdit: Alumno | null;
  onClearEdit: () => void;
};

export default function AlumnoForm({ alumnoToEdit, onClearEdit }: AlumnoFormProps) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { triggerRefreshAlumnos } = useAppContext();

  const resetForm = () => {
    setNombre("");
    setApellido("");
    setEmail("");
    setFechaNacimiento("");
    onClearEdit();
  };

  useEffect(() => {
    if (alumnoToEdit) {
      setNombre(alumnoToEdit.nombre || "");
      setApellido(alumnoToEdit.apellido || "");
      setEmail(alumnoToEdit.email || "");
      setFechaNacimiento(alumnoToEdit.fechaNacimiento || "");
      setError("");
      setSuccess("");
    } else {
      resetForm();
    }
  }, [alumnoToEdit]); // eslint-disable-line react-hooks/exhaustive-deps


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!nombre.trim() || !apellido.trim() || !email.trim() || !fechaNacimiento) {
      setError("Todos los campos son requeridos");
      return;
    }

    const payload = { nombre, apellido, email, fechaNacimiento };

    if (alumnoToEdit) {
      API.put(`/alumnos/${alumnoToEdit.id}`, payload)
        .then(() => {
          setSuccess("Alumno actualizado con éxito");
          resetForm();
          triggerRefreshAlumnos();
          setTimeout(() => setSuccess(""), 3000);
        })
        .catch(err => setError("Error al actualizar: " + err.message));
    } else {
      API.post("/alumnos", payload)
        .then(() => {
          setSuccess("Alumno creado con éxito");
          resetForm();
          triggerRefreshAlumnos();
          setTimeout(() => setSuccess(""), 3000);
        })
        .catch(err => setError("Error al crear el alumno: " + err.message));
    }
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="card-title h5 m-0">{alumnoToEdit ? 'Editar Alumno' : 'Crear Alumno'}</h3>
            {alumnoToEdit && (
                <button type="button" className="btn btn-sm btn-link text-danger" onClick={resetForm}>
                    Cancelar edición
                </button>
            )}
        </div>
        
        {error && <div className="alert alert-danger p-2">{error}</div>}
        {success && <div className="alert alert-success p-2">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Juan"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Apellido</label>
            <input
              className="form-control"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              placeholder="Ej: Pérez"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ej: juan@mail.com"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Fecha de Nacimiento</label>
            <input
              type="date"
              className="form-control"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {alumnoToEdit ? 'Guardar Cambios' : 'Crear'}
          </button>
        </form>
      </div>
    </div>
  );
}
