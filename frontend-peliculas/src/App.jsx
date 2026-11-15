import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Generos from './pages/Generos'
import Directores from './pages/Directores'
import Productoras from './pages/Productoras'
import Tipos from './pages/Tipos'
import Media from './pages/Media'

const links = [
  { to: '/media', texto: 'Películas y series' },
  { to: '/generos', texto: 'Géneros' },
  { to: '/directores', texto: 'Directores' },
  { to: '/productoras', texto: 'Productoras' },
  { to: '/tipos', texto: 'Tipos' },
]

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-slate-900 text-white shadow">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-6 py-3">
          <span className="mr-4 text-lg font-bold">IU Digital Películas</span>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded px-3 py-2 text-sm ${isActive ? 'bg-blue-600' : 'hover:bg-slate-700'}`
              }
            >
              {l.texto}
            </NavLink>
          ))}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/media" />} />
        <Route path="/media" element={<Media />} />
        <Route path="/generos" element={<Generos />} />
        <Route path="/directores" element={<Directores />} />
        <Route path="/productoras" element={<Productoras />} />
        <Route path="/tipos" element={<Tipos />} />
      </Routes>
    </div>
  )
}