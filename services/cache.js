const CACHE_DURATION = 60 * 60 * 1000 // 1 hora en milisegundos

export const saveToCache = (key, data) => {
  const cacheItem = {
    data,
    timestamp: Date.now(),
    expiry: Date.now() + CACHE_DURATION,
  }

  try {
    localStorage.setItem(`cache_${key}`, JSON.stringify(cacheItem))
  } catch (error) {
    console.warn("Error al guardar en cache:", error)
  }
}

export const getFromCache = (key) => {
  try {
    const cached = localStorage.getItem(`cache_${key}`)
    if (!cached) return null

    const cacheItem = JSON.parse(cached)

    // Verificar si el cache ha expirado
    if (Date.now() > cacheItem.expiry) {
      localStorage.removeItem(`cache_${key}`)
      return null
    }

    return cacheItem.data
  } catch (error) {
    console.warn("Error al obtener del cache:", error)
    return null
  }
}

export const clearCache = () => {
  try {
    const keys = Object.keys(localStorage)
    keys.forEach((key) => {
      if (key.startsWith("cache_")) {
        localStorage.removeItem(key)
      }
    })
  } catch (error) {
    console.warn("Error al limpiar cache:", error)
  }
}
