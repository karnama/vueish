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
            await import('ts-node').then(tsNode => {
                tsNode.register({ project: './tsconfig.node.json' });
            });
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
