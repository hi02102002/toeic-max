// vite.config.ts
import vue from "file:///E:/toeic-max/client/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///E:/toeic-max/client/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import autoprefixer from "file:///E:/toeic-max/client/node_modules/autoprefixer/lib/autoprefixer.js";
import { URL, fileURLToPath } from "node:url";
import tailwind from "file:///E:/toeic-max/client/node_modules/tailwindcss/lib/index.js";
import AutoImport from "file:///E:/toeic-max/client/node_modules/unplugin-auto-import/dist/vite.js";
import { VueRouterAutoImports } from "file:///E:/toeic-max/client/node_modules/unplugin-vue-router/dist/index.mjs";
import VueRouter from "file:///E:/toeic-max/client/node_modules/unplugin-vue-router/dist/vite.mjs";
import { defineConfig } from "file:///E:/toeic-max/client/node_modules/vite/dist/node/index.js";
import { VitePWA } from "file:///E:/toeic-max/client/node_modules/vite-plugin-pwa/dist/index.js";
import VueDevTools from "file:///E:/toeic-max/client/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import Layouts from "file:///E:/toeic-max/client/node_modules/vite-plugin-vue-layouts/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///E:/toeic-max/client/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    VueRouter({
      routesFolder: [
        {
          src: "src/pages",
          path: ""
        }
      ],
      exclude: ["**/components/**"]
    }),
    vueJsx(),
    vue(),
    VueDevTools(),
    Layouts({
      pagesDirs: "src/pages",
      defaultLayout: "Default",
      layoutsDirs: "src/layouts"
    }),
    AutoImport({
      imports: [
        "vue",
        "vue-i18n",
        "@vueuse/head",
        "@vueuse/core",
        VueRouterAutoImports,
        {
          "vue-router/auto": ["useLink"]
        }
      ],
      dts: "auto-imports.d.ts",
      vueTemplate: true
    }),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: [
          "**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2,jpg,jpeg}"
        ]
      },
      manifest: {
        name: "ELand",
        short_name: "ELand",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/pwa-maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ],
        start_url: "/app",
        display: "standalone",
        background_color: "#FFFFFF",
        theme_color: "#FFFFFF",
        description: `Eland is an online platform for mastering the TOEIC exam. The "E" stands for "English," emphasizing top-quality language learning. Eland offers interactive lessons, practice tests, and personalized plans. With engaging multimedia content, Eland makes TOEIC preparation easy and enjoyable. Whether you're starting out or improving your score, Eland provides the tools and support needed for success.`
      }
    })
  ],
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()]
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFx0b2VpYy1tYXhcXFxcY2xpZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFx0b2VpYy1tYXhcXFxcY2xpZW50XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi90b2VpYy1tYXgvY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXG5pbXBvcnQgYXV0b3ByZWZpeGVyIGZyb20gJ2F1dG9wcmVmaXhlcidcbmltcG9ydCB7IFVSTCwgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ25vZGU6dXJsJ1xuaW1wb3J0IHRhaWx3aW5kIGZyb20gJ3RhaWx3aW5kY3NzJ1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcbmltcG9ydCB7IFZ1ZVJvdXRlckF1dG9JbXBvcnRzIH0gZnJvbSAndW5wbHVnaW4tdnVlLXJvdXRlcidcbmltcG9ydCBWdWVSb3V0ZXIgZnJvbSAndW5wbHVnaW4tdnVlLXJvdXRlci92aXRlJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnXG5pbXBvcnQgVnVlRGV2VG9vbHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzJ1xuaW1wb3J0IExheW91dHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWxheW91dHMnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAgIHBsdWdpbnM6IFtcbiAgICAgICAgVnVlUm91dGVyKHtcbiAgICAgICAgICAgIHJvdXRlc0ZvbGRlcjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc3JjOiAnc3JjL3BhZ2VzJyxcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogJycsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBleGNsdWRlOiBbJyoqL2NvbXBvbmVudHMvKionXSxcbiAgICAgICAgfSksXG4gICAgICAgIHZ1ZUpzeCgpLFxuICAgICAgICB2dWUoKSxcbiAgICAgICAgVnVlRGV2VG9vbHMoKSxcbiAgICAgICAgTGF5b3V0cyh7XG4gICAgICAgICAgICBwYWdlc0RpcnM6ICdzcmMvcGFnZXMnLFxuICAgICAgICAgICAgZGVmYXVsdExheW91dDogJ0RlZmF1bHQnLFxuICAgICAgICAgICAgbGF5b3V0c0RpcnM6ICdzcmMvbGF5b3V0cycsXG4gICAgICAgIH0pLFxuICAgICAgICBBdXRvSW1wb3J0KHtcbiAgICAgICAgICAgIGltcG9ydHM6IFtcbiAgICAgICAgICAgICAgICAndnVlJyxcbiAgICAgICAgICAgICAgICAndnVlLWkxOG4nLFxuICAgICAgICAgICAgICAgICdAdnVldXNlL2hlYWQnLFxuICAgICAgICAgICAgICAgICdAdnVldXNlL2NvcmUnLFxuICAgICAgICAgICAgICAgIFZ1ZVJvdXRlckF1dG9JbXBvcnRzLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ3Z1ZS1yb3V0ZXIvYXV0byc6IFsndXNlTGluayddLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgZHRzOiAnYXV0by1pbXBvcnRzLmQudHMnLFxuICAgICAgICAgICAgdnVlVGVtcGxhdGU6IHRydWUsXG4gICAgICAgIH0pLFxuICAgICAgICBWaXRlUFdBKHtcbiAgICAgICAgICAgIHJlZ2lzdGVyVHlwZTogJ2F1dG9VcGRhdGUnLFxuICAgICAgICAgICAgaW5qZWN0UmVnaXN0ZXI6ICdhdXRvJyxcbiAgICAgICAgICAgIHdvcmtib3g6IHtcbiAgICAgICAgICAgICAgICBjbGVhbnVwT3V0ZGF0ZWRDYWNoZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgZ2xvYlBhdHRlcm5zOiBbXG4gICAgICAgICAgICAgICAgICAgICcqKi8qLntqcyxjc3MsaHRtbCxpY28scG5nLHN2Zyxqc29uLHZ1ZSx0eHQsd29mZjIsanBnLGpwZWd9JyxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1hbmlmZXN0OiB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ0VMYW5kJyxcbiAgICAgICAgICAgICAgICBzaG9ydF9uYW1lOiAnRUxhbmQnLFxuICAgICAgICAgICAgICAgIGljb25zOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogJy9wd2EtMTkyeDE5Mi5wbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZXM6ICcxOTJ4MTkyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHVycG9zZTogJ2FueScsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogJy9wd2EtNTEyeDUxMi5wbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZXM6ICc1MTJ4NTEyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHVycG9zZTogJ2FueScsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogJy9wd2EtbWFza2FibGUtMTkyeDE5Mi5wbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZXM6ICcxOTJ4MTkyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHVycG9zZTogJ21hc2thYmxlJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiAnL3B3YS1tYXNrYWJsZS01MTJ4NTEyLnBuZycsXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplczogJzUxMng1MTInLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICAgICAgICAgICAgICBwdXJwb3NlOiAnbWFza2FibGUnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc3RhcnRfdXJsOiAnL2FwcCcsXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ3N0YW5kYWxvbmUnLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRfY29sb3I6ICcjRkZGRkZGJyxcbiAgICAgICAgICAgICAgICB0aGVtZV9jb2xvcjogJyNGRkZGRkYnLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgICAgICAgICAgICAnRWxhbmQgaXMgYW4gb25saW5lIHBsYXRmb3JtIGZvciBtYXN0ZXJpbmcgdGhlIFRPRUlDIGV4YW0uIFRoZSBcIkVcIiBzdGFuZHMgZm9yIFwiRW5nbGlzaCxcIiBlbXBoYXNpemluZyB0b3AtcXVhbGl0eSBsYW5ndWFnZSBsZWFybmluZy4gRWxhbmQgb2ZmZXJzIGludGVyYWN0aXZlIGxlc3NvbnMsIHByYWN0aWNlIHRlc3RzLCBhbmQgcGVyc29uYWxpemVkIHBsYW5zLiBXaXRoIGVuZ2FnaW5nIG11bHRpbWVkaWEgY29udGVudCwgRWxhbmQgbWFrZXMgVE9FSUMgcHJlcGFyYXRpb24gZWFzeSBhbmQgZW5qb3lhYmxlLiBXaGV0aGVyIHlvdVxcJ3JlIHN0YXJ0aW5nIG91dCBvciBpbXByb3ZpbmcgeW91ciBzY29yZSwgRWxhbmQgcHJvdmlkZXMgdGhlIHRvb2xzIGFuZCBzdXBwb3J0IG5lZWRlZCBmb3Igc3VjY2Vzcy4nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgXSxcbiAgICBjc3M6IHtcbiAgICAgICAgcG9zdGNzczoge1xuICAgICAgICAgICAgcGx1Z2luczogW3RhaWx3aW5kKCksIGF1dG9wcmVmaXhlcigpXSxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHJlc29sdmU6IHtcbiAgICAgICAgYWxpYXM6IHtcbiAgICAgICAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgICB9LFxuICAgIH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpUCxPQUFPLFNBQVM7QUFDalEsT0FBTyxZQUFZO0FBQ25CLE9BQU8sa0JBQWtCO0FBQ3pCLFNBQVMsS0FBSyxxQkFBcUI7QUFDbkMsT0FBTyxjQUFjO0FBQ3JCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsNEJBQTRCO0FBQ3JDLE9BQU8sZUFBZTtBQUN0QixTQUFTLG9CQUFvQjtBQUM3QixTQUFTLGVBQWU7QUFDeEIsT0FBTyxpQkFBaUI7QUFDeEIsT0FBTyxhQUFhO0FBWCtILElBQU0sMkNBQTJDO0FBY3BNLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLFNBQVM7QUFBQSxJQUNMLFVBQVU7QUFBQSxNQUNOLGNBQWM7QUFBQSxRQUNWO0FBQUEsVUFDSSxLQUFLO0FBQUEsVUFDTCxNQUFNO0FBQUEsUUFDVjtBQUFBLE1BQ0o7QUFBQSxNQUNBLFNBQVMsQ0FBQyxrQkFBa0I7QUFBQSxJQUNoQyxDQUFDO0FBQUEsSUFDRCxPQUFPO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixZQUFZO0FBQUEsSUFDWixRQUFRO0FBQUEsTUFDSixXQUFXO0FBQUEsTUFDWCxlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsSUFDakIsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1AsU0FBUztBQUFBLFFBQ0w7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFVBQ0ksbUJBQW1CLENBQUMsU0FBUztBQUFBLFFBQ2pDO0FBQUEsTUFDSjtBQUFBLE1BQ0EsS0FBSztBQUFBLE1BQ0wsYUFBYTtBQUFBLElBQ2pCLENBQUM7QUFBQSxJQUNELFFBQVE7QUFBQSxNQUNKLGNBQWM7QUFBQSxNQUNkLGdCQUFnQjtBQUFBLE1BQ2hCLFNBQVM7QUFBQSxRQUNMLHVCQUF1QjtBQUFBLFFBQ3ZCLGNBQWM7QUFBQSxVQUNWO0FBQUEsUUFDSjtBQUFBLE1BQ0o7QUFBQSxNQUNBLFVBQVU7QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLFlBQVk7QUFBQSxRQUNaLE9BQU87QUFBQSxVQUNIO0FBQUEsWUFDSSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDYjtBQUFBLFVBQ0E7QUFBQSxZQUNJLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNiO0FBQUEsVUFDQTtBQUFBLFlBQ0ksS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sU0FBUztBQUFBLFVBQ2I7QUFBQSxVQUNBO0FBQUEsWUFDSSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDYjtBQUFBLFFBQ0o7QUFBQSxRQUNBLFdBQVc7QUFBQSxRQUNYLFNBQVM7QUFBQSxRQUNULGtCQUFrQjtBQUFBLFFBQ2xCLGFBQWE7QUFBQSxRQUNiLGFBQ0k7QUFBQSxNQUNSO0FBQUEsSUFDSixDQUFDO0FBQUEsRUFDTDtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0QsU0FBUztBQUFBLE1BQ0wsU0FBUyxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUM7QUFBQSxJQUN4QztBQUFBLEVBQ0o7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNMLE9BQU87QUFBQSxNQUNILEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDeEQ7QUFBQSxFQUNKO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
