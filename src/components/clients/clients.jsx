import { useRouter } from 'next/navigation'

// store
import { useClientStore } from '@/store/client'

// components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Button } from '../ui/button'
import { SearchItem } from '../ui/search'

export default function ClientList ({ clients }) {
  const router = useRouter()

  const allClients = useClientStore((state) => state.allClients)
  const setAction = useClientStore((state) => state.setAction)
  const handleClearClient = useClientStore((state) => state.handleClearClient)
  const handleSearch = useClientStore((state) => state.handleSearch)

  return (
    <>
      <div className="flex gap-2 justify-start w-full items-center">
        <Button
          className="w-auto"
          onClick={() => {
            setAction('edit')
            router.push('/clients/add')
            handleClearClient()
          }}
        >
          Add Client
        </Button>

        <form className="w-full">
          <SearchItem
            keys="firstName,lastName,dui,email,phone,address,relevantInfo"
            placeholder="Search client..."
            options={allClients}
            onSearch={(value) => handleSearch(value, 'clients')}
          />
        </form>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>First name</TableHead>
            <TableHead className="text-center">Last name</TableHead>
            <TableHead className="text-center">DUI</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-right">Phone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((record) => (
            <TableRow
              key={record.id}
              onClick={() => {
                setAction('view')
                router.push(`/clients/${record.id}`)
              }}
            >
              <TableCell>{record.id}</TableCell>
              <TableCell>{record.firstName}</TableCell>
              <TableCell className="text-center">{record.lastName}</TableCell>
              <TableCell className="text-center">{record.dui}</TableCell>
              <TableCell className="text-center">{record.email}</TableCell>
              <TableCell className="text-right">{record.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
