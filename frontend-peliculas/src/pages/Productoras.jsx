import ModuloCrud from '../components/ModuloCrud'

export default function Productoras() {
  return (
    <ModuloCrud
      titulo="Productora"
      ruta="/productoras"
      tieneEstado={true}
      campos={[
        { name: 'nombre', label: 'Nombre', required: true },
        { name: 'slogan', label: 'Slogan' },
        { name: 'descripcion', label: 'Descripción', type: 'textarea' },
      ]}
    />
  )
}