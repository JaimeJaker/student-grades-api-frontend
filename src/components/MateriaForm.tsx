import { useState, useEffect } from "react";
import API from "../services/api";
import { useAppContext } from "../context/AppContext";
import type { Materia } from "../types";

type MateriaFormProps = {
  materiaToEdit: Materia | null;
  onClearEdit: () => void;
};

export default function MateriaForm({ materiaToEdit, onClearEdit }: MateriaFormProps) {
  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");
  const [creditos, setCreditos] = useState<number | "">("");
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { triggerRefreshMaterias } = useAppContext();

  const resetForm = () => {
    setNombre("");
    setCodigo("");
    setCreditos("");
    onClearEdit();
  };

  useEffect(() => {
    if (materiaToEdit) {
      setNombre(materiaToEdit.nombre);
      setCodigo(materiaToEdit.codigo);
      setCreditos(materiaToEdit.creditos);
      setError("");
      setSuccess("");
    } else {
      resetForm();
    }
  }, [materiaToEdit]); // eslint-disable-line react-hooks/exhaustive-deps


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!nombre.trim() || !codigo.trim() || creditos === "") {
      setError("Todos los campos son obligatorios.");
      return;
    }

    const payload = { nombre, codigo, creditos: Number(creditos) };

    if (materiaToEdit) {
      API.put(`/materias/${materiaToEdit.id}`, payload)
        .then(() => {
          setSuccess("Materia actualizada con éxito");
          resetForm();
          triggerRefreshMaterias();
          setTimeout(() => setSuccess(""), 3000);
        })
        .catch(err => setError("Error al actualizar la materia: " + err.message));
    } else {
      API.post("/materias", payload)
        .then(() => {
          setSuccess("Materia creada con éxito");
          resetForm();
          triggerRefreshMaterias();
          setTimeout(() => setSuccess(""), 3000);
        })
        .catch(err => setError("Error al crear la materia: " + err.message));
    }
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="card-title h5 m-0">{materiaToEdit ? 'Editar Materia' : 'Crear Materia'}</h3>
            {materiaToEdit && (
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
              placeholder="Ej: Matemáticas Discretas"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Código</label>
            <input
              className="form-control"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              placeholder="Ej: MAT101"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Créditos</label>
            <input
              type="number"
              className="form-control"
              value={creditos}
              onChange={(e) => setCreditos(e.target.value ? Number(e.target.value) : "")}
              placeholder="Ej: 3"
              min="1"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {materiaToEdit ? 'Guardar Cambios' : 'Crear'}
          </button>
        </form>
      </div>
    </div>
  );
}
