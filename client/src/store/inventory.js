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
    openModal: false,
    handleOpenModal: () => set({ openModal: true }),
    handleCloseModal: () => set({ openModal: false }),
    openProduct: false,
    handleOpenProduct: (record) => set({ product: record, openProduct: true }),
    handleCancelProduct: () => set({ openProduct: false }),
    fetchProducts: async (viewType = get().view) => {
      const res =
        viewType === 'list'
          ? await axios.get(PRODUCTS_ROOT)
          : await axios.get(`${PRODUCTS_ROOT}`)
      const products = await res.data

      set({ products, productCount: products.length }, false, 'FETCH_PRODUCTS')
    }
  }
})
