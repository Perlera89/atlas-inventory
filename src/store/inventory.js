import { create } from 'zustand'
import axios from 'axios'
import { toast } from 'react-hot-toast'

import {
  AREAS_ROOT,
  BRANDS_ROOT,
  CATEGORIES_ROOT,
  PRODUCTS_ROOT,
  TAGS_ROOT
} from '@/util/config'
import trimStart from '@/util/trimStart'

export const useInventoryStore = create((set, get) => {
  const initialState = {
    allProducts: [],
    lastProducts: [],
    isLoading: true,
    products: [],
    productCount: 0,
    productOnSaleCount: 0,
    productStorableCount: 0,
    productServiceCount: 0,
    view: 'list',
    action: 'view',
    error: '',
    openResult: false,
    id: '',
    name: '',
    thumbnail: '',
    code: '',
    stock: '',
    onSale: true,
    price: '',
    cost: '',
    minimumPrice: '',
    minimumStock: '',
    iva: '',
    type: 1,
    category: '',
    categories: [],
    brand: '',
    brands: [],
    area: '',
    areas: [],
    tags: [],
    tagsCategory:
      get()?.tags.filter((tag) => tag.value === get().category) || [],
    selectedTags: [],
    safetyInfo: '',
    description: '',
    validationItems: {},
    validationValues: false
  }

  const productData = () => {
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
      tags,
      safetyInfo,
      description
    } = get()

    return {
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
      tags,
      safetyInfo,
      description
    }
  }

  const editHandler = async (state) => {
    set({ ...state, action: 'edit' })
    await get().handleValidation()
    console.log('productData()', productData())
  }

  const {
    products,
    allProducts,
    productCount,
    productOnSaleCount,
    action,
    ...initialStateWithoutProducts
  } = initialState

  const clearState = () => set(initialStateWithoutProducts)

  const handlers = {
    handleInputChange: (field, event, isTrim = false) => {
      const value = isTrim ? trimStart(event.target.value) : event.target.value
      editHandler({ [field]: value })
    },
    handleCategoryChange: (value) => {
      console.log('value', value)
      const tagsCategory = get().tags.filter(
        (tag) => tag.value === Number(value)
      )
      console.log('tagsCategory', tagsCategory)
      editHandler({ category: value, tagsCategory })
    },
    handleSelect: (field, value) => editHandler({ [field]: value }),
    handleChangeView: (value) => set({ view: value }),
    handleSaveProduct: async () => {
      const data = productData()
      if (get().id) {
        await axios
          .put(`${PRODUCTS_ROOT}/${get().id}`, data)
          .then((res) => {
            console.log(res)
            toast.success('Updated successfully')
          })
          .catch((err) => {
            get().handleError(err)
          })
      } else {
        await axios
          .post(PRODUCTS_ROOT, data)
          .then((res) => {
            toast.success('Created successfully')
          })
          .catch((err) => {
            console.log(err)
            get().handleError(err)
          })
      }
      get().fetchProducts()
      get().handleClearProduct()
    },
    handleDeleteProduct: async () => {
      console.log(get().id)
      await axios
        .put(`${PRODUCTS_ROOT}/${get().id}/delete`)
        .then(() => {
          toast.success('Deleted successfully')
        })
        .catch((err) => {
          get().handleError(err)
        })
      get().fetchProducts()
    },
    handleSearch: (value, field) => {
      set({
        [field]: value
      })
    },
    handleOpenResult: () => set({ openResult: true }),
    handleCloseResult: () => set({ openResult: false }),
    handleFilterByType: (type) => {
      const allProducts = get().allProducts
      switch (type) {
        case 'all':
          set({ products: allProducts })
          break
        case 'onSale':
          set((prevState) => ({
            products: allProducts.filter((product) => product.isOnSale)
          }))
          break
        default:
          break
      }
    },
    handleFilterByFilters: (filters) => {
      Object.entries(filters).map(([filterName, filterValues]) =>
        filterValues.length > 0
          ? set((prevState) => ({
            ...prevState,
            products: prevState.allProducts.filter((product) =>
              filterValues.some(
                (filter) => filter.id === product.productInfo[filterName]
              )
            )
          }))
          : set((prevState) => ({
            products: prevState.allProducts
          }))
      )
    },
    handleError: (err) => {
      set({ openResult: true, error: err })
    },
    handleValidation: () => {
      const {
        name,
        code,
        stock,
        price,
        cost,
        minimumPrice,
        minimumStock,
        iva,
        category,
        brand,
        area
      } = get()

      const validationItems = {
        name: name.length >= 3,
        code: Number(code) > 0,
        stock: Number(stock) > 0,
        price: Number(price) > 0,
        cost: Number(cost) > 0,
        minimumPrice:
          Number(minimumPrice) > 0 && Number(minimumPrice) > Number(cost),
        minimumStock: Number(minimumStock) > 0,
        iva: Number(iva) > 0 && Number(iva) <= 100,
        category: !!category,
        brand: !!brand,
        area: !!area
      }

      const validationValues = Object.values(validationItems).every(
        (value) => value
      )
      set({ validationItems, validationValues })
    },
    handleClearProduct: () => clearState()
  }

  const fetchFuctions = {
    fetchProducts: async () => {
      const url = PRODUCTS_ROOT
      await axios
        .get(url)
        .then((res) => {
          const allProducts = res.data.filter((product) => !product.isDeleted)
          set(
            {
              allProducts: allProducts.reverse(),
              products: allProducts,
              lastProducts: allProducts.reverse().slice(0, 10),
              productCount: allProducts.length,
              productOnSaleCount: allProducts.filter(
                (product) => product.isOnSale
              ).length
            },
            false,
            'FETCH_PRODUCTS'
          )
        })
        .catch((err) => {
          get().handleError(err)
        })
    },
    fetchProduct: async (id) => {
      await axios
        .get(`${PRODUCTS_ROOT}/${id}`)
        .then((res) => {
          const productData = res.data
          set({
            openProduct: true,
            id: productData.id,
            infoId: productData.productInfo.id,
            name: productData.productInfo.name,
            thumbnail: productData.productInfo.thumbnail,
            code: productData.code,
            stock: productData.stock,
            onSale: productData.isOnSale,
            price: productData.salePrice,
            cost: productData.purchasePrice,
            minimumPrice: productData.minimumPrice,
            minimumStock: productData.productInfo.minimumStock,
            iva: productData.iva,
            type: productData.productInfo.type.id,
            category: productData.productInfo.category.id,
            brand: productData.productInfo.brand.id,
            area: productData.productInfo.area.id,
            selectedTags: productData.productInfo.tagDetails.map((tag) => ({
              label: tag.tag.name,
              value: tag.tag.id
            })),
            safetyInfo: productData.productInfo.safetyInfo,
            description: productData.productInfo.description
          })
          console.log('get().selectedTags', get().selectedTags)
        })
        .catch((err) => {
          get().handleError(err)
        })
    },
    fetchBrands: async () => {
      await axios
        .get(BRANDS_ROOT)
        .then((res) => {
          const brands = res.data
          set({ brands }, false, 'FETCH_BRANDS')
        })
        .catch((err) => {
          get().handleError(err)
        })
    },
    fetchAreas: async () => {
      const res = await axios.get(AREAS_ROOT)
      const areas = await res.data
      set({ areas }, false, 'FETCH_AREAS')
    },
    fetchCategories: async () => {
      const res = await axios.get(CATEGORIES_ROOT)
      const categories = await res.data
      set({ categories }, false, 'FETCH_CATEGORIES')
    },
    fetchTags: async () => {
      const res = await axios.get(TAGS_ROOT)
      const tags = await res.data.map((tag) => ({
        label: tag.name,
        value: tag.id
      }))
      console.log('tags', tags)
      set({ tags }, false, 'FETCH_TAGS')
    }
  }

  return {
    ...initialState,
    ...handlers,
    ...fetchFuctions,
    setThumbnail: (thumbnail) => set({ thumbnail }),
    setOnSale: (onSale) => set({ onSale }),
    setError: (error) => set({ error }),
    setValidation: (validation) => set({ validation }),
    setIsLoading: (isLoading) => set({ isLoading }),
    setAction: (action) => set({ action })
  }
})
