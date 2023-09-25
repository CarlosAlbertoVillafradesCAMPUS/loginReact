import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

const env = loadEnv("development", process.cwd(), "VITE")
const my_front = JSON.parse(env.VITE_MY_FRONTEND)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:my_front.port,
    host: my_front.host
  }
})
