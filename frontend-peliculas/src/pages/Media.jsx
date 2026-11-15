import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import api from '../services/api'

const formVacio = {
  serial: '',
  titulo: '',
  sinopsis: '',
  url: '',
  imagenPortada: '',
  anioEstreno: '',
  genero: '',
  director: '',
  productora: '',
  tipo: '',
}

export default function Media() {
  const [items, setItems] = useState([])
  const [generos, setGeneros] = useState([])
  const [directores, setDirectores] = useState([])
  const [productoras, setProductoras] = useState([])
  const [tipos, setTipos] = useState([])
  const [form, setForm] = useState(formVacio)
  const [editId, setEditId] = useState(null)

  const cargar = async () => {
    try {
      const { data } = await api.get('/media')
      setItems(data)
    } catch (error) {
      Swal.fire('Error', 'No se pudo cargar la lista', 'error')
    }
  }

  const cargarOpciones = async () => {
    try {
      const [g, d, p, t] = await Promise.all([
        api.get('/generos'),
        api.get('/directores'),
        api.get('/productoras'),
        api.get('/tipos'),
      ])
      setGeneros(g.data.filter((x) => x.estado === 'Activo'))
      setDirectores(d.data.filter((x) => x.estado === 'Activo'))
      setProductoras(p.data.filter((x) => x.estado === 'Activo'))
      setTipos(t.data)
    } catch (error) {
      Swal.fire('Error', 'No se pudieron cargar las listas', 'error')
    }
  }

  useEffect(() => {
    cargar()
    cargarOpciones()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editId) {
        await api.put(`/media/${editId}`, form)
        Swal.fire('Listo', 'Producción actualizada', 'success')
      } else {
        await api.post('/media', form)
        Swal.fire('Listo', 'Producción creada', 'success')
      }
      setForm(formVacio)
      setEditId(null)
      cargar()
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || 'Ocurrió un error'
      Swal.fire('Error', mensaje, 'error')
    }
  }

  const editar = (item) => {
    setForm({
      serial: item.serial || '',
      titulo: item.titulo || '',
      sinopsis: item.sinopsis || '',
      url: item.url || '',
      imagenPortada: item.imagenPortada || '',
      anioEstreno: item.anioEstreno || '',
      genero: item.genero?._id || '',
      director: item.director?._id || '',
      productora: item.productora?._id || '',
      tipo: item.tipo?._id || '',
    })
    setEditId(item._id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelar = () => {
    setForm(formVacio)
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
      await api.delete(`/media/${id}`)
      Swal.fire('Eliminado', 'Producción eliminada', 'success')
      cargar()
    } catch (error) {
      Swal.fire('Error', 'No se pudo eliminar', 'error')
    }
  }

  const input = 'w-full rounded border border-gray-300 px-3 py-2'

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Películas y series</h1>

      <form onSubmit={handleSubmit} className="mb-8 grid gap-4 rounded bg-white p-4 shadow md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Serial</label>
          <input name="serial" value={form.serial} onChange={handleChange} required className={input} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Título</label>
          <input name="titulo" value={form.titulo} onChange={handleChange} required className={input} />
        </div>
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">Sinopsis</label>
          <textarea name="sinopsis" value={form.sinopsis} onChange={handleChange} className={input} rows="3" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">URL de la película</label>
          <input name="url" value={form.url} onChange={handleChange} required className={input} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Imagen de portada (URL)</label>
          <input name="imagenPortada" value={form.imagenPortada} onChange={handleChange} className={input} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Año de estreno</label>
          <input type="number" name="anioEstreno" value={form.anioEstreno} onChange={handleChange} className={input} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Género</label>
          <select name="genero" value={form.genero} onChange={handleChange} required className={input}>
            <option value="">Seleccione...</option>
            {generos.map((g) => (
              <option key={g._id} value={g._id}>{g.nombre}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Director</label>
          <select name="director" value={form.director} onChange={handleChange} required className={input}>
            <option value="">Seleccione...</option>
            {directores.map((d) => (
              <option key={d._id} value={d._id}>{d.nombres}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Productora</label>
          <select name="productora" value={form.productora} onChange={handleChange} required className={input}>
            <option value="">Seleccione...</option>
            {productoras.map((p) => (
              <option key={p._id} value={p._id}>{p.nombre}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Tipo</label>
          <select name="tipo" value={form.tipo} onChange={handleChange} required className={input}>
            <option value="">Seleccione...</option>
            {tipos.map((t) => (
              <option key={t._id} value={t._id}>{t.nombre}</option>
            ))}
          </select>
        </div>

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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item._id} className="flex flex-col overflow-hidden rounded bg-white shadow">
            {item.imagenPortada ? (
              <img src={item.imagenPortada} alt={item.titulo} className="h-64 w-full object-cover" />
            ) : (
              <div className="flex h-64 items-center justify-center bg-gray-200 text-gray-500">Sin portada</div>
            )}
            <div className="flex flex-1 flex-col gap-1 p-4">
              <h2 className="text-lg font-bold">{item.titulo}</h2>
              <p className="text-sm text-gray-500">
                {item.tipo?.nombre} · {item.anioEstreno} · {item.genero?.nombre}
              </p>
              <p className="line-clamp-3 text-sm text-gray-600">{item.sinopsis}</p>
              <p className="text-sm">Director: {item.director?.nombres}</p>
              <p className="text-sm">Productora: {item.productora?.nombre}</p>
              <p className="text-xs text-gray-400">Serial: {item.serial}</p>
              <p className="text-xs text-gray-400">
                Creada: {new Date(item.fechaCreacion).toLocaleDateString('es-CO')}
              </p>
              <div className="mt-3 flex gap-2">
                <button onClick={() => editar(item)} className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600">
                  Editar
                </button>
                <button onClick={() => eliminar(item._id)} className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700">
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="col-span-full text-center text-gray-500">No hay registros</p>
        )}
      </div>
    </div>
  )
}