const API_BASE_URL = "https://itx-frontend-test.onrender.com/api"

export const getProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/product`)
  if (!response.ok) {
    throw new Error("Error al obtener productos")
  }
  return response.json()
}

export const getProductById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/product/${id}`)
  if (!response.ok) {
    throw new Error("Error al obtener producto")
  }
  return response.json()
}

export const addToCart = async (cartItem) => {
  const response = await fetch(`${API_BASE_URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cartItem),
  })
  if (!response.ok) {
    throw new Error("Error al añadir al carrito")
  }
  return response.json()
}
