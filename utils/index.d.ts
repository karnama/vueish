export interface DirectiveOption {
    name: string;
    default: string;
    type: 'boolean' | 'string' | 'object';
}

export interface Directive {
    displayName?: string; // this will be prefixed by `v-`
    description?: string;
    options?: DirectiveOption[];
}
