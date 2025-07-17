"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { ShoppingCart, Smartphone, Home, Star } from "lucide-react"

export default function Header() {
  const [cartCount, setCartCount] = useState(0)
  const router = useRouter()
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50)
    const savedCount = localStorage.getItem("cartCount")
    if (savedCount) {
      setCartCount(Number.parseInt(savedCount))
    }

    const handleCartUpdate = (event) => {
      setCartCount(event.detail)
    }

    window.addEventListener("cartUpdated", handleCartUpdate)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("cartUpdated", handleCartUpdate)
    }
  }, [])

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

  return (
    <div className={`smooth-transition ${isVisible ? "animate-gentle-slideIn" : "opacity-0"}`}>
      {/* Barra de navegación principal */}
      <div className="bg-retro-cyan border-b-4 border-black p-4">
        <div className="flex items-center justify-between">
          {/* Logo y marca */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center space-x-3 retro-button bg-retro-yellow px-4 py-2"
          >
            <div className="retro-folder bg-retro-blue w-8 h-6 flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-white" />
            </div>
            <span className="retro-title text-black text-xl">MobileShop</span>
          </button>

          {/* Breadcrumb */}
          <div className="retro-3d-box bg-white px-4 py-2">
            <div className="retro-text text-black text-sm">{getBreadcrumb()}</div>
          </div>

          {/* Carrito de compras */}
          <div className="retro-3d-box bg-retro-mint px-4 py-2 flex items-center space-x-3">
            <div className="relative">
              <ShoppingCart className="w-6 h-6 text-black" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center retro-text border-2 border-black neon-glow">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="retro-text text-black">
              <div className="text-sm">🛒 Carrito</div>
              <div className="text-xs">
                {cartCount} {cartCount === 1 ? "artículo" : "artículos"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de estado */}
      <div className="bg-retro-yellow border-b-2 border-black p-2">
        <div className="flex justify-between items-center">
          <div className="retro-text text-black text-sm">🌟 Bienvenido a MobileShop - Tu tienda de confianza</div>
          <div className="retro-text text-black text-sm">
            🕒 {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>
      </div>
    </div>
  )
}
