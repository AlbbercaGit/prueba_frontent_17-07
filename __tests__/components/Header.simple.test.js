
import { render, screen } from "@testing-library/react"

import Header from "../../components/Header"

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => "/",
}))


describe("Header Component (simple)", () => {
  it("muestra el título principal MobileShop", () => {
    render(<Header />)
    // Busca el título exacto en el span principal
    expect(screen.getAllByText("MobileShop")[0]).toBeInTheDocument()
  })

  it("muestra el contador del carrito en 0 al inicio", () => {
    render(<Header />)
    // Busca el contador exacto en el carrito
    expect(screen.getByText(/0\s*artículos/i)).toBeInTheDocument()
  })

  it("muestra el breadcrumb Catálogo Principal", () => {
    render(<Header />)
    // Busca el texto exacto del breadcrumb
    expect(screen.getByText(/catálogo principal/i)).toBeInTheDocument()
  })
})
