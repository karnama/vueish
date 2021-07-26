import type { Plugin } from 'vite';
import type { Settings } from './buildWebTypes';
import buildWebTypes from './buildWebTypes';

const createWebTypes = (settings: Partial<Settings> = {}): Plugin => {
    return {
        name: createWebTypes.name,
        enforce: 'post',
        apply: 'build',
        closeBundle: async () => buildWebTypes(Object.assign(
            {
                componentSrcGlobPattern: 'src/components/**/UI*.vue',
                directiveSrcGlobPattern: 'src/directives/**/index.ts',
                dest: './dist',
                fileName: 'web-types.json'
            },
            settings
        ))
    };
};

export default createWebTypes;
