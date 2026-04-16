import { useState, useEffect } from 'react'
import api from '../services/api'

interface Materia {
    id: number
    nombre: string
    codigo: string
    creditos: number
}

export function Materias() {
    const [materias, setMaterias] = useState<Materia[]>([])
    const [form, setForm] = useState({ nombre: '', codigo: '', creditos: 0 })
    const [editingId, setEditingId] = useState<number | null>(null)

    useEffect(() => {
        loadMaterias()
    }, [])

    const loadMaterias = async () => {
        const res = await api.get('/materias')
        setMaterias(res.data)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (editingId) {
            await api.put(`/materias/${editingId}`, form)
        } else {
            await api.post('/materias', form)
        }
        setForm({ nombre: '', codigo: '', creditos: 0 })
        setEditingId(null)
        loadMaterias()
    }

    const handleDelete = async (id: number) => {
        await api.delete(`/materias/${id}`)
        loadMaterias()
    }

    const handleEdit = (m: Materia) => {
        setEditingId(m.id)
        setForm({ nombre: m.nombre, codigo: m.codigo, creditos: m.creditos })
    }

    return (
        <div className="card">
            <h2>Gestión de Materias</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Nombre" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required />
                <input placeholder="Código" value={form.codigo} onChange={e => setForm({ ...form, codigo: e.target.value })} required />
                <input type="number" placeholder="Créditos" value={form.creditos || ''} onChange={e => setForm({ ...form, creditos: Number(e.target.value) })} required />
                <button type="submit">{editingId ? 'Actualizar' : 'Crear'} Materia</button>
            </form>

            <table style={{ marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Código</th>
                        <th>Créditos</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {materias.map(m => (
                        <tr key={m.id}>
                            <td>{m.id}</td>
                            <td>{m.nombre}</td>
                            <td>{m.codigo}</td>
                            <td>{m.creditos}</td>
                            <td>
                                <button onClick={() => handleEdit(m)}>Editar</button>
                                <button className="danger" onClick={() => handleDelete(m.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
