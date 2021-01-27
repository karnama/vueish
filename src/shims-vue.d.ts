type Props = Record<string, any>;
type Mixins = Record<string, any>;
type Extends = Record<string, any>;
export type SetupArg<Type extends Record<string, any> = Record<string, any>> = Props & Mixins & Extends & Type;

declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent;
    export default component;
}
