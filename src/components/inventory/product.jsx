'use client'
import Link from 'next/link'
import { useInventoryStore } from '@/store/inventory'
import { useImageStore } from '@/store/image'
import { useRouter } from 'next/navigation'
import { Toaster } from 'react-hot-toast'

// icons
import { ChevronLeft } from 'lucide-react'

// components
import { Badge } from '@/components/ui/badge'
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '../ui/checkbox'
import ImageSave from '../display/drag-image'
import { useEffect } from 'react'
import { PopConfirmItem } from '../display/popconfirm'

const ProductDetails = () => {
  const name = useInventoryStore((state) => state.name)
  const code = useInventoryStore((state) => state.code)
  const stock = useInventoryStore((state) => state.stock)
  const handleInputChange = useInventoryStore(
    (state) => state.handleInputChange
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="grid gap-2">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Product..."
              value={name}
              onChange={(e) => handleInputChange('name', e)}
              className="w-full"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="code">Code</Label>
            <Input
              id="code"
              type="text"
              placeholder="123456"
              value={code}
              onChange={(e) => handleInputChange('code', e)}
              className="w-full"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              placeholder="0"
              value={stock}
              onChange={(e) => handleInputChange('stock', e)}
              step="1"
              className="w-full"
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const ProductGeneral = () => {
  const price = useInventoryStore((state) => state.price)
  const cost = useInventoryStore((state) => state.cost)
  const minimumPrice = useInventoryStore((state) => state.minimumPrice)
  const minimumStock = useInventoryStore((state) => state.minimumStock)
  const iva = useInventoryStore((state) => state.iva)
  const handleInputChange = useInventoryStore(
    (state) => state.handleInputChange
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>General</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="grid grid-cols-2 gap-2">
          <div className="grid col-span-1 gap-3">
            <Label htmlFor="cost">Purchase price</Label>
            <Input
              id="cost"
              placeholder="0.00"
              type="number"
              value={cost}
              onChange={(e) => handleInputChange('cost', e)}
              step=".01"
              className="w-full"
              required
            />
          </div>
          <div className="grid col-span-1 gap-3">
            <Label htmlFor="price">Sale price</Label>
            <Input
              id="price"
              placeholder="0.00"
              type="number"
              value={price}
              onChange={(e) => handleInputChange('price', e)}
              step=".01"
              className="w-full"
              required
            />
          </div>
          <div className="grid col-span-1 gap-3">
            <Label htmlFor="minPrice">Minimum price</Label>
            <Input
              id="minPrice"
              placeholder="0.00"
              type="number"
              value={minimumPrice}
              onChange={(e) => handleInputChange('minimumPrice', e)}
              step=".01"
              className="w-full"
              required
            />
          </div>
          <div className="grid col-span-1 gap-3">
            <Label htmlFor="iva">IVA</Label>
            <Input
              id="iva"
              placeholder="0%"
              type="number"
              value={iva}
              onChange={(e) => handleInputChange('iva', e)}
              step=".01"
              className="w-full"
              required
            />
          </div>
          <div className="grid col-span-2 gap-3">
            <Label htmlFor="minStock">Minimum stock</Label>
            <Input
              id="minStock"
              placeholder="0"
              type="number"
              value={minimumStock}
              onChange={(e) => handleInputChange('minimumStock', e)}
              step="1"
              className="w-full"
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const ProductTags = () => {
  const category = useInventoryStore((state) => state.category)
  const brand = useInventoryStore((state) => state.brand)
  const area = useInventoryStore((state) => state.area)
  const selectedTags = useInventoryStore((state) => state.selectedTags)
  const categories = useInventoryStore((state) => state.categories)
  const brands = useInventoryStore((state) => state.brands)
  const areas = useInventoryStore((state) => state.areas)
  const tags = useInventoryStore((state) => state.tags)

  const fetchSelects = useInventoryStore((state) => state.fetchSelects)
  const handleSelect = useInventoryStore((state) => state.handleSelect)

  useEffect(() => {
    const fetchData = async () => {
      await fetchSelects()
    }

    fetchData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Category</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-1 grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select
              id="category"
              onValueChange={(value) => handleSelect('category', value)}
              value={category}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-1 grid gap-2">
            <Label htmlFor="brand">Brand</Label>
            <Select
              id="brand"
              onValueChange={(value) => handleSelect('brand', value)}
              value={brand}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Brands</SelectLabel>
                  {brands.map((brand) => (
                    <SelectItem key={brand.id} value={brand.id}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-1 grid gap-2">
            <Label htmlFor="area">Area</Label>
            <Select
              id="area"
              onValueChange={(value) => handleSelect('area', value)}
              value={area}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select area" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Areas</SelectLabel>
                  {areas.map((area) => (
                    <SelectItem key={area.id} value={area.id}>
                      {area.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-1 grid gap-2">
            <Label htmlFor="tags">Tags</Label>
            <Select
              id="tags"
              onValueChange={(value) => handleSelect('tags', value)}
              value={selectedTags}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select tags" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tags</SelectLabel>
                  {tags.map((tag) => (
                    <SelectItem key={tag.id} value={tag.id}>
                      {tag.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const ProductImage = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Product Images</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <ImageSave />
      </CardContent>
    </Card>
  )
}

const ProductType = () => {
  const type = useInventoryStore((state) => state.type)
  const handleSelect = useInventoryStore((state) => state.handleSelect)

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Product Type</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <Select
          id="type"
          defaultValue={1}
          onValueChange={(value) => handleSelect('type', value)}
          value={type}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={1}>Consumable</SelectItem>
              <SelectItem value={2}>Storable</SelectItem>
              <SelectItem value={3}>Service</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  )
}

const ProductExtra = () => {
  const safetyInfo = useInventoryStore((state) => state.safetyInfo)
  const description = useInventoryStore((state) => state.description)
  const handleInputChange = useInventoryStore(
    (state) => state.handleInputChange
  )
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Extra</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="grid gap-2">
          <div className="grid gap-2">
            <Label htmlFor="safetyInfo">Description</Label>
            <Textarea
              id="safetyInfo"
              placeholder="Emtpy"
              value={safetyInfo}
              onChange={(e) => handleInputChange('safetyInfo', e)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Safety info</Label>
            <Textarea
              id="description"
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

export default function ProductPage ({ productId }) {
  const router = useRouter()
  const onSale = useInventoryStore((state) => state.onSale)
  const handleSelect = useInventoryStore((state) => state.handleSelect)
  const name = useInventoryStore((state) => state.name)
  const fetchProduct = useInventoryStore((state) => state.fetchProduct)
  const handleSaveProduct = useInventoryStore(
    (state) => state.handleSaveProduct
  )
  const handleClearProduct = useInventoryStore(
    (state) => state.handleClearProduct
  )
  const handleDeleteProduct = useInventoryStore(
    (state) => state.handleDeleteProduct
  )
  const validationValues = useInventoryStore((state) => state.validationValues)
  const id = useInventoryStore((state) => state.id)
  const handleSubmit = useImageStore((state) => state.handleSubmit)
  const setThumbnail = useInventoryStore((state) => state.setThumbnail)

  useEffect(() => {
    const fetchData = async () => {
      if (productId) {
        await fetchProduct(productId)
      }
    }

    fetchData()
  }, [handleSaveProduct])

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
              <Link href="/inventory">Inventory</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-primary">
              {productId ? 'Edit Product' : 'New Product'}
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
                onClick={() => router.push('/inventory')}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
              {productId && (
                <>
                  <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    {name}
                  </h1>
                  <Badge variant="outline" className="ml-auto sm:ml-0">
                    In stock
                  </Badge>
                </>
              )}
              <div className="flex gap-2 items-center">
                <Checkbox
                  id="onSale"
                  defaultChecked
                  checked={onSale}
                  onCheckedChange={(value) => handleSelect('onSale', value)}
                />
                <Label htmlFor="onSale ">On sale</Label>
              </div>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                {id
                  ? (
                  <PopConfirmItem
                    confirm={handleDeleteProduct}
                    title={`Delete product ${name}`}
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
                    onClick={handleClearProduct}
                  >
                    Discard
                  </Button>
                    )}
                <Button
                  size="sm"
                  disabled={!validationValues}
                  onClick={async () => {
                    setThumbnail(await handleSubmit())
                    router.push('/inventory')
                    handleSaveProduct()
                  }}
                >
                  Save Product
                </Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <ProductDetails />
                <ProductGeneral />
                <ProductTags />
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <ProductType />
                <ProductImage />
                <ProductExtra />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 md:hidden">
              <Button variant="outline" size="sm" onClick={handleClearProduct}>
                Discard
              </Button>
              <Button
                size="sm"
                disabled={!validationValues}
                onClick={async () => {
                  setThumbnail(await handleSubmit())
                  router.push('/inventory')
                  handleSaveProduct()
                }}
              >
                Save Product
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
