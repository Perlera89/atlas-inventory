import { useImageStore } from '@/store/image'
import { Trash2, ImagePlus } from 'lucide-react'

const ImageChooser = ({
  src,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleChange,
  isDragging
}) => (
  <div className="group/item w-full h-full flex items-center justify-center align-top flex-wrap relative">
    <label
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      htmlFor="imageChooser"
      className={`rounded-md p-1 flex-1 flex justify-center items-center ${
        isDragging ? 'text-gray-400 border-slate-800' : 'border-slate-800'
      }`}
    >
      <img
        src={src}
        alt=""
        className="w-96 rounded-md relative hover:opacity-90 transition-colors cursor-pointer"
      />
      <ImagePlus size={32} className="invisible rounded-full group-hover/item:visible bg-secondary text-primary p-2 absolute" />
    </label>
    <input
      onChange={handleChange}
      className="hidden"
      id="imageChooser"
      type="file"
      accept="images/"
      multiple
    />
  </div>
)

const ImagePreview = ({ src, handleDeletePreview }) => (
  <div className="w-full h-full cursor-pointer flex justify-center align-top flex-wrap gap-1 relative bg-transparent hover:opacity-90 hover:transition-transform">
    <img
      src={src}
      alt=""
      className="w-96 rounded-md border relative transition-colors cursor-pointer"
    />
    <div className="group/item w-full h-full absolute content-center items-center justify-center flex flex-row gap-7">
      <Trash2
        size={32}
        onClick={handleDeletePreview}
        className="invisible group-hover/item:visible bg-secondary text-primary absolut rounded-full p-2"
      />
    </div>
  </div>
)

export function ImageSave ({ src }) {
  const imagesUrl = useImageStore((state) => state.imagesUrl)
  const handleChange = useImageStore((state) => state.handleChange)
  const handleDeletePreview = useImageStore(
    (state) => state.handleDeletePreview
  )
  const isDragging = useImageStore((state) => state.isDragging)
  const handleDragLeave = useImageStore((state) => state.handleDragLeave)
  const handleDragOver = useImageStore((state) => state.handleDragOver)
  const handleDrop = useImageStore((state) => state.handleDrop)

  return (
    <>
      {imagesUrl === null && src === '/placeholder.svg'
        ? (
        <ImageChooser
          src={src}
          handleDragOver={handleDragOver}
          handleDragLeave={handleDragLeave}
          handleDrop={handleDrop}
          handleChange={handleChange}
          isDragging={isDragging}
        />
          )
        : (
        <ImagePreview
          src={imagesUrl || src}
          handleDeletePreview={handleDeletePreview}
        />
          )}
    </>
  )
}
