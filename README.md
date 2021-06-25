# vueish
Vue UI Library

Install:
 - run `npm i vueish`
 - add `style="position: relative"` to the body tag


# Contribution

error like
```text
failed to load config from /Users/my-user/Web/vueish/vite.config.js
error when starting dev server:
Error: The service was stopped
```

can be fixed by running `node node_modules/esbuild/install`

### IDE Support

IDE support has been added by using web-types.json.
To add your own definition to a new component:
 - Add a ts file (normally named web-type.ts next to the component) which is found by the configured glob pattern
 - In that set the default export to either `HtmlTag` or `HtmlTag[]`

### Testing

#### snapshot testing

 - Snapshots should be created/tested when there's a significant change in the markup such as v-if and v-for statements.
 - The snapshot should include the expected most frequent use-case meaning: props and slots should be included where applicable.
