# vueish
Vue UI Library

Install:
 - run `npm i vueish`
 - add `style="position: relative"` to the body tag


## Contribution

### Adding features

#### Component
 1. create a folder  in the `src/components` folder aptly named
 2. create a `.vue` file that starts with `UI` e.g.: `UITable.vue`

#### Directive
1. create a folder  in the `src/directives` folder aptly named
2. create an `index.ts` file in the created folder.

Then add or update test to cover the new logic. The test file should be placed next to the source code in a file that is named the same but appended with `test` in the name. (`UITable.test.ts`)


error like
```text
failed to load config from /Users/my-user/Web/vueish/vite.config.js
error when starting dev server:
Error: The service was stopped
```

can be fixed by running `node node_modules/esbuild/install`

### Testing

#### snapshot testing

 - Snapshots should be created/tested when there's a significant change in the markup such as v-if and v-for statements.
 - The snapshot should include the expected most frequent use-case meaning: props and slots should be included where applicable.
