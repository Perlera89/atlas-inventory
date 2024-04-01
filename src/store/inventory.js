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
  const editHandler = async (state) => {
    set({ ...state, action: 'edit' })
    await get().handleValidation()
  }

  const initialState = {
    allProducts: [],
    products: [],
    productCount: 0,
    productOnSaleCount: 0,
    productStorableCount: 0,
    productServiceCount: 0,
    view: 'list',
    action: 'view',
    error: '',
    openResult: false,
    openProduct: false,
    id: null,
    name: '',
    thumbnail: '/placeholder.svg',
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
    selectedTags: '',
    safetyInfo: '',
    description: '',
    validationItems: {},
    validationValues: false
  }

  const { products, action, ...initialStateWithoutProducts } = initialState

  const clearState = () => set(initialStateWithoutProducts)

  const handlers = {
    handleInputChange: (field, event, isTrim = false) => {
      get().handleValidation()
      const value = isTrim ? trimStart(event.target.value) : event.target.value
      editHandler({ [field]: value })
    },
    handleCategoryChange: (value) => {
      const tagsCategory = get().tags.filter((tag) => tag.categoryId === value)
      editHandler({ category: value, tagsCategory })
    },
    handleSelect: (field, value) => editHandler({ [field]: value }),
    handleChangeView: (value) => set({ view: value }),
    handleOpenProduct: async (id) => {
      set({ openProduct: true })
      get().fetchCategories()
      get().fetchBrands()
      get().fetchAreas()
      get().fetchTags()
      if (id) {
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
              iva: productData.iva * 100,
              type: productData.productInfo.type.id,
              category: productData.productInfo.category.id,
              brand: productData.productInfo.brand.id,
              area: productData.productInfo.area.id,
              selectedTags: productData.productInfo.tagDetails.map(
                (tagDetail) => tagDetail.tag.id
              ),
              safetyInfo: productData.productInfo.safetyInfo,
              description: productData.productInfo.description
            })
          })
          .catch((err) => {
            get().handleError(err)
          })
      } else {
        set({ openProduct: true })
        clearState()
        get().fetchProducts()
      }
    },
    handleCloseProduct: () => {
      set({ openProduct: false })
    },
    handleSaveProduct: async () => {
      if (get().id) {
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
          tagDetails: selectedTags.map((tag) => ({ tag })),
          safetyInfo,
          description
        }
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
          tags,
          safetyInfo,
          description
        }
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
      get().handleCloseProduct()
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
      get().handleCloseProduct()
    },
    handleSearchProduct: (products) => {
      set({
        products
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
              filterValues.some((filter) => filter.id === product.productInfo[filterName])
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
    fetchSelects: async () => {
      await get().fetchAreas()
      await get().fetchBrands()
      await get().fetchCategories()
      await get().fetchTags()
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
        minimumPrice: Number(minimumPrice) > 0,
        minimumStock: Number(minimumStock) > 0,
        iva: Number(iva) > 0,
        category: !!category,
        brand: !!brand,
        area: !!area
      }

      const validationValues = Object.values(validationItems).every(value => value)
      set({ validationItems, validationValues })
    }
  }

  const fetchFuctions = {
    fetchProducts: async () => {
      await axios
        .get(PRODUCTS_ROOT)
        .then((res) => {
          const allProducts = res.data.filter((product) => !product.isDeleted)
          set(
            {
              allProducts,
              products: allProducts,
              productCount: allProducts.length,
              productOnSaleCount: allProducts.filter(
                (product) => product.isOnSale
              ).length
            },
            false,
            'FETCH_PRODUCTS'
          )
          console.log('products', allProducts)
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
      const tags = await res.data
        .filter((tag) => tag.categoryId === get().category)
        .map((tag) => ({
          value: tag.id,
          label: tag.name
        }))
      set({ tags }, false, 'FETCH_TAGS')
    }
  }
  return {
    ...initialState,
    ...handlers,
    ...fetchFuctions,
    setOnSale: (onSale) => set({ onSale }),
    setError: (error) => set({ error }),
    setValidation: (validation) => set({ validation }),
    setAction: (action) => set({ action })
  }
})
