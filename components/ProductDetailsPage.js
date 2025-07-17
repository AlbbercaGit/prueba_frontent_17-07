"use client"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Header from "./Header"
import ProductImage from "./ProductImage"
import ProductDescription from "./ProductDescription"
import ProductActions from "./ProductActions"
import { getProductById, addToCart } from "../services/api"
import { getFromCache, saveToCache } from "../services/cache"

export default function ProductDetailsPageWrapper({ id }) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedStorage, setSelectedStorage] = useState("")
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (id) {
      loadProduct(id)
    }
  }, [id])

  useEffect(() => {
    if (product) {
      if (product.options?.colors?.length > 0) {
        setSelectedColor(product.options.colors[0].code.toString())
      }
      if (product.options?.storages?.length > 0) {
        setSelectedStorage(product.options.storages[0].code.toString())
      }
    }
  }, [product])

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const loadProduct = async (productId) => {
    try {
      setLoading(true)
      const cacheKey = `product_${productId}`
      const cachedProduct = getFromCache(cacheKey)
      if (cachedProduct) {
        setProduct(cachedProduct)
        setLoading(false)
        return
      }
      const data = await getProductById(productId)
      setProduct(data)
      saveToCache(cacheKey, data)
    } catch (error) {
      console.error("Error cargando producto:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async () => {
    if (!product || !selectedColor || !selectedStorage) {
      alert("Por favor selecciona todas las opciones antes de añadir al carrito")
      return
    }
    try {
      const response = await addToCart({
        id: product.id,
        colorCode: Number.parseInt(selectedColor),
        storageCode: Number.parseInt(selectedStorage),
      })
      localStorage.setItem("cartCount", response.count.toString())
      window.dispatchEvent(new CustomEvent("cartUpdated", { detail: response.count }))
      alert("¡Producto añadido al carrito exitosamente!")
    } catch (error) {
      console.error("Error añadiendo al carrito:", error)
      alert("Error añadiendo producto al carrito")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-400 mac-pattern-overlay">
        <Header />
        <div className="p-6">
          <div className="flex justify-center items-center h-64">
            <div className="mac-text text-lg text-black">Cargando producto...</div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-400 mac-pattern-overlay">
        <Header />
        <div className="p-6">
          <div className="text-center">
            <div className="mac-text text-lg text-black mb-6">Producto no encontrado</div>
            <button onClick={() => router.push("/")} className="mac-button-primary px-6 py-3">
              Volver a productos
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-400 mac-pattern-overlay">
      <Header />
      <div className="p-6">
        <div className="mb-6 animate-mac-slideIn">
          <button onClick={() => router.push("/")} className="mac-button smooth-mac-transition">
            ← Volver al catálogo
          </button>
        </div>
        <div className={`smooth-mac-transition ${isVisible ? "animate-mac-fadeIn" : "opacity-0"}`}>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="animate-mac-fadeIn" style={{ animationDelay: "0.1s" }}>
              <ProductImage product={product} />
            </div>
            <div className="space-y-6">
              <div className="animate-mac-fadeIn" style={{ animationDelay: "0.2s" }}>
                <ProductDescription product={product} />
              </div>
              <div className="animate-mac-fadeIn" style={{ animationDelay: "0.3s" }}>
                <ProductActions
                  product={product}
                  selectedColor={selectedColor}
                  selectedStorage={selectedStorage}
                  onColorChange={setSelectedColor}
                  onStorageChange={setSelectedStorage}
                  onAddToCart={handleAddToCart}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
