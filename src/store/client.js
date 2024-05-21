import { create } from 'zustand'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { CLIENTS_ROOT, DEPARTMENTS_ROOT } from '@/util/config'

import trimStart from '@/util/trimStart'

export const useClientStore = create((set, get) => {
  const initialState = {
    clients: [],
    allClients: [],
    isLoading: true,
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
    openResult: false,
    validationItems: {},
    validationValues: false
  }

  const editHandler = async (state) => {
    set({ ...state, action: 'edit' })
    get().handleValidation()
  }

  const { clients, allClients, clientsCount, action, ...initialStateWithoutClients } =
    initialState

  const clearState = () => set(initialStateWithoutClients)

  const handlers = {
    handleInputChange: (field, event, isTrim = false) => {
      const value = isTrim ? trimStart(event.target.value) : event.target.value
      editHandler({ [field]: value })
    },
    handleSelectDeparment: (value) => {
      editHandler({ department: value })
      const districts = get().departments.find(
        (dep) => dep.id === value
      ).districts
      set({ districts })
    },
    handleSelectDistrict: (value) => {
      editHandler({ district: value })
      const cities = get().districts.find((dist) => dist.id === value).cities
      set({ cities })
    },
    handleSelectCity: (value) => {
      editHandler({ city: value })
    },
    handleClientSave: async () => {
      try {
        const data = {
          id: get().id,
          firstName: get().firstName,
          lastName: get().lastName,
          dui: get().dui,
          email: get().email,
          phone: get().phone,
          department: get().department,
          district: get().district,
          city: get().city,
          relevantInfo: get().relevantInfo
        }

        if (get().id) {
          await axios.put(`${CLIENTS_ROOT}/${get().id}`, data)
          toast.success('Updated successfully')
        } else {
          await axios.post(CLIENTS_ROOT, data)
          toast.success('Created successfully')
          set({ openResult: true })
        }
      } catch (error) {
        console.log('error', error)
        toast.error('Error creating client')
      }
      await get().handleClearClient()
      await get().fetchClients()
    },
    handleClientDelete: async () => {
      console.log(get().id)
      await axios
        .put(`${CLIENTS_ROOT}/${get().id}/delete`)
        .then(() => {
          toast.success('Deleted successfully')
        })
        .catch((err) => {
          get().handleError(err)
        })
      await get().handleClearClient()
      await get().fetchClients()
    },
    handleClearClient: () => clearState(),
    handleSearch: (value, field) => {
      set({
        [field]: value
      })
    },
    handleOpenResult: () => set({ openResult: true }),
    handleCloseResult: () => set({ openResult: false }),
    handleValidation: () => {
      const {
        firstName,
        lastName,
        dui,
        email,
        phone,
        department,
        district,
        city
      } = get()
      const validationItems = {
        firstName: firstName.length >= 3,
        lastName: lastName.length >= 3,
        dui: !!dui,
        email: !!email,
        phone: !!phone,
        department: !!department,
        district: !!district,
        city: !!city
      }
      const validationValues = Object.values(validationItems).every(
        (item) => item
      )
      set({ validationItems, validationValues })
    }
  }

  const fetchFunctions = {
    fetchClient: async (id) => {
      await axios
        .get(`${CLIENTS_ROOT}/${id}`)
        .then((response) => {
          const client = response.data
          set({
            id: client.id,
            firstName: client.firstName,
            lastName: client.lastName,
            dui: client.dui,
            email: client.email,
            phone: client.phone,
            department: client.address.department.id,
            district: client.address.district.id,
            districts: client.address.department.districts,
            city: client.address.city.id,
            cities: client.address.district.cities,
            relevantInfo: client.relevantInfo
          })
        })
        .catch((error) => {
          console.log('error', error)
        })
    },
    fetchClients: async () => {
      const clients = get().clients
      if (clients.length > 0) return
      else {
        await axios
          .get(CLIENTS_ROOT)
          .then((response) => {
            const allClients = response.data.filter(
              (client) => !client.isDeleted
            )
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
          })
          .catch((error) => {
            console.log('error', error)
          })
      }
    },
    fetchDepartments: async () => {
      await axios.get(DEPARTMENTS_ROOT).then((response) => {
        const departments = response.data
        set({ departments })
      })
    }
  }

  return {
    ...initialState,
    ...handlers,
    ...fetchFunctions,
    setError: (error) => set({ error }),
    setIsLoading: (isLoading) => set({ isLoading }),
    setValidation: (validation) => set({ validation }),
    setAction: (action) => set({ action })
  }
})
