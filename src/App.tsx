import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Alumnos } from './components/Alumnos'
import { Materias } from './components/Materias'
import { Notas } from './components/Notas'

function App() {
  return (
    <Router>
      <div className="container">
        <header>
          <Link to="/alumnos">Gestión de Alumnos</Link>
          <Link to="/materias">Gestión de Materias</Link>
          <Link to="/notas">Gestión de Notas</Link>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Alumnos />} />
            <Route path="/alumnos" element={<Alumnos />} />
            <Route path="/materias" element={<Materias />} />
            <Route path="/notas" element={<Notas />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
