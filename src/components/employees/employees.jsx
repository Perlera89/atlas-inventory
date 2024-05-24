import { useRouter } from 'next/navigation'

// store
import { useEmployeeStore } from '@/store/employee'

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

export default function EmployeeList ({ employees }) {
  const router = useRouter()

  const allEmployees = useEmployeeStore((state) => state.allEmployees)
  const setAction = useEmployeeStore((state) => state.setAction)
  const handleClearEmployee = useEmployeeStore((state) => state.handleClearEmployee)
  const handleSearch = useEmployeeStore((state) => state.handleSearch)

  return (
    <>
      <div className="flex gap-2 justify-start w-full items-center">
        <Button
          className="w-auto"
          size="sm"
          onClick={() => {
            setAction('edit')
            router.push('/employees/add')
            handleClearEmployee()
          }}
        >
          Add Employee
        </Button>

        <form className="w-full">
          <SearchItem
            keys={['firstName', 'lastName', 'dui', 'email', 'phone']}
            placeholder="Search employee..."
            options={allEmployees}
            onSearch={(value) => handleSearch(value, 'employees')}
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
          {employees.map((record) => (
            <TableRow
              key={record.id}
              onClick={() => {
                setAction('view')
                router.push(`/employees/${record.id}`)
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
