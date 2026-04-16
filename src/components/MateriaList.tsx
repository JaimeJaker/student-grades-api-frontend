import { useEffect, useState } from "react";
import API from "../services/api";
import { useAppContext } from "../context/AppContext";
import type { Materia } from "../types";

type MateriaListProps = {
  onEditInit: (m: Materia) => void;
};

export default function MateriaList({ onEditInit }: MateriaListProps) {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const { refreshMateriasKey, triggerRefreshMaterias } = useAppContext();

  useEffect(() => {
    API.get("/materias")
      .then(res => setMaterias(res.data))
      .catch(err => console.error(err));
  }, [refreshMateriasKey]);

  const handleDelete = (id: number) => {
    if (window.confirm("¿Estás seguro de eliminar esta materia?")) {
      API.delete(`/materias/${id}`)
        .then(() => triggerRefreshMaterias())
        .catch(err => alert("Error al eliminar: " + err.message));
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h3 className="card-title h5 mb-3">Lista de Materias</h3>
        {materias.length === 0 ? (
          <div className="alert alert-info">No hay materias registradas.</div>
        ) : (
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Cód</th>
                <th>Nombre</th>
                <th>Créditos</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {materias.map(m => (
                <tr key={m.id}>
                  <td>{m.codigo}</td>
                  <td>{m.nombre}</td>
                  <td>{m.creditos}</td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => onEditInit(m)}>
                      Editar
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(m.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
