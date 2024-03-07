import { create } from 'zustand'
import axios from 'axios'

import { PRODUCTS_ROOT } from '@/utils/config'
import { LIST } from '@/utils/querys'

export const useInventoryStore = create((set, get) => {
  return {
    products: [],
    product: {},
    view: 'list',
    productCount: 0,
    handleChangeView: (e) => set({ view: e.target.value }),
    openProduct: false,
    handleOpenProduct: async (id) => {
      const res = await axios.get(`${PRODUCTS_ROOT}/${id}`, LIST)
      set({ product: res.data, openProduct: true })
    },
    handleCancelProduct: () => set({ openProduct: false }),
    fetchProducts: async () => {
      const res = await axios.get(PRODUCTS_ROOT, LIST)
      console.log('res', res)
      const products = await res.data
      // create = await axios.post(PRODUCTS_ROOT, CREATE)
      // update = await axios.put(`${PRODUCTS_ROOT}/5`, UPDATE) el 5 es el id de el que se esta editando
      // delete = await axios.delete(`${PRODUCTS_ROOT}/5`)
      set({ products, productCount: products.length }, false, 'FETCH_PRODUCTS')
    },
    action: 'add',
    setAction: (action) => set({ action })
  }
})
