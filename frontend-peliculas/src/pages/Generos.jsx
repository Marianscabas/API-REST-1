import ModuloCrud from '../components/ModuloCrud'

export default function Generos() {
  return (
    <ModuloCrud
      titulo="Género"
      ruta="/generos"
      tieneEstado={true}
      campos={[
        { name: 'nombre', label: 'Nombre', required: true },
        { name: 'descripcion', label: 'Descripción', type: 'textarea' },
      ]}
    />
  )
}