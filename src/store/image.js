import { create } from 'zustand'

export const useImageStore = create((set, get) => ({
  imagesUrl: '',
  file: null,
  isDragging: false,
  handleDragLeave: () => set({ isDragging: false }),
  handleDeletePreview: () => {
    set({ imagesUrl: null, file: null })
  },
  generateImagePreview: (files) => {
    console.log('files', files)
    if (!files || files.length === 0) {
      set({ imagesUrl: null })
      return
    }
    const imagesPreview = URL.createObjectURL(files[0])

    set({ imagesUrl: imagesPreview })
  },
  handleFiles: (fileList) => {
    console.log('event.dataTransfer.file', fileList[0])
    if (
      !fileList ||
      !Array.from(fileList).every((file) => file.type.startsWith('image/'))
    ) {
      set({ generateImagePreview: null })
      return
    }

    set({ generateImagePreview: fileList, file: fileList })
  },
  handleChange: (event) => {
    event.preventDefault()
    if (event.target?.files) {
      set((state) => state.handleFiles(event.target.files))
    }
  },
  handleDragOver: (event) => {
    event.preventDefault()
    set({ isDragging: true })
  },
  handleDrop: (event) => {
    event.preventDefault()
    set({ isDragging: false })
    set((state) => state.handleFiles(event.dataTransfer.files))
  },
  handleUploadImage: async () => {
    set((state) => {
      if (state.file != null) {
        const fg = new FormData()
        fg.set('file', state.file[0])
        fetch('/api/upload', {
          method: 'POST',
          body: fg
        })
        set({ imagesUrl: null, file: null })
        return
      }
      console.log('pos no hago nada washo')
    })
  }
}))
