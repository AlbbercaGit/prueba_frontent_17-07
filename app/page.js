"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "../components/Header"
import SearchBar from "../components/SearchBar"
import ProductItem from "../components/ProductItem"
import { getProducts } from "../services/api"
import { getFromCache, saveToCache } from "../services/cache"

export default function ProductListPage() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [searchTerm, products])

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)

      const cachedProducts = getFromCache("products")
      if (cachedProducts) {
        setProducts(cachedProducts)
        setLoading(false)
        return
      }

      const data = await getProducts()
      setProducts(data)
      saveToCache("products", data)
    } catch (error) {
      console.error("Error cargando productos:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterProducts = () => {
    if (!searchTerm.trim()) {
      setFilteredProducts(products)
      return
    }

    const filtered = products.filter(
      (product) =>
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.model.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredProducts(filtered)
  }

  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-retro-pink">
        <Header />
        <div className="p-6">
          <div className="flex justify-center items-center h-64">
            <div className="retro-text text-xl text-black animate-gentle-pulse">Cargando catálogo...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-retro-pink flex flex-col">
      <Header />

      <div className="p-4 sm:p-6 flex-1">
        {/* Contenedor principal del catálogo */}
        <div
          className={`bg-retro-cyan rounded-lg p-4 sm:p-8 retro-window smooth-transition h-full ${isVisible ? "animate-gentle-fadeIn" : "opacity-0"}`}
        >
          {/* Barra de título del catálogo */}
          <div className="retro-titlebar rounded-t-lg mb-4 -mx-4 -mt-4 sm:mb-6 sm:-mx-8 sm:-mt-8">
            <div className="flex justify-between items-center">
              <h2 className="retro-title text-lg sm:text-xl text-black">📱 CATÁLOGO DE DISPOSITIVOS MÓVILES</h2>
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-retro-yellow border-2 border-black sm:w-4 sm:h-4"></div>
                <div className="w-3 h-3 bg-retro-orange border-2 border-black sm:w-4 sm:h-4"></div>
                <div className="w-3 h-3 bg-red-500 border-2 border-black sm:w-4 sm:h-4"></div>
              </div>
            </div>
          </div>

          {/* Contenedor para contador y buscador */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-6 md:mb-8 space-y-4 md:space-y-0">
            {/* Dispositivos Encontrados - Responsive */}
            <div
              className="retro-3d-box bg-retro-yellow p-3 sm:p-4 flex items-center space-x-2 sm:space-x-3 animate-gentle-fadeIn w-full md:w-auto"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="retro-folder bg-retro-blue w-8 h-6 flex items-center justify-center sm:w-10 sm:h-8">
                <span className="retro-text text-white text-lg sm:text-xl">📊</span>
              </div>
              <div className="retro-title text-black text-base sm:text-xl">
                Dispositivos: <span className="text-retro-blue">{filteredProducts.length}</span>{" "}
                {/* Eliminado neon-glow */}
              </div>
            </div>

            {/* Buscador - Vuelve a la parte superior */}
            <div className="w-full md:w-80 animate-gentle-slideIn" style={{ animationDelay: "0.1s" }}>
              <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            </div>
          </div>

          {/* Grid de productos con estilo retro */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product, index) => (
              <div key={product.id} className="animate-gentle-fadeIn" style={{ animationDelay: `${index * 0.05}s` }}>
                <ProductItem product={product} onClick={() => handleProductClick(product.id)} />
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && !loading && (
            <div className="text-center py-16 animate-gentle-fadeIn">
              <div className="retro-3d-box bg-white p-8 mx-auto max-w-md">
                <div className="retro-title text-xl text-black mb-4">🔍 Sin resultados</div>
                <div className="retro-text text-black">
                  {searchTerm
                    ? `No se encontraron productos que coincidan con "${searchTerm}"`
                    : "No hay productos disponibles en este momento"}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
