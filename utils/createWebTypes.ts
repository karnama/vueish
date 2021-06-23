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
                srcGlobPattern: 'src/components/**/UI*.vue',
                dest: './dist',
                fileName: 'web-types.json',
                ignore: 'UIFile.vue'
            },
            settings
        ))
    };
};

export default createWebTypes;
