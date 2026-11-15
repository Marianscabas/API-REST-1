import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import api from '../services/api'

export default function ModuloCrud({ titulo, ruta, campos, tieneEstado }) {
  const formVacio = () => {
    const base = {}
    campos.forEach((c) => (base[c.name] = ''))
    if (tieneEstado) base.estado = 'Activo'
    return base
  }

  const [items, setItems] = useState([])
  const [form, setForm] = useState(formVacio())
  const [editId, setEditId] = useState(null)

  const cargar = async () => {
    try {
      const { data } = await api.get(ruta)
      setItems(data)
    } catch (error) {
      Swal.fire('Error', 'No se pudo cargar la lista', 'error')
    }
  }

  useEffect(() => {
    cargar()
  }, [ruta])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editId) {
        await api.put(`${ruta}/${editId}`, form)
        Swal.fire('Listo', `${titulo} actualizado`, 'success')
      } else {
        await api.post(ruta, form)
        Swal.fire('Listo', `${titulo} creado`, 'success')
      }
      setForm(formVacio())
      setEditId(null)
      cargar()
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || 'Ocurrió un error'
      Swal.fire('Error', mensaje, 'error')
    }
  }

  const editar = (item) => {
    const datos = {}
    campos.forEach((c) => (datos[c.name] = item[c.name] || ''))
    if (tieneEstado) datos.estado = item.estado
    setForm(datos)
    setEditId(item._id)
  }

  const cancelar = () => {
    setForm(formVacio())
    setEditId(null)
  }

  const eliminar = async (id) => {
    const respuesta = await Swal.fire({
      title: '¿Eliminar?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    })
    if (!respuesta.isConfirmed) return
    try {
      await api.delete(`${ruta}/${id}`)
      Swal.fire('Eliminado', `${titulo} eliminado`, 'success')
      cargar()
    } catch (error) {
      Swal.fire('Error', 'No se pudo eliminar', 'error')
    }
  }

  const input = 'w-full rounded border border-gray-300 px-3 py-2'

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-2xl font-bold">{titulo}</h1>

      <form onSubmit={handleSubmit} className="mb-8 grid gap-4 rounded bg-white p-4 shadow md:grid-cols-2">
        {campos.map((c) => (
          <div key={c.name} className={c.type === 'textarea' ? 'md:col-span-2' : ''}>
            <label className="mb-1 block text-sm font-medium">{c.label}</label>
            {c.type === 'textarea' ? (
              <textarea name={c.name} value={form[c.name]} onChange={handleChange} required={c.required} className={input} rows="3" />
            ) : (
              <input name={c.name} value={form[c.name]} onChange={handleChange} required={c.required} className={input} />
            )}
          </div>
        ))}

        {tieneEstado && (
          <div>
            <label className="mb-1 block text-sm font-medium">Estado</label>
            <select name="estado" value={form.estado} onChange={handleChange} className={input}>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
        )}

        <div className="flex items-end gap-2 md:col-span-2">
          <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            {editId ? 'Actualizar' : 'Guardar'}
          </button>
          {editId && (
            <button type="button" onClick={cancelar} className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="overflow-x-auto rounded bg-white shadow">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              {campos.map((c) => (
                <th key={c.name} className="px-4 py-3">{c.label}</th>
              ))}
              {tieneEstado && <th className="px-4 py-3">Estado</th>}
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-t">
                {campos.map((c) => (
                  <td key={c.name} className="px-4 py-3">{item[c.name]}</td>
                ))}
                {tieneEstado && <td className="px-4 py-3">{item.estado}</td>}
                <td className="flex gap-2 px-4 py-3">
                  <button onClick={() => editar(item)} className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600">
                    Editar
                  </button>
                  <button onClick={() => eliminar(item._id)} className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan="10" className="px-4 py-6 text-center text-gray-500">No hay registros</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}