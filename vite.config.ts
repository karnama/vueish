import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import createWebTypes from './utils/web-types/createWebTypes';
import { version } from './package.json';

export default defineConfig({
    resolve: {
        alias: {
            'types': path.resolve(__dirname, '/types'),
            // eslint-disable-next-line @typescript-eslint/naming-convention
            '@': path.resolve(__dirname, '/src'),
            'components': path.resolve(__dirname, 'src/components'),
            'helpers': path.resolve(__dirname, 'src/helpers'),
            'composables': path.resolve(__dirname, 'src/composables')
        }
    },
    define: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __VUEISH_VERSION__: JSON.stringify(version)
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/main.ts'),
            name: 'vueish',
            formats: ['cjs', 'es']
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
    plugins: [
        vue(),
        createWebTypes()
    ]
});
