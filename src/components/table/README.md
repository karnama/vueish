When changing a cell with named slots the cell's value will not match the actual cell value hence the default search/sort behave as expected. In these cases you should pass a custom search function to the `search` prop and a `sortFunc` to the header and extend the values to match what's on screen.

Hover highlight only works on screens larger than 640px

the given sort function is a function that  takes the row and the direction and returns a value which is utilised by https://lodash.com/docs/4.17.15#orderBy

The components emits values with Required<Row>

The following slots are available:
 - header: slotProps.header = Required<Column>
 - [name] (dynamic name based on row keys): slotProps.row = Required<Row>
 - action: slotProps.row = Required<Row>
 - empty
 - pagination:
    - slotProps.itemsPerPage = current items per page
    - slotProps.page = current page
    - slotProps.hasNext = boolean
    - slotProps.hasPrevious = boolean
    - slotProps.jumpToPage = method to be called with a page number
 - footer
