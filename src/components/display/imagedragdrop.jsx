'use client'
import { useImagePreview } from '@/store/image'
import { Eye, Trash2, ImagePlus } from 'lucide-react'

export function ImageSave ({ src }) {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    imagesUrl,
    handleChange,
    handleDeletePreview,
    isDragging,
    handleDragLeave,
    handleDragOver,
    handleDrop
  } = useImagePreview()

  return (
    <>
      {imagesUrl === undefined && src === '/placeholder.svg'
        ? (
        <div className="group/item w-full h-full flex items-center justify-center align-top flex-wrap relative">
          <label
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            htmlFor="imageChooser"
            className={` rounded-md p-1 flex-1 flex justify-center items-center ${
              isDragging
                ? 'text-gray-400 border-slate-800'
                : ' border-slate-800'
            }`}
          >
            <img
              src={src}
              alt=""
              className=" w-full h-full rounded-md relative shadow-2xl "
            />
            <ImagePlus className="invisible rounded-sm group-hover/item:visible text-white hover:text-[#3d3d3d] absolute" />
          </label>

          <input
            onChange={handleChange}
            className="hidden"
            id="imageChooser"
            type="file"
            accept="image/png"
            multiple
          />
        </div>
          )
        : (
        <div className="w-full h-full flex justify-center align-top flex-wrap gap-1 relative">
          <img
            src={imagesUrl}
            alt=""
            className="aspect-video w-80 rounded-md relative shadow-2xl "
          />

          <div className="group/item w-full h-full absolute opacity-50 content-center hover:bg-slate-400 items-center justify-center flex flex-row gap-7">
            <Eye className="invisible rounded-sm group-hover/item:visible text-neutral-600 hover:text-[#3d3d3d]" />
            <Trash2
              onClick={handleDeletePreview}
              className="invisible rounded-sm group-hover/item:visible  text-neutral-600 hover:text-[#3d3d3d] "
            />
          </div>
        </div>
          )}
    </>
  )
}
