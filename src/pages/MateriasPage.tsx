import { useState } from "react";
import MateriaForm from "../components/MateriaForm";
import MateriaList from "../components/MateriaList";
import type { Materia } from "../types";

export default function MateriasPage() {
  const [materiaToEdit, setMateriaToEdit] = useState<Materia | null>(null);

  const handleEdit = (materia: Materia) => {
    setMateriaToEdit(materia);
  };

  const handleClearEdit = () => {
    setMateriaToEdit(null);
  };

  return (
    <div>
      <h2 className="mb-4">Gestión de Materias</h2>
      <div className="row">
        <div className="col-md-4">
          <MateriaForm materiaToEdit={materiaToEdit} onClearEdit={handleClearEdit} />
        </div>
        <div className="col-md-8">
          <MateriaList onEditInit={handleEdit} />
        </div>
      </div>
    </div>
  );
}
