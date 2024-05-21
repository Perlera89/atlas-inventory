import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useInventoryStore } from '@/store/inventory'
import InventoryPage from '@/app/inventory/page'
import { usePathname } from 'next/navigation'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    prefetch: jest.fn(),
    push: jest.fn()
  }),
  usePathname: () => ({
    prefetch: () => null
  })
}))

jest.mock('@/store/inventory', () => ({
  useInventoryStore: jest.fn()
}))

describe('InventoryPage', () => {
  beforeEach(() => {
    useInventoryStore.mockReturnValue({
      productCount: 5,
      fetchProducts: jest.fn(),
      setAction: jest.fn(),
      router: {
        push: jest.fn()
      }
    })
  })

  test('renders the breadcrumb correctly', () => {
    render(<InventoryPage />)
    const breadcrumbHomeLink = screen.getByRole('link', { name: /home/i })
    const breadcrumbCurrentLink = screen.getByRole('link', { name: /inventory/i })

    expect(breadcrumbHomeLink).toBeInTheDocument()
    expect(breadcrumbCurrentLink).toBeInTheDocument()
  })

  test('renders the "Products" component when there are products', () => {
    render(<InventoryPage />)
    const productsComponent = screen.getByRole('heading', { name: /total products/i })

    expect(productsComponent).toBeInTheDocument()
  })

  test('renders the "No products" message when there are no products', () => {
    useInventoryStore.mockReturnValueOnce({
      productCount: 0,
      setAction: jest.fn(),
      router: { push: jest.fn() }
    })

    render(<InventoryPage />)
    const noProductsMessage = screen.getByText(/you have no products/i)
    const addButton = screen.getByRole('button', { name: /add product/i })

    expect(noProductsMessage).toBeInTheDocument()
    expect(addButton).toBeInTheDocument()

    userEvent.click(addButton)
    expect(useInventoryStore().setAction).toHaveBeenCalledWith('edit')
    expect(useInventoryStore().router.push).toHaveBeenCalledWith('/inventory/add')
  })

  test('calls fetchProducts on component mount', () => {
    const fetchProducts = jest.fn()
    useInventoryStore.mockReturnValueOnce({
      productCount: 0,
      fetchProducts
    })

    render(<InventoryPage />)

    expect(fetchProducts).toHaveBeenCalled()
  })
})
