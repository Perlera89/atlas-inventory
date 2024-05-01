import { create } from 'zustand'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { CLIENTS_ROOT, DEPARTMENTS_ROOT } from '@/util/config'

import trimStart from '@/util/trimStart'

export const useClientStore = create((set, get) => {
  const initialState = {
    clients: [],
    allClients: [],
    id: '',
    firstName: '',
    lastName: '',
    dui: '',
    email: '',
    phone: '',
    city: '',
    cities: [],
    district: '',
    districts: [],
    department: '',
    departments: [],
    relevantInfo: '',
    clientsCount: 0,
    action: 'view',
    error: '',
    openResult: false
  }

  const editHandler = async (state) => {
    set({ ...state, action: 'edit' })
    // await get().handleValidation()
  }

  const { clients, allClients, action, ...initialStateWithoutProducts } = initialState

  const clearState = () => set(initialStateWithoutProducts)

  const handlers = {
    handleInputChange: (field, event, isTrim = false) => {
      get().handleValidation()
      const value = isTrim ? trimStart(event.target.value) : event.target.value
      editHandler({ [field]: value })
    },
    handleSelect: (field, value) => editHandler({ [field]: value }),
    handleClientSave: async () => {
      try {
        const response = await axios.post(CLIENTS_ROOT, {
          firstName: get().firstName,
          lastName: get().lastName,
          dui: get().dui,
          email: get().email,
          phone: get().phone,
          address: get().address,
          relevantInfo: get().relevantInfo
        })
        console.log('response', response.data)
        set({ openResult: true })
      } catch (error) {
        toast.error('Error creating client')
      }
    },
    handleClientUpdate: async () => {
      try {
        const response = await axios.put(`${CLIENTS_ROOT}/${get().id}`, {
          firstName: get().firstName,
          lastName: get().lastName,
          dui: get().dui,
          email: get().email,
          phone: get().phone,
          address: get().address,
          relevantInfo: get().relevantInfo
        })
        console.log('response', response.data)
        set({ openResult: true })
      } catch (error) {
        toast.error('Error updating client')
      }
    },
    handleClientDelete: async () => {
      try {
        const response = await axios.delete(`${CLIENTS_ROOT}/${get().id}`)
        console.log('response', response.data)
        set({ openResult: true })
      } catch (error) {
        toast.error('Error deleting client')
      }
    },
    handleClearClient: () => clearState(),
    handleSearch: (value, field) => {
      set({
        [field]: value
      })
    },
    handleOpenResult: () => set({ openResult: true }),
    handleCloseResult: () => set({ openResult: false })
  }

  const fetchFunctions = {
    fetchClients: async () => {
      try {
        const response = await axios.get(CLIENTS_ROOT)
        console.log('response', response.data)
        const allClients = response.data.filter((client) => !client.isDeleted)
        set({
          allClients,
          clients: allClients,
          clientsCount: allClients.length,
          id: allClients.id,
          firstName: allClients.firstName,
          lastName: allClients.lastName,
          dui: allClients.dui,
          email: allClients.email,
          phone: allClients.phone,
          department: allClients?.address?.department.id,
          district: allClients?.address?.district.id,
          city: allClients?.address?.city.id,
          relevantInfo: allClients.relevantInfo
        })
      } catch (error) {
        console.log('error', error)
      }
    },
    fetchDepartments: async () => {
      const response = await axios.get(DEPARTMENTS_ROOT)
      console.log('clients', response.data)
      const departments = await response.data
      set({ departments })
    }
  }

  return {
    ...initialState,
    ...handlers,
    ...fetchFunctions,
    setError: (error) => set({ error }),
    setValidation: (validation) => set({ validation }),
    setAction: (action) => set({ action })
  }
})
