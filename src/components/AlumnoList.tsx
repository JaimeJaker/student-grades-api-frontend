import { useEffect, useState } from "react";
import API from "../services/api";
import { useAppContext } from "../context/AppContext";
import type { Alumno } from "../types";

type AlumnoListProps = {
  onEditInit: (a: Alumno) => void;
};

export default function AlumnoList({ onEditInit }: AlumnoListProps) {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const { refreshAlumnosKey, triggerRefreshAlumnos } = useAppContext();

  useEffect(() => {
    API.get("/alumnos")
      .then(res => setAlumnos(res.data))
      .catch(err => console.error(err));
  }, [refreshAlumnosKey]);

  const handleDelete = (id: number) => {
    if (window.confirm("¿Estás seguro de eliminar este alumno? Se borrarán sus notas asociadas.")) {
      API.delete(`/alumnos/${id}`)
        .then(() => triggerRefreshAlumnos())
        .catch(err => alert("Error al eliminar: " + err.message));
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h3 className="card-title h5 mb-3">Lista de Alumnos</h3>
        
        {alumnos.length === 0 ? (
          <div className="alert alert-info">No hay alumnos registrados.</div>
        ) : (
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Nacimiento</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map(a => (
                <tr key={a.id}>
                  <td>{a.id}</td>
                  <td>{a.nombre}</td>
                  <td>{a.apellido}</td>
                  <td>{a.email}</td>
                  <td>{a.fechaNacimiento}</td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => onEditInit(a)}>
                      Editar
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(a.id)}>
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
