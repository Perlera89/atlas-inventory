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
      align: 'center',
      render: (text) => `$ ${text}`
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      align: 'center',
      render: (text) => `$ ${text}`
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      align: 'center',
      sorter: (a, b) => a.stock - b.stock
    }
  ]

  const dataSource = products.map((product) => ({
    key: product.id,
    id: product.id,
    name: product.productInfo.name,
    code: product.code,
    stock: product.stock,
    price: product.salePrice,
    cost: product.purchasePrice
  }))

  const handleRow = (record) => {
    handleOpenProduct(record.id)
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
