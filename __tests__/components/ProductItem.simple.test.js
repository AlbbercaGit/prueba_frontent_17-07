import { render, screen, fireEvent } from "@testing-library/react"
import ProductItem from "../../components/ProductItem"
// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => "/",
}))

describe("ProductItem Component (simple)", () => {
  const mockProduct = {
    id: "1",
    brand: "Apple",
    model: "iPhone 14",
    price: "999",
  }

  it("renderiza la información básica del producto", () => {
    render(<ProductItem product={mockProduct} onClick={() => {}} />)
    expect(screen.getAllByText(/apple/i)[0]).toBeInTheDocument()
    expect(screen.getAllByText(/iphone 14/i)[0]).toBeInTheDocument()
    expect(screen.getAllByText(/999€/i)[0]).toBeInTheDocument()
  })

  it("llama a onClick cuando se hace clic en el producto", () => {
    const mockOnClick = jest.fn()
    render(<ProductItem product={mockProduct} onClick={mockOnClick} />)
    const item = screen.getByText(/iphone 14/i).closest("div")
    fireEvent.click(item)
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })
})
