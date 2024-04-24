// hooks
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// store
import { useInventoryStore } from '@/store/inventory'

// components
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CardItem from '@/components/ui/card-item'
import { Button } from '@/components/ui/button'
import { Menu, LayoutGrid } from 'lucide-react'
import { ComboboxDropdownMenu } from '@/components/ui/combobox'
import { SearchItem } from '../ui/search'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

const ProductList = ({ products }) => {
  const router = useRouter()
  const setAction = useInventoryStore((state) => state.setAction)

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
          <TableRow
            key={record.id}
            onClick={() => {
              setAction('view')
              router.push(`/inventory/${record.id}`)
            }}
          >
            <TableCell>{record.id}</TableCell>
            <TableCell>{record?.productInfo?.name}</TableCell>
            <TableCell className="text-center">{record.code}</TableCell>
            <TableCell className="text-center">$ {record.salePrice}</TableCell>
            <TableCell className="text-center">
              $ {record.purchasePrice}
            </TableCell>
            <TableCell className="text-right">{record.stock}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const ProductKanban = ({ products }) => {
  const router = useRouter()
  const setAction = useInventoryStore((state) => state.setAction)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 w-full">
      {products.map((product, key) => (
        <CardItem
          key={key}
          image={product.productInfo.thumbnail}
          name={product.productInfo.name}
          price={product.salePrice}
          stock={product.stock}
          onClick={() => {
            setAction('view')
            router.push(`/inventory/${product.id}`)
          }}
        />
      ))}
    </div>
  )
}

export function ProductsItem () {
  const router = useRouter()

  const products = useInventoryStore((state) => state.products)
  const allProducts = useInventoryStore((state) => state.allProducts)
  const fetchProducts = useInventoryStore((state) => state.fetchProducts)
  const view = useInventoryStore((state) => state.view)

  const setAction = useInventoryStore((state) => state.setAction)
  const handleChangeView = useInventoryStore((state) => state.handleChangeView)
  const handleSearch = useInventoryStore(
    (state) => state.handleSearch
  )
  const handleClearProduct = useInventoryStore(
    (state) => state.handleClearProduct
  )

  const [page, setPage] = useState(0)
  const itemsPerPage = 10
  const totalPages = Math.ceil(products.length / itemsPerPage)

  useEffect(() => {
    const fetchData = async () => {
      await fetchProducts()
    }

    fetchData()
  }, [])

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex w-full">
        <div className="flex gap-2 justify-start w-full items-center">
          <Button
            className="w-auto"
            size="sm"
            onClick={() => {
              setAction('edit')
              router.push('/inventory/add')
              handleClearProduct()
            }}
          >
            Add product
          </Button>

          <form className="w-full">
            <SearchItem
              keys="productInfo.name"
              placeholder="Search product..."
              options={allProducts}
              onSearch={(value) => handleSearch(value, 'products')}
            />
          </form>
          <ComboboxDropdownMenu />
          <Tabs defaultValue="list" size="small">
            <TabsList>
              <TabsTrigger
                value="list"
                onClick={() => handleChangeView('list')}
              >
                <Menu />
              </TabsTrigger>
              <TabsTrigger
                value="kanban"
                onClick={() => handleChangeView('kanban')}
              >
                <LayoutGrid />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div>
        {view === 'list'
          ? (
          <ProductList
            products={products.slice(
              page * itemsPerPage,
              (page + 1) * itemsPerPage
            )}
          />
            )
          : (
          <ProductKanban
            products={products.slice(
              page * itemsPerPage,
              (page + 1) * itemsPerPage
            )}
          />
            )}
        {totalPages > 1 && (
          <Pagination className="flex justify-end mt-2">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={index === page}
                    onClick={(e) => {
                      e.preventDefault()
                      setPage(index)
                    }}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => setPage((prev) => prev + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  )
}
