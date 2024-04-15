import { create } from 'zustand'

export const useImageStore = create((set, get) => ({
  acceptedFiles: [],
  setAcceptedFiles: (files) => set({ acceptedFiles: files }),
  handleSubmit: async () => {
    // e.preventDefault()

    const formData = new FormData()
    formData.append('file', get().acceptedFiles[0])
    formData.append('upload_preset', 'llxhes8k')
    formData.append('api_key', '497174235592243')

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dn1mocdua/image/upload',
      {
        method: 'POST',
        body: formData
      }
    )
    const data = await res.json()
    return data.secure_url
  }
}))
