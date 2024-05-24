import {
  Document,
  Text,
  Page,
  StyleSheet,
  Image,
  View
} from '@react-pdf/renderer'

// Definimos los estilos
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 30
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 15
  },
  text: {
    fontSize: 14,
    marginBottom: 10
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row'
  },
  tableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderBottomColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10
  }
})

// const products = [
//   {
//     name: 'Product 1',
//     quantity: 1,
//     price: 10
//   },
//   {
//     name: 'Product 2',
//     quantity: 2,
//     price: 5
//   }

// ]

export default function Invoice ({ order, iva }) {
  //   const order = useOrderStore((state) => state.order)
  //   const total = useOrderStore((state) => state.total)
  //   const iva = useOrderStore((state) => state.iva)

  // Si no hay una orden, no renderizamos nada
  //   if (!order) return null

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Invoice</Text>
        <Text style={styles.author}>
          Author: {order?.user?.name || 'No user'}
        </Text>
        <Text style={styles.author}>
          Client: {order?.client?.name || 'No client'}
        </Text>
        <Text style={styles.subtitle}>Order: ORD-J1J34L</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Product</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Quantity</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Price</Text>
            </View>
          </View>
          {order.products.map((product, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{product.name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{product.quantity}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{product.price}</Text>
              </View>
              <View>
                <Text
                  render={({ pageNumber, totalPages }) =>
                    `${pageNumber} / ${totalPages}`
                  }
                />
              </View>
            </View>
          ))}
        </View>
        <Text style={styles.text}>Total: $ {order.total}</Text>
        <Text style={styles.text}>IVA: $ {iva}</Text>
        <Image src="/icon.svg" style={styles.image} />
      </Page>
    </Document>
  )
}
