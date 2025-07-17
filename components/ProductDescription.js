"use client"

import { FileText } from "lucide-react"

export default function ProductDescription({ product }) {
  return (
    <div className="retro-window bg-white">
      {/* Barra de título */}
      <div className="retro-titlebar rounded-t-lg -mx-2 -mt-2 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-black" />
            <span className="retro-text text-sm text-black">📋 ESPECIFICACIONES TÉCNICAS</span>
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
        {/* Información principal */}
        <div className="retro-3d-box bg-retro-yellow p-4 mb-6">
          <div className="text-center">
            <div className="retro-title text-2xl text-black mb-2">
              {product.brand} {product.model}
            </div>
            <div className="retro-button bg-retro-cyan px-6 py-2 inline-block">
              <span className="retro-title text-xl text-black">{product.price}€</span>
            </div>
          </div>
        </div>

        {/* Especificaciones técnicas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 retro-text text-sm">
          <div className="space-y-3">
            <div className="retro-3d-box bg-retro-mint p-3">
              <div className="flex justify-between">
                <span className="font-bold">🔧 Procesador:</span>
                <span>{product.cpu}</span>
              </div>
            </div>
            <div className="retro-3d-box bg-retro-mint p-3">
              <div className="flex justify-between">
                <span className="font-bold">🧠 Memoria RAM:</span>
                <span>{product.ram}</span>
              </div>
            </div>
            <div className="retro-3d-box bg-retro-mint p-3">
              <div className="flex justify-between">
                <span className="font-bold">💻 Sistema:</span>
                <span>{product.os}</span>
              </div>
            </div>
            <div className="retro-3d-box bg-retro-mint p-3">
              <div className="flex justify-between">
                <span className="font-bold">📱 Pantalla:</span>
                <span className="text-xs">{product.displayResolution}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="retro-3d-box bg-retro-purple p-3">
              <div className="flex justify-between">
                <span className="font-bold">🔋 Batería:</span>
                <span>{product.battery}</span>
              </div>
            </div>
            <div className="retro-3d-box bg-retro-purple p-3">
              <div className="flex justify-between">
                <span className="font-bold">📸 Cámara:</span>
                <span className="text-xs">{product.primaryCamera}</span>
              </div>
            </div>
            <div className="retro-3d-box bg-retro-purple p-3">
              <div className="flex justify-between">
                <span className="font-bold">⚖️ Peso:</span>
                <span>{product.weight}</span>
              </div>
            </div>
            <div className="retro-3d-box bg-retro-purple p-3">
              <div className="flex justify-between">
                <span className="font-bold">📏 Dimensiones:</span>
                <span className="text-xs">{product.dimentions}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
