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
  const editHandler = (state) => {
    set({ ...state, action: 'edit' })
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
    thumbnail: '/fallback.png',
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
    selectedTags: [],
    safetyInfo: '',
    description: '',
    validation: false,
    allFieldsValidated: false
  }

  const { products, action, ...initialStateWithoutProducts } = initialState

  const clearState = () => set(initialStateWithoutProducts)

  const handlers = {
    handleNameChange: (e) => {
      editHandler({
        name: trimStart(e.target.value)
      })
    },
    handleCodeChange: (e) => {
      editHandler({
        code: e.target.value
      })
    },
    handleStockChange: (value) => editHandler({ stock: value }),
    handleOnSaleChange: (e) => editHandler({ onSale: e.target.checked }),
    handlePriceChange: (value) =>
      editHandler({ price: value, validation: { price: value > 0 } }),
    handleCostChange: (value) => editHandler({ cost: value }),
    handleMinimumPriceChange: (value) => editHandler({ minimumPrice: value }),
    handleMinimumStockChange: (value) => editHandler({ minimumStock: value }),
    handleIvaChange: (value) => editHandler({ iva: value }),
    handleTypeChange: (value) => editHandler({ type: value }),
    handleCategoryChange: (value) =>
      editHandler({
        category: value,
        tagsCategory: get().tags.filter((tag) => tag.categoryId === value)
      }),
    handleBrandChange: (value) => editHandler({ brand: value }),
    handleAreaChange: (value) => editHandler({ area: value }),
    handleTagsChange: (value) => editHandler({ selectedTags: value }),
    handleSafetyInfoChange: (e) =>
      editHandler({ safetyInfo: trimStart(e.target.value) }),
    handleDescriptionChange: (e) =>
      editHandler({ description: trimStart(e.target.value) }),
    handleChangeView: (e) => set({ view: e.target.value }),
    handleOpenProduct: async (id) => {
      get().fetchBrands()
      get().fetchCategories()
      get().fetchAreas()
      get().fetchTags()
      if (!id) {
        clearState()
        get().fetchProducts()
        set({ openProduct: true })
      } else {
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
            get().setError(err)
            get().handleOpenResult()
          })
      }
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
            get().setError(err)
            get().handleOpenResult()
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
          .then(() => {
            toast.success('Created successfully')
          })
          .catch((err) => {
            get().setError(err)
            get().handleOpenResult()
          })
      }
      get().fetchProducts()
      get().handleCancelProduct()
    },
    handleDeleteProduct: async () => {
      await axios
        .put(`${PRODUCTS_ROOT}/${get().id}/delete`)
        .then(() => {
          toast.success('Deleted successfully')
        })
        .catch((err) => {
          get().setError(err)
          get().handleOpenResult()
        })
      get().fetchProducts()
      get().handleCancelProduct()
    },
    handleCancelProduct: () => set({ openProduct: false }),
    handleOpenResult: () => set({ openResult: true }),
    handleCloseResult: () => set({ openResult: false }),
    handleFilterByType: (type) => {
      const allProducts = get().allProducts
      switch (type) {
        case 'all':
          set({ products: allProducts })
          break
        case 'onSale':
          set({
            products: allProducts.filter((product) => product.isOnSale)
          })
          break
        default:
          break
      }
    }
  }

  const fetchFuctions = {
    fetchProducts: async () => {
      await axios
        .get(PRODUCTS_ROOT)
        .then((res) => {
          const allProducts = res.data.filter(
            (product) => product.isDeleted === false
          )
          set(
            {
              allProducts,
              products: allProducts,
              productCount: allProducts.length,
              productOnSaleCount: allProducts.filter((product) => product.onSale)
                .length
            },
            false,
            'FETCH_PRODUCTS'
          )
          console.log('products', allProducts)
        })
        .catch((err) => {
          get().setError(err)
          get().handleOpenResult()
        })
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
    setAction: (action) => set({ action })
  }
})
