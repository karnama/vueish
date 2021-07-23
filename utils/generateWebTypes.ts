import type { ParsedArgs } from 'minimist';
import minimist from 'minimist';
import type { Settings } from './buildWebTypes';
import buildWebTypes from './buildWebTypes';

const args = minimist(process.argv.slice(2), {
    default: {
        srcGlobPattern: 'src/components/**/UI*.vue',
        dest: './dist',
        fileName: 'web-types.json'
    }
}) as ParsedArgs & Settings;

void buildWebTypes({
    srcGlobPattern: args.srcGlobPattern,
    dest: args.dest,
    fileName: args.fileName,
    ignore: args.fileName
});
