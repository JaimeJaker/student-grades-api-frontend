export type Alumno = {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  fechaNacimiento: string; 
};

export type Materia = {
  id: number;
  nombre: string;
  codigo: string;
  creditos: number;
};

export type Nota = {
  id: number;
  valor: number;
  fechaRegistro: string;
  alumnoNombre?: string;
  materiaNombre?: string;
};