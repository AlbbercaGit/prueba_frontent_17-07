"use client"

import { ShoppingCart, Settings } from "lucide-react"

export default function ProductActions({
  product,
  selectedColor,
  selectedStorage,
  onColorChange,
  onStorageChange,
  onAddToCart,
}) {
  return (
    <div className="retro-window bg-retro-mint">
      {/* Barra de título */}
      <div className="retro-titlebar rounded-t-lg -mx-2 -mt-2 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Settings className="w-4 h-4 text-black" />
            <span className="retro-text text-sm text-black">⚙️ CONFIGURACIÓN DEL PRODUCTO</span>
          </div>
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-retro-yellow border border-black"></div>
            <div className="w-3 h-3 bg-retro-orange border border-black"></div>
            <div className="w-3 h-3 bg-red-500 border border-black"></div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Sección de colores */}
        <div className="retro-3d-box bg-white p-4">
          <div className="retro-text text-black mb-3 flex items-center space-x-2">
            <span>🎨</span>
            <span>Seleccionar Color:</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {product.options?.colors?.map((color, index) => (
              <button
                key={color.code}
                onClick={() => onColorChange(color.code.toString())}
                className={`retro-button text-sm p-3 animate-gentle-fadeIn ${
                  selectedColor === color.code.toString() ? "bg-retro-cyan neon-glow" : "bg-retro-gray"
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <span className="retro-text text-black">{color.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sección de almacenamiento */}
        <div className="retro-3d-box bg-white p-4">
          <div className="retro-text text-black mb-3 flex items-center space-x-2">
            <span>💾</span>
            <span>Capacidad de Almacenamiento:</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {product.options?.storages?.map((storage, index) => (
              <button
                key={storage.code}
                onClick={() => onStorageChange(storage.code.toString())}
                className={`retro-button text-sm p-3 animate-gentle-fadeIn ${
                  selectedStorage === storage.code.toString() ? "bg-retro-purple neon-glow" : "bg-retro-gray"
                }`}
                style={{ animationDelay: `${index * 0.05 + 0.2}s` }}
              >
                <span className="retro-text text-black">{storage.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Botón de añadir al carrito */}
        <div className="text-center">
          <button
            onClick={onAddToCart}
            className="retro-button bg-retro-yellow px-8 py-4 animate-gentle-fadeIn neon-glow flex items-center space-x-3 mx-auto"
            style={{ animationDelay: "0.4s" }}
          >
            <ShoppingCart className="w-6 h-6 text-black" />
            <span className="retro-title text-black text-lg">🛒 AÑADIR AL CARRITO</span>
          </button>
        </div>

        {/* Información adicional */}
        <div className="retro-3d-box bg-white p-3">
          <div className="retro-text text-black text-xs text-center">
            ✅ Envío gratuito | 🔒 Compra segura | 📞 Soporte 24/7
          </div>
        </div>
      </div>
    </div>
  )
}
