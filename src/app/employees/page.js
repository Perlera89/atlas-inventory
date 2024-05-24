'use client'
// components
import { Toaster } from 'react-hot-toast'
import CardCountItem from '@/components/display/card-count'
import ResultItem from '@/components/display/result'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import EmployeesList from '@/components/employees/employees'
import { Button } from '@/components/ui/button'

// icons
import { Briefcase } from 'lucide-react'

// hooks & stores
import { usePathname, useRouter } from 'next/navigation'
import { useEmployeeStore } from '@/store/employee'
import { useEffect } from 'react'

const Employees = () => {
  const employees = useEmployeeStore((state) => state.employees)
  const employeesCount = useEmployeeStore((state) => state.employeesCount)

  return (
    <div className="flex flex-col gap-4 w-full">
      <CardCountItem
        title="Total employees"
        count={employeesCount}
        icon={Briefcase}
        handleFilter={null}
      />
      <EmployeesList employees={employees} />
    </div>
  )
}

const NoEmployees = () => {
  const router = useRouter()
  const setAction = useEmployeeStore((state) => state.setAction)

  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm h-[93vh]">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          You have no employees
        </h3>
        <p className="text-sm text-muted-foreground">
          You can add a employee to get started
        </p>
        <Button
          className="mt-4"
          onClick={() => {
            setAction('edit')
            router.push('/employees/add')
          }}
        >
          Add Employee
        </Button>
      </div>
    </div>
  )
}

export default function EmployeesPage () {
  const pathname = usePathname()

  const error = useEmployeeStore((state) => state.error)
  const isLoading = useEmployeeStore((state) => state.isLoading)
  const setIsLoading = useEmployeeStore((state) => state.setIsLoading)
  const openResult = useEmployeeStore((state) => state.openResult)
  const employeesCount = useEmployeeStore((state) => state.employeesCount)

  const handleOpenResult = useEmployeeStore((state) => state.handleOpenResult)
  const handleCloseResult = useEmployeeStore(
    (state) => state.handleCloseResult
  )

  const fetchEmployees = useEmployeeStore((state) => state.fetchEmployees)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      await fetchEmployees()
      setIsLoading(false)
    }

    fetchData()
  }, [])

  return (
    <>
      <div className="flex flex-col gap-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-foreground/70" href="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="capitalize" href={pathname}>
                {pathname.split('/')[1]}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="gap-4">
          {isLoading && employeesCount === 0 ? <NoEmployees /> : <Employees />}
        </div>
      </div>
      <ResultItem
        title={error ? error?.request?.statusText : null}
        alert={error ? error?.message : null}
        open={openResult}
        handleOpen={handleOpenResult}
        handleClose={handleCloseResult}
      />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#1d1d1d',
            color: 'white'
          }
        }}
      />
    </>
  )
}
