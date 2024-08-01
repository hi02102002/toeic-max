import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import autoprefixer from 'autoprefixer'
import { URL, fileURLToPath } from 'node:url'
import tailwind from 'tailwindcss'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { VitePWA } from 'vite-plugin-pwa'
import VueDevTools from 'vite-plugin-vue-devtools'
import Layouts from 'vite-plugin-vue-layouts'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        ViteImageOptimizer(),
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
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            workbox: {
                cleanupOutdatedCaches: true,
                globPatterns: [
                    '**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2,jpg,jpeg}',
                ],
            },
            manifest: {
                name: 'ToeicMeow',
                short_name: 'ToeicMeow',
                icons: [
                    {
                        src: '/pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'any',
                    },
                    {
                        src: '/pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any',
                    },
                    {
                        src: '/pwa-maskable-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                    {
                        src: '/pwa-maskable-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                ],
                start_url: '/',
                display: 'fullscreen',
                background_color: '#FFFFFF',
                theme_color: '#FFFFFF',
                description:
                    'ToeicMeow is a fun and interactive TOEIC learning app that helps you improve your English skills with engaging exercises and a cute cat-themed interface.',
            },
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
