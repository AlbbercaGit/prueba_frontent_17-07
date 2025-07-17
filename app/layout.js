import "./globals.css"

export const metadata = {
  title: "MobileShop - Tienda de Móviles",
  description: "Aplicación para comprar dispositivos móviles",
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      {/* Añadimos la clase scanline-background al body */}
      <body className="antialiased scanline-background">{children}</body>
    </html>
  )
}
