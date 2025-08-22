import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración para WSL: permite que Windows vea el frontend
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Escucha en todas las interfaces
    port: 3000,
    strictPort: true,  // falla si el puerto 3000 ya está ocupado
    open: true         // abre el navegador automáticamente
  }
})
