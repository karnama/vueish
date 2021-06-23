/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-var-requires */
import JSONSchemaForWebTypes, { HtmlTag } from './types/utilities/web-types';
import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';
import minimist from 'minimist';
import { name } from '../package.json';

export interface Settings {
    srcGlobPattern: string;
    dest: string;
    fileName: string;
}

const args = minimist(process.argv.slice(2), {
    default: {
        srcGlobPattern: 'src/components/**/web-type.ts',
        dest: './dist',
        fileName: 'web-types.json'
    }
});

const options: Settings = {
    srcGlobPattern: args.srcGlobPattern,
    dest: args.dest,
    fileName: args.fileName
};

const webTypes: JSONSchemaForWebTypes = {
    $schema: 'https://json.schemastore.org/web-types',
    framework: 'vue',
    name: name,
    version: '3.0.0',
    contributions: {
        html: {
            'types-syntax': 'typescript',
            tags: []
        }
    }
};

const writeFile = (content: string) => {
    if (!fs.existsSync(process.cwd() + path.sep + options.dest)) {
        fs.mkdirSync(process.cwd() + path.sep + options.dest);
    }

    fs.writeFileSync(
        path.resolve(process.cwd() + path.sep + options.dest + path.sep + options.fileName),
        content,
        { flag: 'w' }
    );
};

glob(
    process.cwd() + path.sep + options.srcGlobPattern,
    (_err, files) => {
        webTypes.contributions.html!.tags = files
            .map(path => {
                let tag = require(path).default as HtmlTag | HtmlTag[];
                tag = Array.isArray(tag) ? tag : [tag];
                return tag;
            })
            .flat();

        writeFile(JSON.stringify(webTypes, null, 4));
    }
);
