import { create } from 'zustand'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { persist, createJSONStorage } from 'zustand/middleware'
import {
  CLIENTS_ROOT,
  ORDER_ROOT,
  PAYMENT_METHODS_ROOT,
  PRODUCTS_ROOT
} from '@/util/config'

export const useOrderStore = create(
  persist(
    (set, get) => {
      const initialState = {
        ordersId: '1',
        ordersCount: '0',
        productsToOrder: [],
        selectedProduct: '',
        filteredProducts: [],
        price: '',
        quantity: '',
        discount: '0',
        subtotal: '',
        total: '',
        iva: '',
        balance: '',
        lasClosing: '',
        order: null,
        note: '',
        orders: [],
        client: null,
        clients: [],
        paymentMethod: 1,
        paymentMethods: [],
        selectedClient: null,
        openOrder: false,
        isValidate: false,
        isInvoiceVisible: false
      }

      const handlers = {
        handleSelectPaymentMethod: (value) => {
          set({ paymentMethod: value })
        },
        handleSelectClient: (value) => {
          set({ selectedClient: value })
        },
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
          } catch (error) {
            console.log('error', error)
          }
        },
        handleNoteChange: (value) => {
          set({ note: value })
        },
        handleNewOrder: async () => {
          try {
            get().handleAddOrder(get().order)
            get().createOrder()
          } catch (error) {
            console.log('Error creating new order')
          }
        },
        handleSaveOrder: async () => {
          const order = {
            code: get().order.code,
            note: get().order.note,
            status: get().order.status,
            user: get().order.user.id,
            client: get().selectedClient?.id,
            paymentMethod: get().paymentMethod,
            products: get().order.products
          }

          await axios
            .post(ORDER_ROOT, order)
            .then((res) => {
              console.log('res', res)
              get().handleDeleteOrder(get().order.id)
              get().handleNewOrder()
              get().fetchProductsToOrder()
              set({ isValidate: true })
              set({ client: null })
              set({ isInvoiceVisible: true })
            })
            .catch((err) => {
              console.log('Error saving order ' + err.message)
            })
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
            // agrega una nueva orden si no existe
            if (!get().order) {
              get().createOrder()
            }
            set((state) => {
              // Crear una copia de la orden actual
              const newOrder = JSON.parse(JSON.stringify(state.order))

              const productIndex = newOrder.products.findIndex(
                (product) => product.product === orderProduct.product
              )

              if (productIndex !== -1) {
                newOrder.products[productIndex].quantity += 1
              } else {
                newOrder.products.push(orderProduct)
              }

              return {
                order: newOrder
              }
            })
            get().subtotalOrder()
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
              status: '1',
              paymentMethod: '1',
              date: new Date().toISOString(),
              user: {
                id: 1,
                name: 'Manuel Perlera'
              },
              client: null,
              note: null,
              subtotal: 0,
              total: 0,
              products: []
            },
            ordersCount: (parseInt(get().ordersCount) + 1).toString()
          })
        },
        subtotalOrder: () => {
          const subtotal = get().order.products.reduce(
            (total, orderProduct) =>
              total +
              orderProduct.quantity *
                orderProduct.price *
                (1 - orderProduct.discount / 100),
            0
          )

          set({ subtotal })
        },
        totalOrder: () => {
          const total = parseFloat(
            Math.round(
              get().order.products.reduce(
                (total, orderProduct) =>
                  total +
                  orderProduct.quantity *
                    orderProduct.price *
                    (1 + orderProduct.iva / 100) *
                    (1 - orderProduct.discount / 100),
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
          get().subtotalOrder()
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
        },
        fetchPaymentMethods: async () => {
          const url = PAYMENT_METHODS_ROOT
          await axios
            .get(url)
            .then((res) => {
              const paymentMethods = res.data
              set(
                {
                  paymentMethods
                },
                false,
                'FETCH_PAYMENT_METHODS'
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
        setIsInvoiceVisible: (isInvoiceVisible) => set({ isInvoiceVisible }),
        setPrice: (price) => set({ price }),
        setQuantity: (quantity) => set({ quantity }),
        setDiscount: (discount) => set({ discount }),
        setSelectedProduct: (selectedProduct) => set({ selectedProduct }),
        setSelectedButton: (selectedButton) => set({ selectedButton }),
        setSelectedClient: (selectedClient) => set({ selectedClient }),
        setOpenOrder: (openOrder) => set({ openOrder })
      }
    },
    { name: 'order-store', storage: createJSONStorage(() => sessionStorage) }
  )
)
