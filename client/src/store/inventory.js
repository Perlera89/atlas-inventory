import { create } from 'zustand'
import axios from 'axios'

import { PRODUCTS_ROOT } from '@/utils/config'

export const useInventoryStore = create((set, get) => {
  return {
    products: [],
    product: {},
    view: 'list',
    productCount: 0,
    handleChangeView: (e) => set({ view: e.target.value }),
    openProduct: false,
    handleOpenProduct: (record) => set({ product: record, openProduct: true }),
    handleCancelProduct: () => set({ openProduct: false }),
    fetchProducts: async () => {
      const res = await axios.get(PRODUCTS_ROOT)
      const products = await res.data

      set({ products, productCount: products.length }, false, 'FETCH_PRODUCTS')
    },
    action: 'add',
    setAction: (action) => set({ action })
  }
})
