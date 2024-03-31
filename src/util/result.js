import ResultItem from '@/components/display/result'
import { useInventoryStore } from '@/store/inventory'

export default function Result () {
  const error = useInventoryStore((state) => state.error)
  const openResult = useInventoryStore((state) => state.openResult)
  const handleCloseResult = useInventoryStore(
    (state) => state.handleCloseResult
  )

  return (
    <ResultItem
      title={error ? error?.request?.statusText : null}
      subtitle={error ? error?.message : null}
      error={error ? error?.stack : null}
      open={openResult}
      handleClose={handleCloseResult}
    />
  )
}
