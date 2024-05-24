'use client'

import ClientPage from '@/components/clients/client'
import { useParams } from 'next/navigation'

export default function AddClientPage () {
  const { clientId } = useParams()
  return (
    <>
      <ClientPage clientId={clientId} />
    </>
  )
}
