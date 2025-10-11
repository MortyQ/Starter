import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath} from "url";

export default ({mode}: any) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    return defineConfig({
        plugins: [vue()],
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
