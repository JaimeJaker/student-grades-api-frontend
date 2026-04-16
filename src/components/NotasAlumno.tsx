import { useEffect, useState, useCallback } from "react";
import API from "../services/api";
import type { Alumno, Nota } from "../types";

// Agregando ref para que el componente padre (NotasPage) pueda disparar un refresh
export default function NotasAlumno({ refreshTrigger }: { refreshTrigger?: number }) {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [selectedId, setSelectedId] = useState<number | "">("");
  const [notas, setNotas] = useState<Nota[]>([]);

  useEffect(() => {
    API.get("/alumnos").then(res => setAlumnos(res.data));
  }, []);

  const buscar = useCallback((id: number) => {
    API.get(`/notas/alumno/${id}`)
      .then(res => setNotas(res.data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (selectedId) {
      buscar(selectedId);
    }
  }, [selectedId, refreshTrigger, buscar]);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h3 className="card-title h5 mb-3">Notas por Alumno</h3>

        <div className="mb-4">
          <label className="form-label">Consultar Historial</label>
          <select 
            className="form-select" 
            value={selectedId} 
            onChange={(e) => setSelectedId(e.target.value === "" ? "" : Number(e.target.value))}
          >
            <option value="">Selecciona un alumno para ver sus notas</option>
            {alumnos.map(a => (
              <option key={a.id} value={a.id}>
                {a.nombre} {a.apellido}
              </option>
            ))}
          </select>
        </div>

        {selectedId !== "" && (
          <div>
            {notas.length === 0 ? (
              <div className="alert alert-info">El alumno no tiene notas registradas.</div>
            ) : (
               <table className="table table-hover mt-3">
                 <thead>
                   <tr>
                     <th>Materia</th>
                     <th>Fecha Registro</th>
                     <th className="text-end">Calificación</th>
                   </tr>
                 </thead>
                 <tbody>
                   {notas.map((n, i) => (
                     <tr key={i}>
                       <td>{n.materiaNombre}</td>
                       <td>{n.fechaRegistro}</td>
                       <td className="text-end font-weight-bold">
                           <span className={`badge ${n.valor >= 3.0 ? 'bg-success' : 'bg-danger'}`}>
                               {n.valor}
                           </span>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
