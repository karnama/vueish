import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '/src'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@helpers': path.resolve(__dirname, 'src/helpers'),
            '@composables': path.resolve(__dirname, 'src/composables')
        }
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/main.ts'),
            name: 'vueish'
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ['vue'],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    vue: 'Vue'
                }
            }
        }
    },
    plugins: [vue()]
});
