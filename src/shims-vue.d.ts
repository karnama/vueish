type Props = {};
type Mixins = {};
type Extends = {};
export type SetupArg = Props & Mixins & Extends;

declare module "*.vue" {
    import { DefineComponent } from "vue";
    const component: DefineComponent;
    export default component;
}
