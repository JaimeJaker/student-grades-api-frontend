import { useState } from "react";
import AlumnoForm from "../components/AlumnoForm";
import AlumnoList from "../components/AlumnoList";
import type { Alumno } from "../types";

export default function AlumnosPage() {
  const [alumnoToEdit, setAlumnoToEdit] = useState<Alumno | null>(null);

  const handleEdit = (alumno: Alumno) => {
    setAlumnoToEdit(alumno);
  };

  const handleClearEdit = () => {
    setAlumnoToEdit(null);
  };

  return (
    <div>
      <h2 className="mb-4">Gestión de Alumnos</h2>
      <div className="row">
        <div className="col-md-4">
          <AlumnoForm alumnoToEdit={alumnoToEdit} onClearEdit={handleClearEdit} />
        </div>
        <div className="col-md-8">
          <AlumnoList onEditInit={handleEdit} />
        </div>
      </div>
    </div>
  );
}
