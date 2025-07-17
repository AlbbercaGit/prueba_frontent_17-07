// Mock Next.js router (por si el servicio lo usa en algún punto)
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => "/",
}))

// Mock localStorage global
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
})

import { saveToCache, getFromCache } from "../../services/cache"

describe("Cache Service (simple)", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(Date, "now").mockReturnValue(1000000)
  })
  afterEach(() => {
    Date.now.mockRestore()
  })

  it("guarda y recupera datos del cache", () => {
    const testData = { id: 1, name: "Test" }
    // Simula guardar en cache
    saveToCache("test-key", testData)
    // Simula recuperar del cache
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify({
      data: testData,
      timestamp: 1000000,
      expiry: 1000000 + 60 * 60 * 1000,
    }))
    const result = getFromCache("test-key")
    expect(result).toEqual(testData)
  })

  it("retorna null si no hay datos en cache", () => {
    localStorageMock.getItem.mockReturnValueOnce(null)
    const result = getFromCache("test-key")
    expect(result).toBeNull()
  })
})
