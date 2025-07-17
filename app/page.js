"use client"

import React, { useState, useEffect } from "react"
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
  const [error, setError] = useState("")
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)

  const filterProducts = React.useCallback(() => {
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
  }, [searchTerm, products])


  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [searchTerm, products, filterProducts])

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      setError("")

      const cachedProducts = getFromCache("products")
      console.log("Productos en caché:", cachedProducts)
      if (cachedProducts) {
        setProducts(cachedProducts)
        setLoading(false)
        return
      }

      const data = await getProducts()
      console.log("Productos desde API:", data)
      setProducts(data)
      saveToCache("products", data)
    } catch (err) {
      setError("No se pudo cargar el catálogo. Intenta de nuevo más tarde.")
      console.error("Error cargando productos:", err)
    } finally {
      setLoading(false)
    }
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
            {error ? (
              <div className="retro-text text-xl text-red-600 animate-gentle-pulse">{error}</div>
            ) : (
              <div className="retro-text text-xl text-black animate-gentle-pulse">Cargando catálogo...</div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-retro-pink">
      <Header />

      <div className="p-6">
        {/* Contenedor principal del catálogo */}
        <div
          className={`bg-retro-cyan rounded-lg p-8 retro-window smooth-transition ${isVisible ? "animate-gentle-fadeIn" : "opacity-0"}`}
        >
          {/* Barra de título del catálogo */}
          <div className="retro-titlebar rounded-t-lg mb-6 -mx-8 -mt-8">
            <div className="flex justify-between items-center">
              <h2 className="retro-title text-xl text-black">📱 CATÁLOGO DE DISPOSITIVOS MÓVILES</h2>
              <div className="flex space-x-1">
                <div className="w-4 h-4 bg-retro-yellow border-2 border-black"></div>
                <div className="w-4 h-4 bg-retro-orange border-2 border-black"></div>
                <div className="w-4 h-4 bg-red-500 border-2 border-black"></div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center space-x-4">
              <div className="retro-text text-black text-lg">📊 Productos disponibles: {filteredProducts.length}</div>
            </div>

            {/* Buscador con personalidad */}
            <div className="w-80 animate-gentle-slideIn" style={{ animationDelay: "0.1s" }}>
              <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            </div>
          </div>

          {/* Grid de productos con estilo retro */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
