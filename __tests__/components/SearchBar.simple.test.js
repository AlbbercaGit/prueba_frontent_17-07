import { render, screen, fireEvent } from "@testing-library/react"
import SearchBar from "../../components/SearchBar"
// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => "/",
}))
describe("SearchBar Component (simple)", () => {
  it("renderiza el input con el placeholder correcto", () => {
    render(<SearchBar searchTerm="" onSearchChange={() => {}} />)
    expect(screen.getByPlaceholderText("Ej: iPhone, Samsung, Xiaomi...")).toBeInTheDocument()
  })

  it("llama a onSearchChange cuando el usuario escribe", () => {
    const mockOnSearchChange = jest.fn()
    render(<SearchBar searchTerm="" onSearchChange={mockOnSearchChange} />)
    const input = screen.getByPlaceholderText("Ej: iPhone, Samsung, Xiaomi...")
    fireEvent.change(input, { target: { value: "Samsung" } })
    expect(mockOnSearchChange).toHaveBeenCalledWith("Samsung")
  })
})
