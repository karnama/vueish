# vueish
Vue UI Library

Install:
 - run `npm i vueish`
 - add `style="position: relative"` to the body tag


# Contribution

error like
```text
failed to load config from /Users/my-user/Web/vueish/vite.config.ts
error when starting dev server:
Error: The service was stopped
```

can be fixed by running `node node_modules/esbuild/install`

### Testing

#### snapshot testing

 - Snapshots should be created/tested when there's a significant change in the markup such as v-if and v-for statements.
 - The snapshot should include the expected most frequent use-case meaning: props and slots should be included where applicable.
