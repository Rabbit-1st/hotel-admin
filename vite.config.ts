import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
    css: {
    // css预处理器
    preprocessorOptions: {
      // scss: {
        // 引入 mixin.scss 这样就可以在全局中使用 mixin.scss中预定义的变量了
        // 给导入的路径最后加上 ; 
        // additionalData: '@import "@/assets/style/mixin.scss";'
        
      // }
      scss: {
        additionalData: `
        @use "@/assets/style/mixin.scss" as *;
        `
      }
      
    }
  },
  resolve: {
    alias: {
      // '@': path.resolve(__dirname, './src')
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
