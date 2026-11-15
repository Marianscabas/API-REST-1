import ModuloCrud from '../components/ModuloCrud'

export default function Directores() {
  return (
    <ModuloCrud
      titulo="Director"
      ruta="/directores"
      tieneEstado={true}
      campos={[
        { name: 'nombres', label: 'Nombres', required: true },
      ]}
    />
  )
}