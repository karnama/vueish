import minimist, { ParsedArgs } from 'minimist';
import buildWebTypes, { Settings } from './buildWebTypes';

const args = minimist(process.argv.slice(2), {
    default: {
        srcGlobPattern: 'src/components/**/UI*.vue',
        dest: './dist',
        fileName: 'web-types.json',
        ignore: 'UIFile.vue'
    }
}) as ParsedArgs & Settings;

void buildWebTypes({
    srcGlobPattern: args.srcGlobPattern,
    dest: args.dest,
    fileName: args.fileName,
    ignore: args.fileName
});
