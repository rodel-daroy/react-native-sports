List
=========

A list view abstraction which allows simple list and lists with section headers to be rendered

Example
-
```
<List renderRow={(row) => <Text style = {{backgroundColor: 'rgb(220,220,220)', padding: 8, margin: 8}}>{row.get('name')}</Text>}
            renderSectionHeader={(section) => <Text style={{backgroundColor: 'rgb(200,200,200)'}}>{section.get('name')}</Text>}
            rowData={categories} />
```

Properties
---
| Property | Type | Default | Effect |
| -------- | --- | --- | --- |
| rowData | A immutable list of: Strings, Numbers, Objects, ‘Sections’ (e.g. an object that has ‘items’ and optionally a ‘name’) | null | This is the data that will be rendered.
| renderRow | Function | ```<Row key={getReactKey(item)}><Text style={styles.rowText}>{item}</Text></Row>``` | Will replace the default render row function with your custom one.
| renderRowView | Function | renderRow | Will replace default render row function with a your custom one, plus padding.
| renderSectionHeader | Function | null | Will render out section headers, if one is provided in rowData |
| shouldRenderSeparator | Boolean | true | If set to false will prevent list from rendering a separator |
| shouldRenderLastSeparator | Boolean | true | If set to false the last row will not have a trailing separator |

Example rowData
---
```
const categories = immutable.fromJS([
    {
        name: 'Soft Drinks',
        items: [
            {
                name: 'Coke',
                barcode: '123456789',
                price: 59,
            },
            {
                name: 'Pepsi',
                barcode: '987654321',
                price: 49,
            },
        ],
    },
    {
        name: 'Frozen Food',
        items: [
            {
                name: 'Peas',
                barcode: '123456789',
                price: 200,
            },
            {
                name: 'Chips',
                barcode: '987654321',
                price: 300,
            },
        ],
    },
]);

```

```
rows: immutable.List([
    '1', '2', '3',
]),
```
