import { useEffect, useState } from 'react'
import axios from 'axios'

import { PRODUCTS_ROOT } from '@/util/config'
import { useInventoryStore } from '@/store/inventory'

export function useProductsService () {
  const [products, setProducts] = useState([])
  const fetchProducts = useInventoryStore((state) => state.fetchProducts)

  useEffect(() => {
    fetchProducts()
  }, [])

  return { productsData: products }
}
