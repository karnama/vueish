import type { Plugin } from 'vite';
import type { Settings } from './buildWebTypes';
import buildWebTypes from './buildWebTypes';

const createWebTypes = (settings: Partial<Settings> = {}): Plugin => {
    return {
        name: createWebTypes.name,
        enforce: 'post',
        apply: 'build',
        closeBundle: async () => {
            /* eslint-disable */
            require('ts-node').register({ lazy: true, transpileOnly: true, compilerOptions: { "module": "CommonJS" } });
            /* eslint-enable */

            await buildWebTypes(Object.assign(
                {
                    componentSrcGlobPattern: 'src/components/**/UI*.vue',
                    directiveSrcGlobPattern: 'src/directives/**/index.ts',
                    dest: './dist',
                    fileName: 'web-types.json',
                    webTypesFileName: 'web-types.ts'
                },
                settings
            ));
        }
    };
};

export default createWebTypes;
