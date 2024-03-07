import TableItem from '../ui/display/table'
import { useInventoryStore } from '@/store/inventory'

export default function ProductListItem ({ products }) {
  const handleOpenProduct = useInventoryStore((state) => state.handleOpenProduct)
  const setAction = useInventoryStore((state) => state.setAction)

  const columns = [
    {
      title: '',
      dataIndex: 'id',
      width: '50px',
      align: 'center',
      sorter: (a, b) => a.id - b.id
    },
    {
      title: 'Product name',
      dataIndex: 'name'
    },
    {
      title: 'Code',
      dataIndex: 'code'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      align: 'center'
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      align: 'center'
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      align: 'center'
    }
  ]

  const dataSource = products.map((product) => ({
    key: product.id,
    id: product.id,
    name: product.product_info.name,
    code: product.code,
    stock: product.stock,
    price: product.sale_price,
    cost: product.purshes_price
  }))

  const handleRow = (record) => {
    handleOpenProduct(record.id)
    console.log('record', record)
    setAction('view')
  }

  return (
    <TableItem
      columns={columns}
      dataSource={dataSource}
      handleRowClick={handleRow}
    />
  )
}
