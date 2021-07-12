import 'vue-router';

declare module 'vue-router' {
    interface RouteMeta {
        label: string;
        type: 'Directives' | 'Components';
    }
}
