When changing a cell with named slots the cell's value will not match the actual cell value hence the default search/sort behave as expected. In these cases you should pass a custom search function to the `search` prop and a `sortFunc` to the header and extend the values to match what's on screen.

Hover highlight only works on screens larger than 640px
