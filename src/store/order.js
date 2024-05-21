import { create } from 'zustand'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { persist, createJSONStorage } from 'zustand/middleware'
import { CLIENTS_ROOT, PRODUCTS_ROOT } from '@/util/config'

export const useOrderStore = create(
  persist(
    (set, get) => {
      const initialState = {
        ordersId: '1',
        ordersCount: '0',
        productsToOrder: [],
        selectedProduct: '',
        filteredProducts: [],
        price: 0,
        quantity: 0,
        discount: 0,
        total: 0,
        iva: 0,
        balance: 0,
        lasClosing: '',
        order: null,
        orders: [],
        clients: [],
        selectedClient: null
      }

      const handlers = {
        handleAddOrder: async (order) => {
          try {
            set((state) => ({
              orders: [
                ...state.orders,
                {
                  ...order,
                  total: get().total
                }
              ]
            }))
            toast.success('Order added')
          } catch (error) {
            toast.error('Error adding order')
          }
        },
        handleNewOrder: async () => {
          try {
            get().handleAddOrder(get().order)
            get().createOrder()
            toast.success('New order created')
          } catch (error) {
            toast.error('Error creating new order')
          }
        },
        handleDeleteOrder: async (orderId) => {
          try {
            set((state) => ({
              orders: state.orders.filter((order) => order.id !== orderId)
            }))
            toast.success('Order deleted')
          } catch (error) {
            toast.error('Error deleting order')
          }
        },
        handleAddProductToOrder: async (orderProduct) => {
          try {
            if (!get().order) {
              get().createOrder()
            }
            set((state) => {
              const productIndex = state.order.products.findIndex(
                (product) => product.id === orderProduct.id
              )

              if (productIndex !== -1) {
                // Convierte la cantidad a un número antes de sumarla
                state.order.products[productIndex].quantity = String(
                  Number(state.order.products[productIndex].quantity) + 1
                )
              } else {
                // Convierte la cantidad a un número antes de agregar el producto
                state.order.products.push(orderProduct)
              }

              return {
                order: {
                  ...state.order,
                  products: [...state.order.products]
                }
              }
            })
            get().totalOrder()
            get().totalIva()
          } catch (error) {
            toast.error('Error adding product to order')
          }
        },
        handleDeleteProductToOrder: async (orderProductId) => {
          try {
            set((state) => ({
              order: {
                ...state.order,
                products: state.order.products.filter(
                  (orderProduct) => orderProduct.id !== orderProductId
                )
              }
            }))
            toast.success('Product deleted from order')
          } catch (error) {
            toast.error('Error deleting product from order')
          }
        },
        handleSearch: (value, field) => {
          set({
            [field]: value
          })
        }
      }

      const functions = {
        createOrder: () => {
          set({
            order: {
              code:
                'ORD-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
              date: new Date().toISOString().slice(0, 10),
              status: 'pending',
              total: 0,
              products: []
            },
            ordersCount: (parseInt(get().ordersCount) + 1).toString()
          })
        },
        totalOrder: () => {
          const total = parseFloat(
            Math.round(
              get().order.products.reduce(
                (total, orderProduct) =>
                  total +
                  orderProduct.quantity *
                    orderProduct.price *
                    (1 + orderProduct.iva / 100),
                0
              ) * 100
            ) / (100).toFixed(2)
          )

          set({ total })
        },
        totalIva: () => {
          const iva = get()
            .order.products.reduce(
              (total, orderProduct) =>
                total +
                orderProduct.quantity *
                  orderProduct.price *
                  (orderProduct.iva / 100),
              0
            )
            .toFixed(2)

          set({ iva })
        },
        updateProduct: () => {
          set((state) => {
            const productIndex = state.order.products.findIndex(
              (product) => product.id === state.selectedProduct.id
            )

            if (productIndex !== -1) {
              state.order.products[productIndex] = {
                ...state.selectedProduct,
                name: state.selectedProduct.name,
                price: state.price,
                quantity: state.quantity,
                discount: state.discount
              }
            }

            return {
              order: {
                ...state.order,
                products: [...state.order.products]
              }
            }
          })
          get().totalOrder()
          get().totalIva()
        }
      }

      const fetchs = {
        fetchProductsToOrder: async () => {
          const url = PRODUCTS_ROOT
          await axios
            .get(url)
            .then((res) => {
              const productsToOrder = res.data.filter(
                (product) => !product.isDeleted
              )
              set(
                {
                  productsToOrder,
                  filteredProducts: productsToOrder
                },
                false,
                'FETCH_PRODUCTS'
              )
            })
            .catch((err) => {
              console.log('err', err)
            })
        },
        fetchClients: async () => {
          const url = CLIENTS_ROOT
          await axios
            .get(url)
            .then((res) => {
              const clients = res.data
                .filter((client) => !client.isDeleted)
                .map((client) => ({
                  id: client.id,
                  name: client.firstName + ' ' + client.lastName
                }))
              console.log('clients', clients)
              set(
                {
                  clients
                },
                false,
                'FETCH_CLIENTS'
              )
            })
            .catch((err) => {
              console.log('err', err)
            })
        }
      }

      return {
        ...initialState,
        ...handlers,
        ...functions,
        ...fetchs,
        setOrder: (order) => set({ order }),
        setPrice: (price) => set({ price }),
        setQuantity: (quantity) => set({ quantity }),
        setDiscount: (discount) => set({ discount }),
        setSelectedProduct: (selectedProduct) => set({ selectedProduct }),
        setSelectedButton: (selectedButton) => set({ selectedButton }),
        setSelectedClient: (selectedClient) => set({ selectedClient })
      }
    },
    { name: 'order-store', storage: createJSONStorage(() => sessionStorage) }
  )
)
