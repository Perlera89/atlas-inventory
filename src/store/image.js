import { create } from 'zustand'
import axios from 'axios'

export const useImageStore = create((set, get) => ({
  acceptedFiles: [],
  setAcceptedFiles: (files) => set({ acceptedFiles: files }),
  handleSubmit: async () => {
    // e.preventDefault()

    const formData = new FormData()
    formData.append('file', get().acceptedFiles[0])
    formData.append('upload_preset', 'llxhes8k')
    formData.append('api_key', '497174235592243')

    const res = await axios
      .post('https://api.cloudinary.com/v1_1/dn1mocdua/image/upload', formData)
      .then(() => {
        const data = res.data
        return data.secure_url
      })
      .catch((err) => console.log(err))
  }
}))
