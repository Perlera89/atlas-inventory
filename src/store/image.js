import { useState } from 'react'

export function useImagePreview () {
  const [imagesUrl, setImagesUrl] = useState()
  const [file, setfile] = useState(null)
  const [isDragging, setDragging] = useState(false)
  const handleDragLeave = () => { setDragging(false) }
  const handleDeletePreview = () => { generateImagePreview(null); setfile(null) }

  const generateImagePreview = (files) => {
    if (!files || files.length === 0) {
      setImagesUrl(undefined)
      return
    }
    const imagesPreview = URL.createObjectURL(files['0'])
    setImagesUrl(imagesPreview)
  }
  const handleFiles = (fileList) => {
    console.log('fileList', fileList['0'])
    if (
      !fileList ||
      !Array.from(fileList).every((file) => file.type.startsWith('image/png'))
    ) {
      generateImagePreview(null)
      return
    }
    generateImagePreview(fileList)
    setfile(fileList)
  }

  const handleChange = (event) => {
    event.preventDefault()
    if (event.target?.files) handleFiles(event.target.files)
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    setDragging(true)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setDragging(false)
    handleFiles(event.dataTransfer.files)
  }

  const handleUploadImage = async () => {
    if (file != null) {
      const fg = new FormData()
      fg.set('file', file['0'])
      fetch('/api/upload', {
        method: 'POST',
        body: fg
      })
      generateImagePreview(null)
      setfile(null)
      return
    }

    console.log('pos no hago nada washo')
  }

  return { imagesUrl, handleChange, handleDeletePreview, isDragging, handleDragLeave, handleDragOver, handleDrop, handleUploadImage }
}
