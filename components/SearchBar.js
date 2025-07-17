"use client"

import { Search, Zap } from "lucide-react"

export default function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="retro-window bg-retro-purple">
      {/* Barra de título del buscador */}
      <div className="retro-titlebar rounded-t-lg -mx-2 -mt-2 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-black" />
            <span className="retro-text text-sm text-black">🔍 BÚSQUEDA AVANZADA</span>
          </div>
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-retro-yellow border border-black"></div>
            <div className="w-3 h-3 bg-retro-orange border border-black"></div>
            <div className="w-3 h-3 bg-red-500 border border-black"></div>
          </div>
        </div>
      </div>

      {/* Contenido del buscador */}
      <div className="p-4">
        <div className="space-y-3">
          <div className="retro-text text-black text-sm flex items-center space-x-2">
            <Zap className="w-4 h-4" />
            <span>Buscar por marca o modelo:</span>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Ej: iPhone, Samsung, Xiaomi..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="retro-input w-full text-black placeholder-gray-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="retro-text text-xs text-black">⚡ Búsqueda en tiempo real</div>
            <div className="retro-button bg-retro-yellow px-3 py-1">
              <span className="retro-text text-xs text-black">BUSCAR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
