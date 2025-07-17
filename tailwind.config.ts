/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    // Asegúrate de que esta línea esté presente si tienes archivos en la raíz o en otras carpetas
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Tus colores retro personalizados
        "retro-pink": "var(--retro-pink)",
        "retro-cyan": "var(--retro-cyan)",
        "retro-yellow": "var(--retro-yellow)",
        "retro-blue": "var(--retro-blue)",
        "retro-purple": "var(--retro-purple)",
        "retro-mint": "var(--retro-mint)",
        "retro-orange": "var(--retro-orange)",
        "retro-gray": "var(--retro-gray)",
        "retro-dark": "var(--retro-dark)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // Keyframes para los toasts de shadcn/ui (asegúrate de que estén aquí)
        hide: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "slide-in": {
          from: { transform: "translateX(calc(100% + var(--viewport-padding)))" },
          to: { transform: "translateX(0)" },
        },
        "swipe-out": {
          from: { transform: "translateX(var(--radix-toast-swipe-end-x))" },
          to: { transform: "translateX(calc(100% + var(--viewport-padding)))" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // Animaciones para los toasts de shadcn/ui (asegúrate de que estén aquí)
        hide: "hide 200ms ease-in forwards",
        "slide-in": "slide-in 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "swipe-out": "swipe-out 100ms ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
