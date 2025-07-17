"use client"

import { X, ShoppingCart, Trash2, Smartphone, Plus, Minus } from "lucide-react" // Importar Plus y Minus

const getQty = (item) => item.quantity ?? 1

export default function CartModal({ items, onClose }) {
  // Calcular el total de artículos sumando las cantidades
  const totalItemsCount = items.reduce((sum, it) => sum + getQty(it), 0)
  const totalPrice = items.reduce((sum, it) => sum + Number.parseFloat(it.price || 0) * getQty(it), 0).toFixed(2)

  const updateCartInLocalStorage = (updatedItems) => {
    localStorage.setItem("cartItems", JSON.stringify(updatedItems))
    const newTotalCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0)
    window.dispatchEvent(new CustomEvent("cartUpdated", { detail: { count: newTotalCount, items: updatedItems } }))
  }

  const handleRemoveItem = (indexToRemove) => {
    const updatedItems = items.filter((_, index) => index !== indexToRemove)
    updateCartInLocalStorage(updatedItems)
  }

  const handleQuantityChange = (indexToUpdate, delta) => {
    const updatedItems = [...items]
    const currentQuantity = getQty(updatedItems[indexToUpdate])
    const newQuantity = Math.max(1, currentQuantity + delta) // Cantidad mínima de 1

    if (newQuantity === 0) {
      // Si la cantidad llega a 0, eliminar el item
      handleRemoveItem(indexToUpdate)
    } else {
      updatedItems[indexToUpdate].quantity = newQuantity
      updateCartInLocalStorage(updatedItems)
    }
  }

  const handleClearCart = () => {
    localStorage.removeItem("cartItems")
    window.dispatchEvent(new CustomEvent("cartUpdated", { detail: { count: 0, items: [] } }))
    onClose()
  }

  const handleBuyNow = () => {
    alert("¡Gracias por tu compra! (Funcionalidad de checkout no implementada)")
    handleClearCart() // Opcional: vaciar el carrito después de "comprar"
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-gentle-fadeIn">
      <div className="retro-window bg-retro-gray w-11/12 max-w-md max-h-[90vh] flex flex-col">
        {/* Barra de título del modal */}
        <div className="retro-titlebar flex justify-between items-center p-2">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-4 h-4 text-black" />
            <span className="retro-text text-sm text-black">🛒 TU CARRITO DE COMPRAS</span>
          </div>
          {/* Cambiamos el div por un botón con estilo retro-button-mini */}
          <button onClick={onClose} className="retro-button-mini bg-red-500">
            <X className="w-3 h-3 text-white" />
          </button>
        </div>

        {/* Contenido del modal */}
        <div className="p-4 flex-1 overflow-y-auto bg-white">
          {totalItemsCount === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <div className="retro-text text-black text-lg">Tu carrito está vacío.</div>
              <div className="retro-text text-gray-600 text-sm">¡Añade algunos productos!</div>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="retro-3d-box bg-retro-mint p-3 flex items-center space-x-3">
                  <div className="retro-folder bg-retro-blue w-12 h-10 flex items-center justify-center flex-shrink-0">
                    {item.imgUrl ? (
                      <img
                        src={item.imgUrl || "/placeholder.svg"}
                        alt={item.name}
                        className="max-w-full max-h-8 object-contain pixel-perfect"
                      />
                    ) : (
                      <Smartphone className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="retro-text text-black font-bold text-sm">{item.name}</div>
                    <div className="retro-text text-gray-700 text-xs">
                      Color: {item.color} | Almacenamiento: {item.storage}
                    </div>
                    {/* Controles de cantidad */}
                    <div className="flex items-center space-x-2 mt-1">
                      <button
                        onClick={() => handleQuantityChange(index, -1)}
                        className="retro-button bg-retro-gray px-2 py-1 text-xs"
                      >
                        <Minus className="w-3 h-3 text-black" />
                      </button>
                      <span className="retro-text text-black text-sm">{getQty(item)}</span>
                      <button
                        onClick={() => handleQuantityChange(index, 1)}
                        className="retro-button bg-retro-gray px-2 py-1 text-xs"
                      >
                        <Plus className="w-3 h-3 text-black" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1 flex-shrink-0">
                    <div className="retro-text text-black font-bold text-sm">
                      {(Number.parseFloat(item.price || 0) * getQty(item)).toFixed(2)}€
                    </div>
                    <button
                      onClick={() => handleRemoveItem(index)}
                      className="retro-button bg-red-500 text-white px-2 py-1 text-xs"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pie de página del modal */}
        <div className="p-4 bg-retro-yellow border-t-2 border-black flex flex-col space-y-3">
          <div className="flex justify-between items-center">
            <div className="retro-title text-black text-lg">Total:</div>
            <div className="retro-title text-black text-lg">{totalPrice}€</div>
          </div>
          <button
            onClick={handleBuyNow}
            className="retro-button bg-retro-blue text-white px-4 py-2 flex items-center justify-center space-x-2"
          >
            <span className="retro-text">Comprar Ahora</span>
          </button>
          <button
            onClick={handleClearCart}
            className="retro-button bg-red-500 text-white px-4 py-2 flex items-center justify-center space-x-2"
          >
            <Trash2 className="w-5 h-5" />
            <span className="retro-text">Vaciar Carrito</span>
          </button>
          <button onClick={onClose} className="retro-button bg-retro-blue text-white px-4 py-2">
            <span className="retro-text">Continuar Comprando</span>
          </button>
        </div>
      </div>
    </div>
  )
}
