// vite.config.ts
import vue from "file:///E:/toeic-max/client/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import autoprefixer from "file:///E:/toeic-max/client/node_modules/autoprefixer/lib/autoprefixer.js";
import { URL, fileURLToPath } from "node:url";
import tailwind from "file:///E:/toeic-max/client/node_modules/tailwindcss/lib/index.js";
import AutoImport from "file:///E:/toeic-max/client/node_modules/unplugin-auto-import/dist/vite.js";
import { VueRouterAutoImports } from "file:///E:/toeic-max/client/node_modules/unplugin-vue-router/dist/index.mjs";
import VueRouter from "file:///E:/toeic-max/client/node_modules/unplugin-vue-router/dist/vite.mjs";
import { defineConfig } from "file:///E:/toeic-max/client/node_modules/vite/dist/node/index.js";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFx0b2VpYy1tYXhcXFxcY2xpZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFx0b2VpYy1tYXhcXFxcY2xpZW50XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi90b2VpYy1tYXgvY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgYXV0b3ByZWZpeGVyIGZyb20gJ2F1dG9wcmVmaXhlcidcbmltcG9ydCB7IFVSTCwgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ25vZGU6dXJsJ1xuaW1wb3J0IHRhaWx3aW5kIGZyb20gJ3RhaWx3aW5kY3NzJ1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcbmltcG9ydCB7IFZ1ZVJvdXRlckF1dG9JbXBvcnRzIH0gZnJvbSAndW5wbHVnaW4tdnVlLXJvdXRlcidcbmltcG9ydCBWdWVSb3V0ZXIgZnJvbSAndW5wbHVnaW4tdnVlLXJvdXRlci92aXRlJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCBWdWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXG5pbXBvcnQgTGF5b3V0cyBmcm9tICd2aXRlLXBsdWdpbi12dWUtbGF5b3V0cydcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgcGx1Z2luczogW1xuICAgICAgICBWdWVSb3V0ZXIoe1xuICAgICAgICAgICAgcm91dGVzRm9sZGVyOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzcmM6ICdzcmMvcGFnZXMnLFxuICAgICAgICAgICAgICAgICAgICBwYXRoOiAnJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGV4Y2x1ZGU6IFsnKiovY29tcG9uZW50cy8qKiddLFxuICAgICAgICB9KSxcbiAgICAgICAgdnVlKCksXG4gICAgICAgIFZ1ZURldlRvb2xzKCksXG4gICAgICAgIExheW91dHMoe1xuICAgICAgICAgICAgcGFnZXNEaXJzOiAnc3JjL3BhZ2VzJyxcbiAgICAgICAgICAgIGRlZmF1bHRMYXlvdXQ6ICdEZWZhdWx0JyxcbiAgICAgICAgICAgIGxheW91dHNEaXJzOiAnc3JjL2xheW91dHMnLFxuICAgICAgICB9KSxcbiAgICAgICAgQXV0b0ltcG9ydCh7XG4gICAgICAgICAgICBpbXBvcnRzOiBbXG4gICAgICAgICAgICAgICAgJ3Z1ZScsXG4gICAgICAgICAgICAgICAgJ3Z1ZS1pMThuJyxcbiAgICAgICAgICAgICAgICAnQHZ1ZXVzZS9oZWFkJyxcbiAgICAgICAgICAgICAgICAnQHZ1ZXVzZS9jb3JlJyxcbiAgICAgICAgICAgICAgICBWdWVSb3V0ZXJBdXRvSW1wb3J0cyxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICd2dWUtcm91dGVyL2F1dG8nOiBbJ3VzZUxpbmsnXSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGR0czogJ2F1dG8taW1wb3J0cy5kLnRzJyxcbiAgICAgICAgICAgIHZ1ZVRlbXBsYXRlOiB0cnVlLFxuICAgICAgICB9KSxcbiAgICBdLFxuICAgIGNzczoge1xuICAgICAgICBwb3N0Y3NzOiB7XG4gICAgICAgICAgICBwbHVnaW5zOiBbdGFpbHdpbmQoKSwgYXV0b3ByZWZpeGVyKCldLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgICBhbGlhczoge1xuICAgICAgICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgICAgIH0sXG4gICAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWlQLE9BQU8sU0FBUztBQUNqUSxPQUFPLGtCQUFrQjtBQUN6QixTQUFTLEtBQUsscUJBQXFCO0FBQ25DLE9BQU8sY0FBYztBQUNyQixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLDRCQUE0QjtBQUNyQyxPQUFPLGVBQWU7QUFDdEIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxpQkFBaUI7QUFDeEIsT0FBTyxhQUFhO0FBVCtILElBQU0sMkNBQTJDO0FBWXBNLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLFNBQVM7QUFBQSxJQUNMLFVBQVU7QUFBQSxNQUNOLGNBQWM7QUFBQSxRQUNWO0FBQUEsVUFDSSxLQUFLO0FBQUEsVUFDTCxNQUFNO0FBQUEsUUFDVjtBQUFBLE1BQ0o7QUFBQSxNQUNBLFNBQVMsQ0FBQyxrQkFBa0I7QUFBQSxJQUNoQyxDQUFDO0FBQUEsSUFDRCxJQUFJO0FBQUEsSUFDSixZQUFZO0FBQUEsSUFDWixRQUFRO0FBQUEsTUFDSixXQUFXO0FBQUEsTUFDWCxlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsSUFDakIsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1AsU0FBUztBQUFBLFFBQ0w7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFVBQ0ksbUJBQW1CLENBQUMsU0FBUztBQUFBLFFBQ2pDO0FBQUEsTUFDSjtBQUFBLE1BQ0EsS0FBSztBQUFBLE1BQ0wsYUFBYTtBQUFBLElBQ2pCLENBQUM7QUFBQSxFQUNMO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDRCxTQUFTO0FBQUEsTUFDTCxTQUFTLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQztBQUFBLElBQ3hDO0FBQUEsRUFDSjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0gsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN4RDtBQUFBLEVBQ0o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
