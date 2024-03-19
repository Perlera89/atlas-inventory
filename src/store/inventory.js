import { create } from 'zustand'
import axios from 'axios'

import {
  AREAS_ROOT,
  BRANDS_ROOT,
  CATEGORIES_ROOT,
  PRODUCTS_ROOT,
  TAGS_ROOT
} from '@/util/config'

const initialState = {
  products: [],
  product: {},
  productCount: 0,
  openProduct: false,
  view: 'list',
  action: 'view',
  name: '',
  thumbnail:
    'https://americacentral.es/wp-content/uploads/2022/06/quesitos-diana-500p.png',
  code: '',
  stock: null,
  onSale: true,
  price: null,
  cost: null,
  minimumPrice: null,
  minimumStock: null,
  iva: null,
  type: 1,
  category: null,
  categories: [],
  brand: null,
  brands: [],
  area: null,
  areas: [],
  tags: [],
  tagsCategory: [],
  selectedTags: [],
  safetyInfo: '',
  description: ''
}

export const useInventoryStore = create((set, get) => {
  return {
    ...initialState,
    setOnSale: (onSale) => set({ onSale }),
    setAction: (action) => set({ action }),
    handleNameChange: (e) => set({ name: e.target.value }),
    handleCodeChange: (e) => set({ code: e.target.value }),
    handleStockChange: (value) => set({ stock: value }),
    handleOnSaleChange: (e) => set({ onSale: e.target.checked }),
    handlePriceChange: (value) => set({ price: value }),
    handleCostChange: (value) => set({ cost: value }),
    handleMinimumPriceChange: (value) => set({ minimumPrice: value }),
    handleMinimumStockChange: (value) => set({ minimumStock: value }),
    handleIvaChange: (value) => set({ iva: value }),
    handleTypeChange: (value) => set({ type: value }),
    handleCategoryChange: (value) =>
      set({
        category: value,
        tagsCategory: get().tags.filter((tag) => tag.categoryId === value)
      }),
    handleBrandChange: (value) => set({ brand: value }),
    handleAreaChange: (value) => set({ area: value }),
    handleTagsChange: (value) => set({ selectedTags: value }),
    handleSafetyInfoChange: (e) => set({ safetyInfo: e.target.value }),
    handleDescriptionChange: (e) => set({ description: e.target.value }),
    handleChangeView: (e) => set({ view: e.target.value }),
    handleOpenProduct: async (id) => {
      if (!id) return set({ openProduct: true, product: {} })
      const res = await axios.get(`${PRODUCTS_ROOT}/${id}`)
      const productData = res.data
      set({
        product: productData,
        stock: productData.stock,
        openProduct: true
      })
    },
    handleSaveProduct: async () => {
      const {
        name,
        code,
        stock,
        onSale,
        thumbnail,
        price,
        cost,
        minimumPrice,
        minimumStock,
        iva,
        type,
        category,
        brand,
        area,
        selectedTags,
        safetyInfo,
        description
      } = get()
      const data = {
        name,
        code,
        stock,
        onSale,
        thumbnail,
        salePrice: price,
        purchasePrice: cost,
        minimumPrice,
        minimumStock,
        iva,
        type,
        category,
        brand,
        area,
        tags: selectedTags,
        safetyInfo,
        description
      }
      await axios.post(PRODUCTS_ROOT, data)
      get().fetchProducts()
      get().handleCancelProduct()
      console.log('POST', data)
    },
    handleDeleteProduct: async () => {
      await axios.delete(`${PRODUCTS_ROOT}/${get().product.id}`)
      set({ openProduct: false })
    },
    handleCancelProduct: () => set({ openProduct: false }),
    fetchProducts: async () => {
      const res = await axios.get(PRODUCTS_ROOT)
      const products = await res.data
      set({ products, productCount: products.length }, false, 'FETCH_PRODUCTS')
    },
    fetchBrands: async () => {
      const res = await axios.get(BRANDS_ROOT)
      const brands = await res.data.map((brand) => ({
        value: brand.id,
        label: brand.name
      }))
      set({ brands }, false, 'FETCH_BRANDS')
    },
    fetchAreas: async () => {
      const res = await axios.get(AREAS_ROOT)
      const areas = await res.data.map((area) => ({
        value: area.id,
        label: area.name
      }))
      set({ areas }, false, 'FETCH_AREAS')
    },
    fetchCategories: async () => {
      const res = await axios.get(CATEGORIES_ROOT)
      const categories = await res.data.map((category) => ({
        value: category.id,
        label: category.name
      }))
      set({ categories }, false, 'FETCH_CATEGORIES')
    },
    fetchTags: async () => {
      const res = await axios.get(TAGS_ROOT)
      const tags = await res.data.map((tag) => ({
        value: tag.id,
        label: tag.name,
        categoryId: tag.categoryId
      }))
      set({ tags }, false, 'FETCH_TAGS')
    }
  }
})
