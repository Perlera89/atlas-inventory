'use client'
import Link from 'next/link'
import { useClientStore } from '@/store/client'
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
  Select,
  SelectContent,
  SelectTrigger,
  SelectGroup,
  SelectItem,
  SelectValue,
  SelectLabel
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useState } from 'react'
import { PopConfirmItem } from '../display/popconfirm'
import axios from 'axios'
import {
  CITIES_ROOT,
  DEPARTMENTS_ROOT,
  DISTRICS_ROOT
} from '@/util/config'

const PersonalInformation = () => {
  const firstName = useClientStore((state) => state.firstName)
  const lastName = useClientStore((state) => state.lastName)
  const dui = useClientStore((state) => state.dui)
  const handleInputChange = useClientStore((state) => state.handleInputChange)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="grid gap-2">
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
        </div>
      </CardContent>
    </Card>
  )
}

const ClientAddress = () => {
  const city = useClientStore((state) => state.city)
  const cities = useClientStore((state) => state.cities)
  const district = useClientStore((state) => state.district)
  const districts = useClientStore((state) => state.districts)
  const department = useClientStore((state) => state.department)
  const departments = useClientStore((state) => state.departments)

  const handleSelectDeparment = useClientStore(
    (state) => state.handleSelectDeparment
  )
  const handleSelectDistrict = useClientStore(
    (state) => state.handleSelectDistrict
  )
  const handleSelectCity = useClientStore((state) => state.handleSelectCity)

  const fetchDepartments = useClientStore((state) => state.fetchDepartments)

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
        <div className="grid gap-2">
          <div className="grid gap-2">
            <Label htmlFor="deparment">Department</Label>
            <Select
              id="deparment"
              onValueChange={handleSelectDeparment}
              value={department}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select deparment" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Deparments</SelectLabel>
                  {departments.map((deparment) => (
                    <SelectItem key={deparment.id} value={deparment.id}>
                      {deparment.name}
                    </SelectItem>
                  ))}
                  <Input
                    placeholder="Type new department"
                    className="mt-2 bg-transparent"
                    value={inputDeparment}
                    onChange={(e) => setInputDeparment(e.target.value)}
                    onKeyPress={async (e) => {
                      if (e.key === 'Enter') {
                        await axios.post(DEPARTMENTS_ROOT, {
                          name: e.target.value
                        })
                        setInputDeparment('')
                        // await fetchSelects()
                      }
                    }}
                  />
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="district">Districts</Label>
            <Select
              id="district"
              onValueChange={handleSelectDistrict}
              value={district}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select district" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Districts</SelectLabel>
                  {districts?.map((district) => (
                    <SelectItem key={district.id} value={district.id}>
                      {district.name}
                    </SelectItem>
                  ))}
                  <Input
                    placeholder="Type new district"
                    className="mt-2 bg-transparent"
                    value={inputDistrict}
                    onChange={(e) => setInputDistrict(e.target.value)}
                    onKeyPress={async (e) => {
                      if (e.key === 'Enter') {
                        await axios.post(DISTRICS_ROOT, {
                          name: e.target.value
                        })
                        setInputDistrict('')
                        // await fetchSelects()
                      }
                    }}
                  />
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="city">City</Label>
            <Select id="city" onValueChange={handleSelectCity} value={city}>
              <SelectTrigger>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Cities</SelectLabel>
                  {cities.map((city) => (
                    <SelectItem key={city.id} value={city.id}>
                      {city.name}
                    </SelectItem>
                  ))}
                  <Input
                    placeholder="Type new city"
                    className="mt-2 bg-transparent"
                    value={inputCity}
                    onChange={(e) => setInputCity(e.target.value)}
                    onKeyPress={async (e) => {
                      if (e.key === 'Enter') {
                        await axios.post(CITIES_ROOT, {
                          name: e.target.value
                        })
                        setInputCity('')
                        // await fetchSelects()
                      }
                    }}
                  />
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const ClientContact = () => {
  const email = useClientStore((state) => state.email)
  const phone = useClientStore((state) => state.phone)
  const relevantInfo = useClientStore((state) => state.relevantInfo)
  const handleInputChange = useClientStore((state) => state.handleInputChange)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="grid gap-2">
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
          <div className="grid gap-2">
            <Label htmlFor="relevantInfo">Relevant info</Label>
            <Textarea
              id="relevantInfo"
              rows="19"
              placeholder="Empty"
              value={relevantInfo}
              onChange={(e) => handleInputChange('relevantInfo', e)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ClientPage ({ clientId }) {
  const router = useRouter()

  const id = useClientStore((state) => state.id)
  const firstName = useClientStore((state) => state.firstName)
  const lastName = useClientStore((state) => state.lastName)
  const validationValues = useClientStore((state) => state.validationValues)

  const fetchClient = useClientStore((state) => state.fetchClient)

  const handleClientSave = useClientStore((state) => state.handleClientSave)
  const handleClientDelete = useClientStore(
    (state) => state.handleClientDelete
  )
  const handleClearClient = useClientStore((state) => state.handleClearClient)

  useEffect(() => {
    const fetchData = async () => {
      if (clientId) {
        await fetchClient(clientId)
      }
    }

    fetchData()
  }, [handleClientSave])

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
              <Link href="/clients">Clients</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-primary">
              {clientId ? 'Edit Client' : 'New Client'}
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
                onClick={() => router.push('/clients')}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
              {clientId && (
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
                      handleClientDelete()
                      router.push('/clients')
                    }}
                    title={`Delete client ${firstName} ${lastName}`}
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
                    onClick={handleClearClient}
                  >
                    Discard
                  </Button>
                    )}
                <Button
                  size="sm"
                  disabled={!validationValues}
                  onClick={async () => {
                    await handleClientSave()
                    router.push('/clients')
                  }}
                >
                  Save Client
                </Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <PersonalInformation />
                <ClientAddress />
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <ClientContact />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 md:hidden">
            {id
              ? (
                  <PopConfirmItem
                    confirm={() => {
                      handleClientDelete()
                      router.push('/clients')
                    }}
                    title={`Delete client ${firstName} ${lastName}`}
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
                    onClick={handleClearClient}
                  >
                    Discard
                  </Button>
                )}
              <Button
                size="sm"
                disabled={!validationValues}
                onClick={async () => {
                  handleClientSave()
                  router.push('/clients')
                }}
              >
                Save Client
              </Button>
            </div>
          </div>
        </main>
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#1d1d1d',
            color: 'white'
          }
        }}
      />
    </div>
  )
}
