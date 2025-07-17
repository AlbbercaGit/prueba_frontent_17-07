// Mock Next.js router (por si el servicio lo usa en algún punto)
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => "/",
}))

// Mock fetch global
beforeAll(() => {
  global.fetch = jest.fn()
})

afterEach(() => {
  fetch.mockClear()
})

import { getProducts, getProductById, addToCart } from "../../services/api"

describe("API Service (simple)", () => {
  it("getProducts devuelve productos correctamente", async () => {
    const mockProducts = [
      { id: "1", brand: "Apple", model: "iPhone 14" },
      { id: "2", brand: "Samsung", model: "Galaxy S23" },
    ]
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    })
    const result = await getProducts()
    expect(result).toEqual(mockProducts)
  })

  it("getProductById devuelve un producto por ID", async () => {
    const mockProduct = { id: "1", brand: "Apple", model: "iPhone 14" }
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProduct,
    })
    const result = await getProductById("1")
    expect(result).toEqual(mockProduct)
  })
})
