import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import autoprefixer from 'autoprefixer'
import { URL, fileURLToPath } from 'node:url'
import tailwind from 'tailwindcss'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
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
            exclude: ['**/components/**'],
        }),
        vueJsx(),
        vue(),
        VueDevTools(),
        Layouts({
            pagesDirs: 'src/pages',
            defaultLayout: 'Default',
            layoutsDirs: 'src/layouts',
        }),
        AutoImport({
            imports: [
                'vue',
                'vue-i18n',
                '@vueuse/head',
                '@vueuse/core',
                VueRouterAutoImports,
                {
                    'vue-router/auto': ['useLink'],
                },
            ],
            dts: 'auto-imports.d.ts',
            vueTemplate: true,
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
