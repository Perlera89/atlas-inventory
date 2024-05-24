import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { AspectRatio } from '../ui/aspect-ratio'
import { ImagePlus, Upload } from 'lucide-react'
import { useImageStore } from '@/store/image'
import { useInventoryStore } from '@/store/inventory'

function App () {
  const setAcceptedFiles = useImageStore((state) => state.setAcceptedFiles)
  const thumbnail = useInventoryStore((state) => state.thumbnail)

  const onDrop = useCallback((acceptedFiles) => {
    setAcceptedFiles(acceptedFiles)
  }, [])
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop })

  return (
    <div>
      <>
        <AspectRatio {...getRootProps()}>
          <input {...getInputProps()} />
          {thumbnail && (
            <img
              alt="Product image"
              className="aspect-square w-full rounded-md object-cover hover:opacity-90 hover:cursor-pointer"
              height="300"
              src={thumbnail}
              width="300"
            />
          )}
          {acceptedFiles[0] && (
            <img
              alt="Product image"
              className="aspect-square w-full rounded-md object-cover hover:opacity-90 hover:cursor-pointer"
              height="300"
              src={URL.createObjectURL(acceptedFiles[0])}
              width="300"
            />
          )}

          {!acceptedFiles[0] &&
            !thumbnail &&
            (isDragActive
              ? (
              <div className="flex flex-col gap-2 aspect-square w-full items-center justify-center rounded-md border border-dashed">
                <ImagePlus className="h-4 w-4 text-foreground" />
                <span>Drap files here</span>
              </div>
                )
              : (
              <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                <Upload className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">Upload</span>
              </button>
                ))}
        </AspectRatio>
      </>
    </div>
  )
}

export default App
