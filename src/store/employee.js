import { create } from 'zustand'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import {
  DEPARTMENTS_ROOT,
  EMPLOYEES_ROOT,
  GENRES_ROOT,
  POSITIONS_ROOT
} from '@/util/config'

import trimStart from '@/util/trimStart'

export const useEmployeeStore = create((set, get) => {
  const initialState = {
    employees: [],
    allEmployees: [],
    isLoading: true,
    id: '',
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    dui: '',
    email: '',
    phone: '',
    genre: '',
    genres: [],
    salary: '',
    position: '',
    positions: [],
    city: '',
    cities: [],
    district: '',
    districts: [],
    department: '',
    departments: [],
    employeesCount: 0,
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

  const {
    employees,
    allEmployees,
    employeesCount,
    action,
    ...initialStateWithoutEmployees
  } = initialState

  const clearState = () => set(initialStateWithoutEmployees)

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
    handleSelect: (field, value) => editHandler({ [field]: value }),
    handleEmployeeSave: async () => {
      try {
        const data = {
          id: get().id,
          firstName: get().firstName,
          lastName: get().lastName,
          username: get().username,
          password: get().password,
          genre: get().genre,
          salary: get().salary,
          position: get().position,
          dui: get().dui,
          email: get().email,
          phone: get().phone,
          department: get().department,
          district: get().district,
          city: get().city
        }

        if (get().id) {
          await axios.put(`${EMPLOYEES_ROOT}/${get().id}`, data)
          await get().fetchEmployees()
          toast.success('Updated successfully')
        } else {
          await axios.post(EMPLOYEES_ROOT, data)
          toast.success('Created successfully')
          set({ openResult: true })
        }
      } catch (error) {
        console.log('error', error)
        toast.error('Error creating employee')
      }
      await get().handleClearEmployee()
      await get().fetchEmployees()
    },
    handleEmployeeDelete: async () => {
      console.log(get().id)
      await axios
        .put(`${EMPLOYEES_ROOT}/${get().id}/delete`)
        .then(() => {
          toast.success('Deleted successfully')
        })
        .catch((err) => {
          get().handleError(err)
        })
      await get().handleClearEmployee()
      await get().fetchEmployees()
    },
    handleClearEmployee: () => clearState(),
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
        genre,
        salary,
        position,
        department,
        district,
        city
      } = get()
      const validationItems = {
        firstName: firstName?.length >= 3,
        lastName: lastName?.length >= 3,
        dui: !!dui,
        email: !!email,
        phone: !!phone,
        genre: !!genre,
        salary: !!salary,
        position: !!position,
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
    fetchEmployee: async (id) => {
      await axios
        .get(`${EMPLOYEES_ROOT}/${id}`)
        .then((response) => {
          const employee = response.data
          console.log('employee', employee)
          set(
            {
              id: employee.id,
              firstName: employee.firstName,
              lastName: employee.lastName,
              username: employee?.user?.username,
              dui: employee.dui,
              email: employee.email,
              phone: employee.phone,
              genre: employee.genre.id,
              salary: employee.salary,
              position: employee.position.id,
              department: employee.address.department.id,
              district: employee.address.district.id,
              districts: employee.address.department.districts,
              city: employee.address.city.id,
              cities: employee.address.district.cities
            },
            false,
            'FETCH_EMPLOYEE'
          )
        })
        .catch((error) => {
          console.log('error', error)
        })
    },
    fetchEmployees: async () => {
      const employees = get().employees
      if (employees.length > 0) return
      await axios
        .get(EMPLOYEES_ROOT)
        .then((response) => {
          const allEmployees = response.data.filter(
            (employee) => !employee.isDeleted
          )
          console.log('allEmployees', allEmployees)
          set(
            {
              allEmployees,
              employees: allEmployees,
              employeesCount: allEmployees.length
            },
            false,
            'FETCH_EMPLOYEES'
          )
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
    },
    fetchGenres: async () => {
      await axios.get(GENRES_ROOT).then((response) => {
        const genres = response.data
        set({ genres })
      })
    },
    fetchPositions: async () => {
      await axios.get(POSITIONS_ROOT).then((response) => {
        const positions = response.data
        set({ positions })
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
