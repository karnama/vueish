import type { Plugin } from 'vite';
import { spawn } from 'child_process';
import type { Settings } from '@/generateWebTypes';

const createWebTypes = (settings: Partial<Settings> = {}): Plugin => {
    return {
        name: createWebTypes.name,
        apply: 'build',
        buildEnd: () => {
            let command = 'npm run generate:web-types';

            Object.keys(settings).forEach(key => {
                command += ` --${key}=${settings[key as keyof Settings]!}`;
            });

            spawn(command);
        }
    };
};

export default createWebTypes;
