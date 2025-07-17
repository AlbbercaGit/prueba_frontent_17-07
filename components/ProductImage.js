"use client"

import { ImageIcon } from "lucide-react"

export default function ProductImage({ product }) {
  return (
    <div className="retro-window bg-white">
      {/* Barra de título */}
      <div className="retro-titlebar rounded-t-lg -mx-2 -mt-2 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ImageIcon className="w-4 h-4 text-black" />
            <span className="retro-text text-sm text-black">🖼️ VISTA PREVIA DEL PRODUCTO</span>
          </div>
          <div className="flex space-x-1">
            {/* Cambiamos los divs por botones con estilo retro-button-mini */}
            <button className="retro-button-mini bg-retro-yellow"></button>
            <button className="retro-button-mini bg-retro-orange"></button>
            <button className="retro-button-mini bg-red-500"></button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Área de imagen */}
        <div className="retro-3d-box bg-retro-cyan p-8 h-96 flex flex-col items-center justify-center">
          {product.imgUrl ? (
            <img
              src={product.imgUrl || "/placeholder.svg"}
              alt={`${product.brand} ${product.model}`}
              className="max-w-full max-h-88 object-contain pixel-perfect"
            />
          ) : (
            <div className="text-center">
              <div className="retro-folder bg-retro-blue w-32 h-24 flex items-center justify-center mb-4">
                <ImageIcon className="w-12 h-12 text-white" />
              </div>
              <div className="retro-text text-black">📷 Imagen no disponible</div>
            </div>
          )}
        </div>

        {/* Información de la imagen */}
        <div className="mt-4">
          <div className="retro-3d-box bg-retro-yellow p-3">
            <div className="retro-text text-black text-center">
              📱 {product.brand} {product.model}
              {product.imgUrl && <span className="ml-2">✅ Imagen cargada</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
