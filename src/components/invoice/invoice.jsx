import {
  Document,
  Text,
  Page,
  StyleSheet,
  Image,
  View
} from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    padding: 10,
    fontSize: 10,
    fontFamily: 'Helvetica'
  },
  logo: {
    width: 60,
    height: 60,
    margin: '0 auto'
  },
  header: {
    textAlign: 'center',
    marginBottom: 10
  },
  section: {
    marginBottom: 10
  },
  text: {
    marginBottom: 2
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 10
  },
  tableRow: {
    flexDirection: 'row'
  },
  tableColHeader: {
    width: '25%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderBottomColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#f0f0f0',
    padding: 2
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderBottomColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 2
  },
  tableCellHeader: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  tableCell: {
    textAlign: 'center'
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderTop: '1 solid #000',
    paddingTop: 5
  },
  footer: {
    textAlign: 'center',
    marginTop: 10,
    borderTop: '1 solid #000',
    paddingTop: 5
  }
})

export default function Invoice ({ order, iva }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text>INVOICE</Text>
        </View>
        <View style={styles.header}>
          <Image src="/icon.svg" style={styles.logo} />
          <Text>ATLAS INVENTORY</Text>
          <Text>NOMBRE EMPRESA</Text>
          <Text>NIT: 0000659745 TEL: 7453-1254</Text>
          <Text>EMPRESA@GMAIL.COM</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>FACTURA: {order?.code || '00-001-01-00000001'}</Text>
          <Text style={styles.text}>FECHA: {order?.date || '17/04/2019'}</Text>
          <Text style={styles.text}>CLIENTE: {order?.client?.name || 'CONSUMIDOR FINAL'}</Text>
          <Text style={styles.text}>DUI: {order?.client?.dui || '14523554-9'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>VENDEDOR: {order?.user.name || 'GENERAL'}</Text>
          <Text style={styles.text}>TÉRMINOS: {order?.terms || 'CONTADO'}</Text>
          <Text style={styles.text}>ESTADO: PAGADO</Text>
          <Text style={styles.text}>VENCIMIENTO: {order?.dueDate || '17/05/2019'}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Cantidad</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Descripción</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Precio Unitario</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Total</Text>
            </View>
          </View>
          {order.products.map((product, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{product.quantity}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{product.name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{product.price}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{product.quantity * product.price}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.totalSection}>
          <Text>Subtotal: </Text>
          <Text>$ {order.subtotal}</Text>
        </View>
        <View style={styles.totalSection}>
          <Text>IVA:</Text>
          <Text>$ {iva}</Text>
        </View>
        <View style={styles.totalSection}>
          <Text>Total:</Text>
          <Text>$ {order.total}</Text>
        </View>

        <View style={styles.footer}>
          <Text>Gracias por su compra</Text>
          <Text>ORIGINAL: CLIENTE / COPIA: EMISOR</Text>
        </View>
      </Page>
    </Document>
  )
}
