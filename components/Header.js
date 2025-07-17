"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { ShoppingCart, Smartphone, Home, Star } from "lucide-react"
import CartModal from "./CartModal" // Importar el nuevo modal

export default function Header() {
  const [cartCount, setCartCount] = useState(0)
  const [isCartModalOpen, setIsCartModalOpen] = useState(false) // Estado para el modal
  const [cartItems, setCartItems] = useState([]) // Estado para los items del carrito
  const router = useRouter()
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50)
    // Cargar items del carrito desde localStorage
    const savedItems = localStorage.getItem("cartItems")
    if (savedItems) {
      const parsedItems = JSON.parse(savedItems)
      const normalizedItems = parsedItems.map((i) => ({ ...i, quantity: i.quantity ?? 1 }))
      setCartItems(normalizedItems)
      const totalCount = normalizedItems.reduce((sum, it) => sum + it.quantity, 0)
      setCartCount(totalCount)
    } else {
      setCartCount(0) // Asegurarse de que el contador sea 0 si no hay items
    }

    // Escuchar actualizaciones del carrito
    const handleCartUpdate = (event) => {
      const updatedItems = event.detail.items
      setCartItems(updatedItems)
      // Calcular el total de artículos sumando las cantidades
      const totalCount = updatedItems.reduce((sum, it) => sum + (it.quantity ?? 1), 0)
      setCartCount(totalCount)
    }

    window.addEventListener("cartUpdated", handleCartUpdate)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("cartUpdated", handleCartUpdate)
    }
  }, [])

  // Nuevo useEffect para controlar el scroll del body
  useEffect(() => {
    if (isCartModalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "" // Restablecer a valor por defecto
    }

    // Limpiar al desmontar el componente
    return () => {
      document.body.style.overflow = ""
    }
  }, [isCartModalOpen])

  const getBreadcrumb = () => {
    if (pathname === "/") {
      return (
        <div className="flex items-center space-x-2">
          <Home className="w-4 h-4" />
          <span>Catálogo Principal</span>
        </div>
      )
    }
    if (pathname.startsWith("/product/")) {
      return (
        <div className="flex items-center space-x-2">
          <Home className="w-4 h-4" />
          <span>Catálogo</span>
          <span>/</span>
          <Star className="w-4 h-4" />
          <span>Detalles del Producto</span>
        </div>
      )
    }
    return "MobileShop"
  }

  const handleCartClick = () => {
    setIsCartModalOpen(true)
  }

  const handleCloseCartModal = () => {
    setIsCartModalOpen(false)
  }

  return (
    <div className={`smooth-transition ${isVisible ? "animate-gentle-slideIn" : "opacity-0"}`}>
      {/* Barra de navegación principal */}
      <div className="bg-retro-cyan border-b-4 border-black p-2 md:p-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
          {/* Logo y marca */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center space-x-2 retro-button bg-retro-yellow px-3 py-1 md:px-4 md:py-2"
          >
            <div className="retro-folder bg-retro-blue w-6 h-5 flex items-center justify-center md:w-8 md:h-6">
              <Smartphone className="w-3 h-3 text-white md:w-4 md:h-4" />
            </div>
            <span className="retro-title text-black text-lg md:text-xl">MobileShop</span>
          </button>

          {/* Breadcrumb - Oculto en móvil */}
          <div className="hidden md:block retro-3d-box bg-white px-4 py-2">
            <div className="retro-text text-black text-sm">{getBreadcrumb()}</div>
          </div>

          {/* Carrito de compras */}
          <button
            onClick={handleCartClick} // Abre el modal al hacer clic
            className="retro-3d-box bg-retro-mint px-3 py-1 flex items-center space-x-2 md:px-4 md:py-2 md:space-x-3"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-black md:w-6 md:h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center retro-text border-2 border-black md:w-5 md:h-5">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="retro-text text-black hidden md:block">
              <div className="text-sm">🛒 Carrito</div>
              <div className="text-xs">
                {cartCount} {cartCount === 1 ? "artículo" : "artículos"}
              </div>
            </div>
            <div className="retro-text text-black block md:hidden text-sm">{cartCount}</div>
          </button>
        </div>
      </div>

      {/* Barra de estado - Oculta la hora en móvil */}
      <div className="bg-retro-yellow border-b-2 border-black p-2">
        <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left space-y-1 sm:space-y-0">
          <div className="retro-text text-black text-sm">🌟 Bienvenido a MobileShop - Tu tienda de confianza</div>
          <div className="retro-text text-black text-sm hidden sm:block">
            🕒 {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>
      </div>

      {/* Modal del Carrito */}
      {isCartModalOpen && <CartModal items={cartItems} onClose={handleCloseCartModal} />}
    </div>
  )
}
