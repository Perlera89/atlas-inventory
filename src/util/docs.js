import fs from 'fs'

const queryFileMap = {
  'Iniciar Sesión': 'src/assets/auth.md',
  'Realizar Registro': 'src/assets/auth.md',
  'Agregar un Producto': 'src/assets/inventory.md',
  'Actualizar un Producto': 'src/assets/inventory.md',
  'Eliminar un Producto': 'src/assets/inventory.md',
  'Agregar un Cliente': 'src/assets/client.md',
  'Actualizar un Cliente': 'src/assets/client.md',
  'Eliminar un Cliente': 'src/assets/client.md',
  'Agregar un Empleado': 'src/assets/employee.md',
  'Actualizar un Empleado': 'src/assets/employee.md',
  'Eliminar un Empleado': 'src/assets/employee.md',
  'Agregar una Orden': 'src/assets/order.md'
}

export default function docReader (docName) {
  const file = Object.keys(queryFileMap).find((key) => docName.includes(key))
  console.log('file', file)

  if (file) {
    return fs.readFileSync(queryFileMap[file], 'utf8')
  } else {
    return 'No encontrado'
  }
}
