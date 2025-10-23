import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath} from "url";
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'

export default ({mode}: any) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    return defineConfig({
        plugins: [vue(),
            Components({
                resolvers: [
                    IconsResolver({
                        prefix: 'icon',
                    }),
                ],
            }),
            Icons({
                autoInstall: true,
                compiler: 'vue3',
            })
        ],
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler', // Use modern Sass API (fixes deprecation warning)
                },
            },
        },
        resolve: {
            alias: {
                "@": fileURLToPath(new URL("./src", import.meta.url)),
            },
        },
        define: {"process.env": {}},
        server: {
            port: 3000,
            open: true,
        },
        build: {
            chunkSizeWarningLimit: 1100,
            sourcemap: true,
            rollupOptions: {
                output: {
                    manualChunks: {
                        vendor: ["vue", "vue-router"],
                    },
                },
            },
        },
    })
}
