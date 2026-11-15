import ModuloCrud from '../components/ModuloCrud'

export default function Tipos() {
  return (
    <ModuloCrud
      titulo="Tipo"
      ruta="/tipos"
      tieneEstado={false}
      campos={[
        { name: 'nombre', label: 'Nombre', required: true },
        { name: 'descripcion', label: 'Descripción', type: 'textarea' },
      ]}
    />
  )
}