import fs from 'fs'

export default function docReader (query) {
  switch (true) {
    case query.includes('Iniciar Sesión'):
      console.log('entro')
      return fs.readFileSync('src/assets/auth.md', 'utf8')
    case query.includes('Agregar un Producto'):
      console.log('entro')
      return fs.readFileSync('src/assets/inventory.md', 'utf8')
    case 'route':
      console.log('Actualizar un Producto')
      return fs.readFileSync('src/assets/inventory.md', 'utf8')
    default:
      return 'No encontrado'
  }
}
