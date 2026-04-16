import { useState } from "react";
import NotaForm from "../components/NotaForm";
import NotasAlumno from "../components/NotasAlumno";

export default function NotasPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleNotaCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div>
      <h2 className="mb-4">Gestión de Notas</h2>
      <div className="row">
        <div className="col-md-4">
          <NotaForm onNotaCreated={handleNotaCreated} />
        </div>
        <div className="col-md-8">
          <NotasAlumno refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </div>
  );
}
