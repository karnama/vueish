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
    webTypesFileName?: string;
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
async function buildTag(fullPath: string, webTypesFile: string): Promise<HtmlTag> {
    const parentFolder = path.dirname(fullPath);
    const parsed = await parseVueComponent(fullPath);

    let description = parsed.description?.trim() ?? '';

    parsed.docsBlocks?.forEach(block => {
        if (description.length > 0) {
            description += '\n\n';
        }
        description += block;
    });

    const tag: HtmlTag = {
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

    if (fs.existsSync(parentFolder + path.sep + webTypesFile)) {
        Object.assign(
            tag,
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            (require(parentFolder + path.sep + webTypesFile) as Record<'default', HtmlTag>).default
        );
    }

    return tag;
}
async function buildAttribute(fullPath: string, webTypesFile: string): Promise<HtmlAttribute> {
    const parentFolder = path.dirname(fullPath);
    const attribute: HtmlAttribute = { name: `v-${path.basename(parentFolder)}` };
    if (fs.existsSync(parentFolder + path.sep + webTypesFile)) {
        Object.assign(
            attribute,
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            (require(parentFolder + path.sep + webTypesFile) as Record<'default', HtmlAttribute>).default
        );
    }

    return  Promise.resolve(attribute);
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
    let componentPromises: Promise<HtmlTag>[] = [];
    let directivePromises: Promise<HtmlAttribute>[] = [];

    if (settings.componentSrcGlobPattern) {
        componentPromises = await getFiles(settings.componentSrcGlobPattern, ignores)
            .then(paths => {
                console.log(`Resolved ${paths.length} component(s)`);
                return paths;
            })
            .then(paths => paths.map(async fullPath => buildTag(fullPath, settings.webTypesFileName ?? 'web-types.ts'))
            );
    }

    if (settings.directiveSrcGlobPattern) {
        directivePromises = await getFiles(settings.directiveSrcGlobPattern, ignores)
            .then(paths => {
                console.log(`Resolved ${paths.length} directive(s)`);
                return paths;
            })
            .then(paths => paths.map(async fullPath => buildAttribute(
                fullPath,
                settings.webTypesFileName ?? 'web-types.ts'
            )));
    }

    if (componentPromises.length) {
        webTypes.contributions.html!.tags = await Promise.all(componentPromises);
        console.log(`Built ${componentPromises.length} component definition(s).`);
    }

    if (directivePromises.length) {
        webTypes.contributions.html!.attributes = await Promise.all(directivePromises);
        console.log(`Built ${directivePromises.length} directive definition(s).`);
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
