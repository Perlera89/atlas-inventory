import { useInventoryStore } from '@/store/inventory'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

export default function ProductListItem ({ products }) {
  const handleOpenProduct = useInventoryStore(
    (state) => state.handleOpenProduct
  )
  const setAction = useInventoryStore((state) => state.setAction)

  const handleRow = (record) => {
    handleOpenProduct(record.id)
    setAction('view')
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="text-center">Code</TableHead>
          <TableHead className="text-center">Price</TableHead>
          <TableHead className="text-center">Cost</TableHead>
          <TableHead className="text-right">Stock</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((record) => (
          <TableRow key={record.id} onClick={() => handleRow(record)}>
            <TableCell>{record.id}</TableCell>
            <TableCell>
              {record.productInfo.name}
            </TableCell>
            <TableCell className="text-center">{record.code}</TableCell>
            <TableCell className="text-center">$ {record.salePrice}</TableCell>
            <TableCell className="text-center">$ {record.purchasePrice}</TableCell>
            <TableCell className="text-right">{record.stock}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
