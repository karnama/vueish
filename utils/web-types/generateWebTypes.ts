import type { ParsedArgs } from 'minimist';
import minimist from 'minimist';
import type { Settings } from './buildWebTypes';
import buildWebTypes from './buildWebTypes';

const args = minimist(process.argv.slice(2), {
    default: {
        componentSrcGlobPattern: 'src/components/**/UI*.vue',
        directiveSrcGlobPattern: 'src/directives/**/index.ts',
        dest: './dist',
        fileName: 'web-types.json',
        webTypesFileName: 'web-types.ts'
    }
}) as ParsedArgs & Settings;

void buildWebTypes({
    componentSrcGlobPattern: args.componentSrcGlobPattern,
    directiveSrcGlobPattern: args.directiveSrcGlobPattern,
    dest: args.dest,
    fileName: args.fileName,
    ignore: args.fileName,
    webTypesFileName: args.webTypesFileName
});
