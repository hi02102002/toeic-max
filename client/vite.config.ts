import { URL, fileURLToPath } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'

import VueDevTools from 'vite-plugin-vue-devtools'
import Layouts from 'vite-plugin-vue-layouts'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        VueRouter({
            routesFolder: [
                {
                    src: 'src/pages',
                    path: '',
                },
            ],
        }),
        vue(),
        vueJsx(),
        VueDevTools(),
        Layouts({
            pagesDirs: 'src/pages',
            defaultLayout: 'Default',
            layoutsDirs: 'src/layouts',
        }),
    ],
    css: {
        postcss: {
            plugins: [tailwind(), autoprefixer()],
        },
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
})
