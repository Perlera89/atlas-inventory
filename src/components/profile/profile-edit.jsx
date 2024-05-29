'use client'
import Link from 'next/link'
import { useProfileStore } from '@/store/profile'
import { useImageStore } from '@/store/image'
import { useRouter } from 'next/navigation'
import { Toaster } from 'react-hot-toast'
import { CITIES_ROOT, DEPARTMENTS_ROOT, DISTRICS_ROOT } from '@/util/config'

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
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ImageSave from '../display/drag-image'
import SelectInputItem from '../entry/select-input'

const PersonalInformation = () => {
  const name = useProfileStore((state) => state.name)
  const description = useProfileStore((state) => state.description)
  const nrc = useProfileStore((state) => state.nrc)

  const handleInputChange = useProfileStore((state) => state.handleInputChange)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Information</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="grid gap-2">
          <div className="grid gap-2">
            <Label htmlFor="name">Company name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Shop..."
              value={name}
              onChange={(e) => handleInputChange('name', e)}
              className="w-full"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="nic">NRC</Label>
            <Input
              id="nic"
              type="text"
              placeholder="12344567..."
              value={nrc}
              onChange={(e) => handleInputChange('nrc', e)}
              className="w-full"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows="19"
              placeholder="Empty"
              value={description}
              onChange={(e) => handleInputChange('description', e)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const ProfileImage = () => {
  const thumbnail = useProfileStore((state) => state.thumbnail)

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Profile Image</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <ImageSave thumbnail={thumbnail} />
      </CardContent>
    </Card>
  )
}

const ProfileAddress = () => {
  const city = useProfileStore((state) => state.city)
  const cities = useProfileStore((state) => state.cities)
  const district = useProfileStore((state) => state.district)
  const districts = useProfileStore((state) => state.districts)
  const department = useProfileStore((state) => state.department)
  const departments = useProfileStore((state) => state.departments)

  const handleSelectDeparment = useProfileStore(
    (state) => state.handleSelectDeparment
  )
  const handleSelectDistrict = useProfileStore(
    (state) => state.handleSelectDistrict
  )
  const handleSelectCity = useProfileStore((state) => state.handleSelectCity)

  const fetchDepartments = useProfileStore((state) => state.fetchDepartments)

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

const ProfileContact = () => {
  const email = useProfileStore((state) => state.email)
  const phone = useProfileStore((state) => state.phone)
  const handleInputChange = useProfileStore((state) => state.handleInputChange)

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
        </div>
      </CardContent>
    </Card>
  )
}

export default function EditProfilePage () {
  const router = useRouter()

  const name = useProfileStore((state) => state.name)
  const validationValues = useProfileStore((state) => state.validationValues)
  const isDeleted = useProfileStore((state) => state.isDeleted)
  const setThumbnail = useProfileStore((state) => state.setThumbnail)

  const handleProfileSave = useProfileStore((state) => state.handleProfileSave)
  const handleSubmit = useImageStore((state) => state.handleSubmit)

  const handleClearProfile = useProfileStore(
    (state) => state.handleClearClient
  )

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
              <Link href="/profile">Profile</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-primary">
              Edit profile
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
                onClick={() => router.push('/profile')}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
              {!isDeleted && (
                <>
                  <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    {name}
                  </h1>
                </>
              )}
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearProfile}
                >
                  Discard
                </Button>
                <Button
                  size="sm"
                  disabled={!validationValues}
                  onClick={async () => {
                    setThumbnail(await handleSubmit())
                    await handleProfileSave()
                    router.push('/profile')
                  }}
                >
                  Save Profile
                </Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <PersonalInformation />
                <ProfileContact />
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <ProfileImage />
                <ProfileAddress />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 md:hidden">
              <Button variant="outline" size="sm" onClick={handleClearProfile}>
                Discard
              </Button>
              <Button
                size="sm"
                disabled={!validationValues}
                onClick={async () => {
                  setThumbnail(await handleSubmit())
                  await handleProfileSave()
                  router.push('/profile')
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
