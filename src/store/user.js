import { create } from 'zustand'
import axios from 'axios'
import { AUTH_ROOT } from '@/util/config'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useUserStore = create(
  persist(
    (set, get) => {
      const initialState = {
        username: '',
        email: '',
        role: ''
      }

      const fetchFunctions = {
        fetchUser: async (email) => {
          await axios
            .get(`${AUTH_ROOT}/${email}`)
            .then((response) => {
              const user = response.data
              set({
                username: user.username,
                email: user.email,
                role: user.role
              })
            })
            .catch((error) => {
              console.error(error)
            })
        }
      }

      return {
        ...initialState,
        ...fetchFunctions
      }
    },

    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
