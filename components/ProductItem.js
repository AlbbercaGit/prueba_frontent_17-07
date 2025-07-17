"use client"

import { Smartphone, Tag } from "lucide-react" // Importar el icono de Tag

export default function ProductItem({ product, onClick }) {
  const colors = [
    { bg: "bg-retro-yellow", shadow: "#e6c200" },
    { bg: "bg-retro-mint", shadow: "#7fd67f" },
    { bg: "bg-retro-purple", shadow: "#c45ac4" },
    { bg: "bg-retro-orange", shadow: "#e67300" },
    { bg: "bg-retro-cyan", shadow: "#20b2aa" },
  ]
  const randomColor = colors[Math.floor(Math.random() * colors.length)]

  return (
    <div
      onClick={onClick}
      className="retro-3d-box cursor-pointer smooth-transition h-72 flex flex-col bg-white relative"
    >
      {/* Etiqueta de precio flotante */}
      <div className="absolute top-4 right-4 z-10">
        <div className="retro-3d-box bg-retro-yellow px-3 py-1 flex items-center space-x-1">
          <Tag className="w-4 h-4 text-black" />
          <span className="retro-text text-black text-sm font-bold">{product.price}€</span>
        </div>
      </div>

      {/* Barra de título del producto */}
      <div className="retro-titlebar rounded-t-lg -mx-2 -mt-2 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Smartphone className="w-4 h-4 text-black" />
            <span className="retro-text text-sm text-black">{product.brand}</span>
          </div>
          <div className="flex space-x-1">
            {/* Cambiamos los divs por botones con estilo retro-button-mini */}
            <button className="retro-button-mini bg-retro-yellow"></button>
            <button className="retro-button-mini bg-retro-orange"></button>
            <button className="retro-button-mini bg-red-500"></button>
          </div>
        </div>
      </div>

      {/* Contenido del producto */}
      <div className="flex-1 p-4 flex flex-col">
        {/* Área de imagen como carpeta 3D */}
        <div className="flex-1 flex items-center justify-center mb-4">
          <div
            className={`retro-folder ${randomColor.bg} w-24 h-20 sm:w-32 sm:h-28 flex items-center justify-center relative`} /* Ajustado el tamaño para móvil */
          >
            {product.imgUrl ? (
              <img
                src={product.imgUrl || "/placeholder.svg"}
                alt={`${product.brand} ${product.model}`}
                className="max-w-full max-h-16 object-contain pixel-perfect" /* Ajustado el tamaño de la imagen */
              />
            ) : (
              <Smartphone className="w-8 h-8 text-white" />
            )}
          </div>
        </div>

        {/* Información del producto */}
        <div className="text-center space-y-3">
          <div className="retro-text text-black font-bold text-lg">{product.model}</div>
          <div className="retro-text text-gray-700 text-sm">{product.brand}</div>
        </div>

        {/* Barra de estado */}
        <div className="mt-4 pt-2 border-t-2 border-gray-300">
          <div className="retro-text text-xs text-gray-600 text-center">💾 Disponible | 🔄 Stock: OK</div>
        </div>
      </div>
    </div>
  )
}
