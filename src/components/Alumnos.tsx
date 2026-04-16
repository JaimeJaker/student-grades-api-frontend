import { useState, useEffect } from 'react'
import api from '../services/api'

interface Alumno {
    id: number
    nombre: string
    apellido: string
    email: string
    fechaNacimiento: string
}

export function Alumnos() {
    const [alumnos, setAlumnos] = useState<Alumno[]>([])
    const [form, setForm] = useState({ nombre: '', apellido: '', email: '', fechaNacimiento: '' })
    const [editingId, setEditingId] = useState<number | null>(null)

    useEffect(() => {
        loadAlumnos()
    }, [])

    const loadAlumnos = async () => {
        const res = await api.get('/alumnos')
        setAlumnos(res.data)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (editingId) {
            await api.put(`/alumnos/${editingId}`, form)
        } else {
            await api.post('/alumnos', form)
        }
        setForm({ nombre: '', apellido: '', email: '', fechaNacimiento: '' })
        setEditingId(null)
        loadAlumnos()
    }

    const handleDelete = async (id: number) => {
        await api.delete(`/alumnos/${id}`)
        loadAlumnos()
    }

    const handleEdit = (a: Alumno) => {
        setEditingId(a.id)
        setForm({ nombre: a.nombre, apellido: a.apellido, email: a.email, fechaNacimiento: a.fechaNacimiento })
    }

    return (
        <div className="card">
            <h2>Gestión de Alumnos</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Nombre" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required />
                <input placeholder="Apellido" value={form.apellido} onChange={e => setForm({ ...form, apellido: e.target.value })} required />
                <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                <input type="date" value={form.fechaNacimiento} onChange={e => setForm({ ...form, fechaNacimiento: e.target.value })} required />
                <button type="submit">{editingId ? 'Actualizar' : 'Crear'} Alumno</button>
            </form>

            <table style={{ marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Nacimiento</th>
                        <th>Acciones</th>
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
                            <td>
                                <button onClick={() => handleEdit(a)}>Editar</button>
                                <button className="danger" onClick={() => handleDelete(a.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
