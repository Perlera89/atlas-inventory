'use employee'
import Link from 'next/link'
import { useEmployeeStore } from '@/store/employee'
import { useRouter } from 'next/navigation'
import { Toaster } from 'react-hot-toast'

// icons
import { ChevronLeft } from 'lucide-react'

// components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'
import { PopConfirmItem } from '../display/popconfirm'
import axios from 'axios'
import {
  CITIES_ROOT,
  DEPARTMENTS_ROOT,
  DISTRICS_ROOT,
  POSITIONS_ROOT
} from '@/util/config'
import SelectValueItem from '../entry/select-item'
import SelectInputItem from '../entry/select-input'

const PersonalInformation = () => {
  const firstName = useEmployeeStore((state) => state.firstName)
  const lastName = useEmployeeStore((state) => state.lastName)
  const dui = useEmployeeStore((state) => state.dui)
  const genre = useEmployeeStore((state) => state.genre)
  const genres = useEmployeeStore((state) => state.genres)
  const salary = useEmployeeStore((state) => state.salary)
  const position = useEmployeeStore((state) => state.position)
  const positions = useEmployeeStore((state) => state.positions)
  const validationItems = useEmployeeStore((state) => state.validationItems)

  console.log('validationItems', validationItems)

  const handleInputChange = useEmployeeStore(
    (state) => state.handleInputChange
  )
  const handleSelect = useEmployeeStore((state) => state.handleSelect)

  const fetchPositions = useEmployeeStore((state) => state.fetchPositions)
  const fetchGenres = useEmployeeStore((state) => state.fetchGenres)

  const [positionInput, setPositionInput] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      await fetchPositions()
      await fetchGenres()
    }

    fetchData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="John..."
              value={firstName}
              onChange={(e) => handleInputChange('firstName', e)}
              className="w-full"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Brown..."
              value={lastName}
              onChange={(e) => handleInputChange('lastName', e)}
              className="w-full"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dui">DUI</Label>
            <Input
              id="dui"
              type="text"
              placeholder="12345678-9..."
              value={dui}
              onChange={(e) => handleInputChange('dui', e)}
              className="w-full"
              required
            />
          </div>
          <SelectInputItem
            value={position}
            options={positions}
            onChange={(value) => handleSelect('position', value)}
            valueTitle="Position"
            optionsTitle="Positions"
            inputValue={positionInput}
            onInputChange={(e) => setPositionInput(e.target.value)}
            onKeyPress={async (e) => {
              if (e.key === 'Enter') {
                await axios.post(POSITIONS_ROOT, {
                  name: e.target.value
                })
                setPositionInput('')
                await fetchPositions()
              }
            }}
          />
          <SelectValueItem
            value={genre}
            options={genres}
            onChange={(value) => handleSelect('genre', value)}
            valueTitle="Genre"
            optionsTitle="Genres"
          />
          <div className="grid gap-2">
            <Label htmlFor="salary">Salary</Label>
            <Input
              id="salary"
              type="decimal"
              placeholder="0.00"
              step="0.01"
              value={salary}
              onChange={(e) => handleInputChange('salary', e)}
              className="w-full"
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const EmployeeAddress = () => {
  const city = useEmployeeStore((state) => state.city)
  const cities = useEmployeeStore((state) => state.cities)
  const district = useEmployeeStore((state) => state.district)
  const districts = useEmployeeStore((state) => state.districts)
  const department = useEmployeeStore((state) => state.department)
  const departments = useEmployeeStore((state) => state.departments)

  const handleSelectDeparment = useEmployeeStore(
    (state) => state.handleSelectDeparment
  )
  const handleSelectDistrict = useEmployeeStore(
    (state) => state.handleSelectDistrict
  )
  const handleSelectCity = useEmployeeStore((state) => state.handleSelectCity)

  const fetchDepartments = useEmployeeStore((state) => state.fetchDepartments)

  const [inputDeparment, setInputDeparment] = useState('')
  const [inputDistrict, setInputDistrict] = useState('')
  const [inputCity, setInputCity] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      await fetchDepartments()
    }

    fetchData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Address</CardTitle>
        <CardDescription className="text-foreground/70">
          Select or add in the defined order
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="grid gap-4">
        <SelectInputItem
            value={department}
            options={departments}
            onChange={handleSelectDeparment}
            valueTitle="Deparment"
            optionsTitle="Deparments"
            inputValue={inputDeparment}
            onInputChange={(e) => setInputDeparment(e.target.value)}
            onKeyPress={async (e) => {
              if (e.key === 'Enter') {
                await axios.post(DEPARTMENTS_ROOT, {
                  name: e.target.value
                })
                setInputDeparment('')
                await fetchDepartments()
              }
            }}
          />
          <SelectInputItem
            value={district}
            options={districts}
            onChange={handleSelectDistrict}
            valueTitle="District"
            optionsTitle="Districts"
            inputValue={inputDistrict}
            onInputChange={(e) => setInputDistrict(e.target.value)}
            onKeyPress={async (e) => {
              if (e.key === 'Enter') {
                await axios.post(DISTRICS_ROOT, {
                  name: e.target.value
                })
                setInputDistrict('')
                await fetchDepartments()
              }
            }}
          />
          <SelectInputItem
            value={city}
            options={cities}
            onChange={handleSelectCity}
            valueTitle="City"
            optionsTitle="Cities"
            inputValue={inputCity}
            onInputChange={(e) => setInputCity(e.target.value)}
            onKeyPress={async (e) => {
              if (e.key === 'Enter') {
                await axios.post(CITIES_ROOT, {
                  name: e.target.value
                })
                setInputCity('')
                await fetchDepartments()
              }
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

const EmployeeContact = () => {
  const email = useEmployeeStore((state) => state.email)
  const phone = useEmployeeStore((state) => state.phone)
  const handleInputChange = useEmployeeStore(
    (state) => state.handleInputChange
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="text"
              placeholder="user@mail.com"
              value={email}
              onChange={(e) => handleInputChange('email', e)}
              className="w-full"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="1234-5678"
              value={phone}
              onChange={(e) => handleInputChange('phone', e)}
              className="w-full"
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const UserProfile = () => {
  const email = useEmployeeStore((state) => state.email)
  const phone = useEmployeeStore((state) => state.phone)
  const handleInputChange = useEmployeeStore(
    (state) => state.handleInputChange
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Username</Label>
            <Input
              id="email"
              type="text"
              placeholder="user@mail.com"
              value={email}
              onChange={(e) => handleInputChange('email', e)}
              className="w-full"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Password</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="1234-5678"
              value={phone}
              onChange={(e) => handleInputChange('phone', e)}
              className="w-full"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Confirm password</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="1234-5678"
              value={phone}
              onChange={(e) => handleInputChange('phone', e)}
              className="w-full"
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function EmployeePage ({ employeeId }) {
  const router = useRouter()

  const id = useEmployeeStore((state) => state.id)
  const firstName = useEmployeeStore((state) => state.firstName)
  const lastName = useEmployeeStore((state) => state.lastName)
  const validationValues = useEmployeeStore((state) => state.validationValues)

  const fetchEmployee = useEmployeeStore((state) => state.fetchEmployee)

  const handleEmployeeSave = useEmployeeStore(
    (state) => state.handleEmployeeSave
  )
  const handleEmployeeDelete = useEmployeeStore(
    (state) => state.handleEmployeeDelete
  )
  const handleClearemployee = useEmployeeStore(
    (state) => state.handleClearemployee
  )

  useEffect(() => {
    const fetchData = async () => {
      if (employeeId) {
        await fetchEmployee(employeeId)
      }
    }

    fetchData()
  }, [handleEmployeeSave])

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="text-foreground/70" asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="text-foreground/70" asChild>
              <Link href="/employees">employees</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-primary">
              {employeeId ? 'Edit employee' : 'New employee'}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={() => router.push('/employees')}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
              {employeeId && (
                <>
                  <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    {firstName} {lastName}
                  </h1>
                </>
              )}
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                {id
                  ? (
                  <PopConfirmItem
                    confirm={() => {
                      handleEmployeeDelete()
                      router.push('/employees')
                    }}
                    title={`Delete employee ${firstName} ${lastName}`}
                  >
                    <Button variant="outline" size="sm">
                      Delete
                    </Button>
                  </PopConfirmItem>
                    )
                  : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearemployee}
                  >
                    Discard
                  </Button>
                    )}
                <Button
                  size="sm"
                  disabled={!validationValues}
                  onClick={async () => {
                    await handleEmployeeSave()
                    router.push('/employees')
                  }}
                >
                  Save Employee
                </Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <PersonalInformation />
                <EmployeeAddress />
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <EmployeeContact />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 md:hidden">
              {id
                ? (
                <PopConfirmItem
                  confirm={() => {
                    handleEmployeeDelete()
                    router.push('/employees')
                  }}
                  title={`Delete employee ${firstName} ${lastName}`}
                >
                  <Button variant="outline" size="sm">
                    Delete
                  </Button>
                </PopConfirmItem>
                  )
                : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearemployee}
                >
                  Discard
                </Button>
                  )}
              <Button
                size="sm"
                disabled={!validationValues}
                onClick={async () => {
                  handleEmployeeSave()
                  router.push('/employees')
                }}
              >
                Save Employee
              </Button>
            </div>
          </div>
        </main>
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#1d1d1d',
            color: 'white'
          }
        }}
      />
    </div>
  )
}
