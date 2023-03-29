import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({  
      registerType: 'prompt',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],  
      manifest: {  
        name: 'Diplomka',  
        short_name: 'diplomka',  
        description: 'Diplomka for PVKU college',
        display: "standalone",
        theme_color: "#FFFFFF",
        background_color: "#FFFFFF",
        scope: "/",
        start_url: "/",
        icons: [  
          {
            src: "/engine/assets/ico/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/engine/assets/ico/android-chrome-256x256.png",
            sizes: "256x256",
            type: "image/png"
          },
          {
            src: "/engine/assets/ico/android-chrome-384x384.png",
            sizes: "384x384",
            type: "image/png"
          },
          {
            src: "/engine/assets/ico/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ],  
      },
      workbox: {
        //swDest: 'sw.js',
        sourcemap: false,
        //importWorkboxFrom: "cdn",
        cleanupOutdatedCaches: true,
        maximumFileSizeToCacheInBytes: 100 * 1024 * 1024,
        runtimeCaching: [
          {
            handler: 'NetworkOnly',
            urlPattern: /\/api\/.*\/*.json/,
            method: 'POST',
            options: {
              backgroundSync: {
                name: 'myQueueName',
                options: {
                  maxRetentionTime: 24 * 60
                }
              }
            }
          }
        ]
      } 
    }),
  ],
  server: {
    port: '8080'
  },
	build: {
    assetsDir: './engine/app',
    sourcemap: 'inline',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
