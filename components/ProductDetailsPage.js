"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "./Header"
import ProductImage from "./ProductImage"
import ProductDescription from "./ProductDescription"
import ProductActions from "./ProductActions"
import { getProductById, addToCart } from "../services/api"
import { getFromCache, saveToCache } from "../services/cache"

export default function ProductDetailsPage({ id }) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedStorage, setSelectedStorage] = useState("")
  const [quantity, setQuantity] = useState(1) // Nuevo estado para la cantidad
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [notification, setNotification] = useState(null) // { message: string, type: 'success' | 'error' }
  const [showNotification, setShowNotification] = useState(false) // Controla la visibilidad para la animación

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

  // Efecto para manejar la aparición y desaparición de la notificación
  useEffect(() => {
    if (notification) {
      setShowNotification(true) // Mostrar la notificación
      const timer = setTimeout(() => {
        setShowNotification(false) // Iniciar la animación de desvanecimiento
      }, 3000) // Duración antes de empezar a desvanecer (3 segundos)

      const hideTimer = setTimeout(() => {
        setNotification(null) // Eliminar del DOM después de la animación
      }, 3000 + 300) // 3 segundos de visibilidad + 0.3 segundos de animación

      return () => {
        clearTimeout(timer)
        clearTimeout(hideTimer)
      }
    }
  }, [notification])

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
    if (!product || !selectedColor || !selectedStorage || quantity <= 0) {
      setNotification({
        message: "Por favor selecciona todas las opciones y una cantidad válida.",
        type: "error",
      })
      return
    }

    try {
      // Llamada a la API para añadir al carrito (si es necesario para el contador global)
      // La API de prueba solo devuelve un contador global, no maneja cantidades por item.
      // Para esta prueba, actualizaremos el localStorage directamente con la cantidad.
      await addToCart({
        id: product.id,
        colorCode: Number.parseInt(selectedColor),
        storageCode: Number.parseInt(selectedStorage),
      })

      let currentCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]").map((i) => ({
        ...i,
        quantity: i.quantity ?? 1,
      }))

      const existingItemIndex = currentCartItems.findIndex(
        (item) =>
          item.id === product.id &&
          item.colorCode === Number.parseInt(selectedColor) &&
          item.storageCode === Number.parseInt(selectedStorage),
      )

      if (existingItemIndex > -1) {
        // Si el item ya existe, actualiza la cantidad
        currentCartItems[existingItemIndex].quantity += quantity
      } else {
        // Si no existe, añade un nuevo item
        const newCartItem = {
          id: product.id,
          name: `${product.brand} ${product.model}`,
          color: product.options.colors.find((c) => c.code.toString() === selectedColor)?.name,
          storage: product.options.storages.find((s) => s.code.toString() === selectedStorage)?.name,
          price: product.price,
          imgUrl: product.imgUrl,
          colorCode: Number.parseInt(selectedColor), // Guardar códigos para fácil comparación
          storageCode: Number.parseInt(selectedStorage), // Guardar códigos para fácil comparación
          quantity: quantity, // Añadir la cantidad
        }
        currentCartItems = [...currentCartItems, newCartItem]
      }

      localStorage.setItem("cartItems", JSON.stringify(currentCartItems))

      // Calcular el total de artículos sumando las cantidades
      const totalCount = currentCartItems.reduce((sum, it) => sum + it.quantity, 0)

      window.dispatchEvent(new CustomEvent("cartUpdated", { detail: { count: totalCount, items: currentCartItems } }))

      setNotification({
        message: `"${product.model}" x${quantity} añadido al carrito.`,
        type: "success",
      })
      setQuantity(1) // Resetear la cantidad a 1 después de añadir
    } catch (error) {
      console.error("Error añadiendo al carrito:", error)
      setNotification({
        message: "Error al añadir al carrito.",
        type: "error",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-retro-pink">
        <Header />
        <div className="p-6">
          <div className="flex justify-center items-center h-64">
            <div className="retro-text text-xl text-black animate-gentle-pulse">Cargando producto...</div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-retro-pink">
        <Header />
        <div className="p-6">
          <div className="text-center">
            <div className="retro-text text-xl text-black mb-6">Producto no encontrado</div>
            {/* Añadimos text-black para asegurar el contraste */}
            <button onClick={() => router.push("/")} className="retro-button bg-retro-yellow px-6 py-3 text-black">
              Volver al catálogo
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-retro-pink">
      <Header />
      <div className="p-6">
        <div className="mb-6 animate-gentle-slideIn">
          {/* Añadimos text-black para asegurar el contraste */}
          <button onClick={() => router.push("/")} className="retro-button bg-retro-yellow px-6 py-3 text-black">
            ← Volver al catálogo
          </button>
        </div>
        <div className={`smooth-transition ${isVisible ? "animate-gentle-fadeIn" : "opacity-0"}`}>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="animate-gentle-fadeIn" style={{ animationDelay: "0.1s" }}>
              <ProductImage product={product} />
            </div>
            <div className="space-y-6">
              <div className="animate-gentle-fadeIn" style={{ animationDelay: "0.2s" }}>
                <ProductDescription product={product} />
              </div>
              <div className="animate-gentle-fadeIn" style={{ animationDelay: "0.3s" }}>
                <ProductActions
                  product={product}
                  selectedColor={selectedColor}
                  selectedStorage={selectedStorage}
                  onColorChange={setSelectedColor}
                  onStorageChange={setSelectedStorage}
                  onAddToCart={handleAddToCart}
                  quantity={quantity} // Pasar la cantidad
                  onQuantityChange={setQuantity} // Pasar el setter de cantidad
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notificación lateral (esquina inferior derecha) con animación de desvanecimiento */}
      {notification && (
        <div
          className={`fixed bottom-6 right-6 z-50 retro-3d-box p-4 max-w-xs
            ${notification.type === "success" ? "bg-retro-mint" : "bg-red-500"}
            ${showNotification ? "animate-gentle-fadeIn" : "animate-gentle-fadeOut"}`}
        >
          <div className="retro-text text-black font-bold">
            {notification.type === "success" ? "✅ Éxito" : "❌ Error"}
          </div>
          <div className="retro-text text-black text-sm">{notification.message}</div>
        </div>
      )}
    </div>
  )
}
