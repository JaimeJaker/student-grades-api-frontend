import { useState, useEffect } from 'react'
import api from '../services/api'

interface Alumno { id: number, nombre: string, apellido: string }
interface Materia { id: number, nombre: string }
interface Nota { valor: number, fecha: string, alumnoNombre: string, materiaNombre: string }

export function Notas() {
    const [alumnos, setAlumnos] = useState<Alumno[]>([])
    const [materias, setMaterias] = useState<Materia[]>([])
    const [notas, setNotas] = useState<Nota[]>([])
    
    const [form, setForm] = useState({ valor: 0, alumnoId: '', materiaId: '' })
    const [filter, setFilter] = useState({ alumnoId: '', materiaId: '' })

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        const [resAlumnos, resMaterias] = await Promise.all([
            api.get('/alumnos'),
            api.get('/materias')
        ])
        setAlumnos(resAlumnos.data)
        setMaterias(resMaterias.data)
    }

    const loadNotas = async () => {
        if (!filter.alumnoId) return
        const res = await api.get(`/notas/alumno/${filter.alumnoId}`)
        // Filtramos en frontend por materia si hay una seleccionada
        let data = res.data
        if (filter.materiaId) {
            const materiaSeleccionada = materias.find(m => m.id === Number(filter.materiaId))
            if (materiaSeleccionada) {
                data = data.filter((n: Nota) => n.materiaNombre === materiaSeleccionada.nombre)
            }
        }
        setNotas(data)
    }

    useEffect(() => {
        loadNotas()
    }, [filter])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await api.post('/notas', {
            valor: Number(form.valor),
            alumnoId: Number(form.alumnoId),
            materiaId: Number(form.materiaId)
        })
        setForm({ ...form, valor: 0 })
        if (filter.alumnoId === form.alumnoId && filter.materiaId === form.materiaId) {
            loadNotas()
        }
    }

    return (
        <div className="card">
            <h2>Gestión de Notas</h2>
            
            <div style={{ display: 'flex', gap: '20px' }}>
                <div>
                    <h3>Registrar Nota</h3>
                    <form onSubmit={handleSubmit}>
                        <select value={form.alumnoId} onChange={e => setForm({ ...form, alumnoId: e.target.value })} required>
                            <option value="">Seleccionar Alumno</option>
                            {alumnos.map(a => <option key={a.id} value={a.id}>{a.nombre} {a.apellido}</option>)}
                        </select>
                        
                        <select value={form.materiaId} onChange={e => setForm({ ...form, materiaId: e.target.value })} required>
                            <option value="">Seleccionar Materia</option>
                            {materias.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
                        </select>
                        
                        <input type="number" step="0.1" placeholder="Valor de nota" value={form.valor || ''} onChange={e => setForm({ ...form, valor: Number(e.target.value) })} required />
                        <button type="submit">Registrar Nota</button>
                    </form>
                </div>

                <div>
                    <h3>Consultar Notas</h3>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                        <select value={filter.alumnoId} onChange={e => setFilter({ ...filter, alumnoId: e.target.value })}>
                            <option value="">Filtrar por Alumno</option>
                            {alumnos.map(a => <option key={a.id} value={a.id}>{a.nombre} {a.apellido}</option>)}
                        </select>
                        
                        <select value={filter.materiaId} onChange={e => setFilter({ ...filter, materiaId: e.target.value })}>
                            <option value="">Filtrar por Materia</option>
                            {materias.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
                        </select>
                    </div>

                    {notas.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Valor</th>
                                    <th>Fecha</th>
                                    <th>Alumno</th>
                                    <th>Materia</th>
                                </tr>
                            </thead>
                            <tbody>
                                {notas.map((n, i) => (
                                    <tr key={i}>
                                        <td>{n.valor}</td>
                                        <td>{n.fecha}</td>
                                        <td>{n.alumnoNombre}</td>
                                        <td>{n.materiaNombre}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No hay notas para esta combinación o faltan filtros.</p>
                    )}
                </div>
            </div>
        </div>
    )
}
