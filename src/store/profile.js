import { create } from 'zustand'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { PROFILE_ROOT, DEPARTMENTS_ROOT } from '@/util/config'

import trimStart from '@/util/trimStart'

export const useProfileStore = create((set, get) => {
  const initialState = {
    id: '',
    thumbnail: '',
    name: '',
    nrc: '',
    email: '',
    phone: '',
    city: '',
    cities: [],
    district: '',
    districts: [],
    department: '',
    departments: [],
    description: '',
    profile: {},
    action: 'view',
    validationItems: {},
    validationValues: false,
    idDeleted: true
  }

  const editHandler = async (state) => {
    set({ ...state, action: 'edit' })
    get().handleValidation()
  }

  const { action, ...initialStateWithoutProfiles } = initialState

  const clearState = () => set(initialStateWithoutProfiles)

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
    handleProfileSave: async () => {
      try {
        const data = {
          id: get().id,
          thumbnail: get().thumbnail,
          name: get().name,
          nrc: get().nrc,
          email: get().email,
          phone: get().phone,
          department: get().department,
          district: get().district,
          city: get().city,
          description: get().description
        }

        console.log('data', data)

        if (get().id) {
          await axios.put(PROFILE_ROOT, data)
          toast.success('Updated successfully')
        } else {
          const { id, ...insertData } = data
          await axios.post(PROFILE_ROOT, insertData)
          toast.success('Created successfully')
        }
      } catch (error) {
        console.log('error', error)
        toast.error('Error creating profile')
      }
      await get().handleClearProfile()
      await get().fetchProfile()
    },
    handleClearProfile: () => clearState(),
    handleValidation: () => {
      const { name, email, phone, department, district, city } = get()
      const validationItems = {
        name: name?.length >= 3,
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
    fetchProfile: async () => {
      await axios
        .get(PROFILE_ROOT)
        .then((response) => {
          const profile = response.data
          set({
            id: profile.id,
            thumbnail: profile.thumbnail,
            name: profile.name,
            nrc: profile.nrc,
            email: profile.email,
            phone: profile.phone,
            department: profile.address.department.id,
            district: profile.address.district.id,
            districts: profile.address.department.districts,
            city: profile.address.city.id,
            cities: profile.address.district.cities,
            description: profile.description,
            profile,
            idDeleted: profile.isDeleted
          })
        })
        .catch((error) => {
          console.log('error', error)
        })
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
    setThumbnail: (thumbnail) => set({ thumbnail }),
    setValidation: (validation) => set({ validation }),
    setAction: (action) => set({ action })
  }
})
