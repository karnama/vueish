/* eslint-disable no-console */
import path from 'path';
import glob from 'glob';
import type { HtmlTag, HtmlAttribute } from './web-types';
import type JSONSchemaForWebTypes from './web-types';
import fs from 'fs';
import { name, version } from '../package.json';
import { parse as parseVueComponent } from 'vue-docgen-api';
import { parse as parseModule } from '@babel/parser';
import {
    Aliases,
    Description,
    DocUrl,
    HtmlAttributeDefault,
    HtmlAttributeRequired,
    HtmlAttributeValue, HtmlAttributeVueArgument, HtmlAttributeVueModifier,
    Name, Source
} from './web-types';

export interface Settings {
    componentSrcGlobPattern?: string;
    directiveSrcGlobPattern?: string;
    dest: string;
    fileName: string;
    ignore?: string | string[];
}


async function getFiles(globPattern: string, ignorePatterns: string[] = []): Promise<string[]> {
    return Promise.resolve(
        glob.sync(process.cwd() + path.sep + globPattern, { ignore: ignorePatterns })
    ).then(paths => paths.sort());
}

function ensureRelative(path: string) {
    // The .replace() is a fix for paths that end up like"./src\\components\\General\\VerticalButton.vue"
    // on windows machines.
    return (path.startsWith('./') || path.startsWith('../') ? path : './' + path).replace(/\\/g, '/');
}

// todo - add watch option
async function buildTag(fullPath: string): Promise<HtmlTag> {
    const parsed = await parseVueComponent(fullPath);

    let description = parsed.description?.trim() ?? '';

    parsed.docsBlocks?.forEach(block => {
        if (description.length > 0) {
            description += '\n\n';
        }
        description += block;
    });

    return {
        attributes: parsed.props?.map(prop => ({
            name: prop.name,
            required: prop.required,
            description: prop.description,
            value: {
                kind: 'expression',
                type: prop.type?.name ?? 'any'
            },
            default: prop.defaultValue?.value
        })),
        description,
        events: parsed.events?.map(event => ({
            name: event.name,
            description: event.description
        })),
        name: parsed.displayName,
        slots: parsed.slots?.map(slot => ({
            name: slot.name,
            description: slot.description
        })),
        source: {
            module: ensureRelative(path.relative(process.cwd(), fullPath)),
            symbol: parsed.exportName
        }
    };
}
async function buildAttribute(fullPath: string): Promise<HtmlAttribute> {
    // this gets the name correctly
    const directive = await parseVueComponent('/' + fullPath + '/');

    return {
        name: `v-${directive.displayName}`
        // description?: Description;
        // 'doc-url'?: DocUrl;
        // default?: HtmlAttributeDefault;
        // required?: HtmlAttributeRequired;
        // value?: HtmlAttributeValue;
        // source?: Source;
        // 'vue-argument'?: HtmlAttributeVueArgument;
        // 'vue-modifiers'?: HtmlAttributeVueModifier[];
    };
}

const webTypes: JSONSchemaForWebTypes = {
    $schema: 'https://json.schemastore.org/web-types',
    framework: 'vue',
    name: name,
    version: version,
    contributions: {
        html: {
            'description-markup': 'markdown',
            'types-syntax': 'typescript',
            tags: []
        }
    }
};

export default async function buildWebTypes(settings: Settings): Promise<void> {
    console.group('Building web-types:');
    const ignores = settings.ignore
        ? Array.isArray(settings.ignore) ? settings.ignore : [settings.ignore]
        : [];
    const promises: Promise<HtmlTag | HtmlAttribute>[] = [];

    if (settings.componentSrcGlobPattern) {
        promises.push(
            ...await getFiles(settings.componentSrcGlobPattern, ignores)
                .then(paths => {
                    console.log(`Resolved ${paths.length} component(s)`);
                    return paths;
                })
                .then(paths => paths.map(async fullPath => buildTag(fullPath)))
        );
    }

    // if (settings.directiveSrcGlobPattern) {
    //     promises.push(
    //         ...await getFiles(settings.directiveSrcGlobPattern, ignores)
    //             .then(paths => {
    //                 console.log(`Resolved ${paths.length} directive(s)`);
    //                 return paths;
    //             })
    //             .then(paths => paths.map(async fullPath => buildAttribute(fullPath)))
    //     );
    // }

    const tags: HtmlTag[] = await Promise.all(promises);
    console.log('Built web-types definitions.');

    if (tags.length) {
        webTypes.contributions.html!.tags = tags;
    }

    if (!fs.existsSync(process.cwd() + path.sep + settings.dest)) {
        fs.mkdirSync(process.cwd() + path.sep + settings.dest);
    }

    const absolutePath = path.resolve(process.cwd() + path.sep + settings.dest + path.sep + settings.fileName);
    fs.writeFileSync(
        absolutePath,
        JSON.stringify(webTypes, null, 4),
        { flag: 'w', encoding: 'utf-8' }
    );
    console.log('Wrote web-types file to ' + absolutePath);
    console.groupEnd();
}
