<!-- markdownlint-disable MD001 MD024 -->

# Tables Documentation

- [Usage example](#usage-example)
- [Basic principles](#basic-principles)
  - [Data Table](#data-table)
  - [Data Filter](#data-filter)
  - [Data Processor](#data-processor)
    - [dataQuery definition](#object-dataquery)
    - [FilterList definition](#array-filterlist)
    - [Filter definition](#object-filter)
- [Columns config](#columns-config)
  - [ColumnDescriptor definition](#object-columndescriptor)
  - [FormatDescriptor definition](#type-formatdescriptor)
  - [CellComponent definition](#type-formatdescriptor)
  - [CellComponentDescriptor definition](#object-cellcomponentdescriptor)
  - [styleObj definition](#type-styleobj)
  - [badge definition](#type-badge)
  - [badgeDescriptor definition](#object-badgedescriptor)
  - [allowEmpty definition](#type-allowempty)
- [Filters config](#filters-config)
  - [FilterDescriptor definition](#object-filterdescriptor)
  - [SelectItemsList definition](#array-selectitemslist)
  - [SelectItem definition](#object-selectitem)
- [Data Processor settings](#data-processor-settings)
- [Table features](#table-features)
  - [Fragments Manager](#fragments-manager)
  - [Columns Hider](#columns-hider)
  - [Data Exporter](#data-exporter)
- [Props](#props)
  - [Data Table](#data-table-props)
  - [Data Filter](#data-filter-props)
  - [Fragments Manager](#fragments-manager-props)
  - [Columns Hider](#columns-hider-props)
  - [Data Exporter](#data-exporter-props)

## Usage example

_**1**_ Create a class that inherits from the [Data Processor](#data-processor-settings).

This class **must** implement `sendRequest(dataQuery)` and `sendRequestAll(dataQuery)` methods and call `init` in its constructor:

```javascript
class MyProcessor extends DataProcessor {
  constructor(params = {}) {
    super(params)

    this.init()
  }

  async sendRequest(dataQuery) { ... }
  async sendRequestAll(dataQuery) { ... }
}
```

_**2**_ Describe filters and columns configurations:

```javascript
export default {
  filters: [
    {
      attribute: 'orderId',
      type: 'string',
      icon: 'el-icon-document',
    },
  ],
  columns: [
    {
      name: 'orderId',
      label: 'Order ID',
      icon: 'el-icon-document',
    },
  ],
}
```

_**3**_ Create an instance of your class and pass it to [data-filter](#data-filter) and [data-table](#data-table) components:

```vue
<script>
import MyProcessor from '~/processors/my-processor'
import config from '...'

export default {
  data() {
    return {
      processor: new MyProcessor({ component: this }),
      filters: config.filters,
      columns: config.columns,
    }
  },
}
</script>

<template>
  <data-filter v-bind="{ processor, filters }" />
  <data-table v-bind="{ processor, columns }" />
</template>
```

## Basic principles

There are three main entities: **Data Table**, **Data Filter**, and **Data Processor**. Data Table and Data Filter can be used separately. But they all require an instance of Data Processor to work. Also, they can work together using one common Data Processor instance (such behavior is implemented in **table-layout**).

#### Data Table

Data Table is a server-oriented table component for rendering structured data like `[ {k:v, ... }, ... ]`. Server-oriented here means that all sorting and pagination are performed on the backend side by requests. The table itself serves only as a view with formatting and some stylization. The current implementation is based on the **Element UI's** table component — **el-table**.

Data Table component accepts Data Processor instance and [columns config](#columns-config) as props. All data to render comes from Data Processor with each request to the backend. All info about columns and their cells comes from columns config. Methods of Data Processor instance are used for sorting and pagination.

Each column it the table may have its own type of the cell that will be wrapped later with the **cell-wrap** component. In most cases, it is default **cell-default**. There are also two predefined cell types: **cell-link** and **cell-button**.

Developers can define custom cell components (must use **_cell.mixin.js_**) for their needs and then pass them to any column via columns configuration. The configuration also allows defining many cell components for one column. **cell-wrap** will pass raw value, formatted value, row and column name to each cell component as props. Developers may pass any own props to the cell component, except for the five mentioned (see more in [columns config](#columns-config)).

#### Data Filter

Data Filter is a component with a set of controls that manipulate filters in Data Processor.

Data Filter component accepts Data Processor instance and [filters config](#filters-config) as props. All info about available filters and their types comes from filters config. Methods of Data Processor instance are used for filters manipulation.

Each filter is associated with a specific column and has the type. Currently, there are 6 filter types: `string`, `numeric`, `boolean`, `date`, `time` and `select` which is just a list of other types. Each type has its own comparisons. The `boolean` type has no values, only two comparisons: `is_true` and `is_false`.

Filters config exists because of our intention to separate the filters from the table. And also because there are possible situations when the number of available filters may not coincide with the number of columns.

#### Data Processor

Data Processor is a JS Class that is responsible for working with the backend and data manipulations. It stores data from the backend and provides methods to modify this data. Usually, after each data mutation, an API request follows. Also, the Data Processor can write to URL or listen to its changes.

In fact, the Data Processor is more like a general class or interface. It can't be used directly but instead, it must extend a particular class. That particular class acts as an adapter for the backend service. The particular class **must** implement `sendRequest(dataQuery)` (to get a part of the data) and `sendRequestAll(dataQuery)` (to get _all_ of the table data) methods . Through this, we can separate tables from a specific API like Elastic Search, Algolia or custom backend. Also, particular class **must** call `this.init()` in its constructor.

The main property of the Data Processor instance is the `dataQuery`.

### Object `dataQuery`

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| `filters` | `FiltersList` | active filters | `[]` |
| `sort` | `Object` | key-value pair with sorting info | `{}` |
| `page` | `Number` | current page number | `1` |
| `pageSize` | `Number` | amount of visible rows per page | `20` |
| `hide` | `Array` | list of column names that **column-hider** will hide | `[]` |

### Array `FilterList`

Is an `Array` of `Filter`

### Object `Filter`

| Property     | Type     | Description            |
| ------------ | -------- | ---------------------- |
| `attribute`  | `String` | name/key of the column |
| `comparison` | `String` | comparison name        |
| `value`      | `Any`    | filter's value         |

#### Filter Example

```javascript
{
  attribute: 'orderId',
  comparison: 'gt',
  value: 123
}
```

#### Sort object example

```javascript
{
  paymentSource: 'asc',
  created: 'desc'
}
```

## Columns config

Columns config must be an `Array` of `ColumnDescriptor`.

### Object `ColumnDescriptor`

Describes each column in the table.

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| `name` | `String` | name/key of the column | - |
| `type` | `String` | **(optional)** use instead a 'name' property for expandable row mode | 'expand' |
| `label` | `String` | column name to display in column's header | - |
| `icon` | `String` | icon class name from Element UI. Is used only in the **columns-hider** component | - |
| `format` | `FormatDescriptor` | **(optional)** formatter that will be applied to each value in the current column | `{}` |
| `component` | `CellComponent` | **(optional)** describe a component that will be used for cells rendering in the current column | `{}` |
| `sortable` | `String` | **(optional)** use `Boolean` `false` to disable sorting for this column | `'custom'` |
| `overflowTooltip` | `String` | **(optional)** determine whether to show a tooltip for values that doesn't fit in their cells | `true` |
| `width` | `Number` | **(optional)** column width in pixels | `180` |

#### Example

```javascript
{
  name: 'created',
  label: 'Date created',
  icon: 'el-icon-document',
  format: {
    name: 'date',
    params: ['DD/MM/YYYY hh:mm A']
  }
}
```

### Type `FormatDescriptor`

Must be one of the following types:

| Type | Description |
| --- | --- |
| `String` | name of predefined formatter function. Possible values: `date`, `dateTime`, `dayMonth`,`dollar`, `uppercase` |
| `Object {name: String, params: Array}` | is used when predefined formatter function accepts arguments. `params` will be passed to `Function.prototype.apply` method |
| `Function (rawValue, row) => formattedValue` | must return formatted value or empty string. Note: `rawValue` may be `null`, `undefined` or empty string |

### Type `CellComponent`

Must be one of the following types:

| Type | Description |
| --- | --- |
| `CellComponentDescriptor` |
| `Function (value, columnName, cellInfo) => CellComponentDescriptor` | `cellInfo` is a default slot scope object of **el-table** component: `{row, column, $index}` |

### Object `CellComponentDescriptor`

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| `is` | `VueComponentIs` | **(optional)** see "is" definition in [Vue docs](https://vuejs.org/v2/api/#component). | `'cell-default'` |
| `props` | `Object` | **(optional)** props that will be passed to the cell component. See notes below | `{}` |

#### Example

```javascript
{
  is: 'MyAwesomeComponent',
  props: {
    awesomeComponentProp: '12'
  }
}
```

**Important note #1**: developers can pass any props except these: `attribute`, `row`, `value`, `formattedValue`, `processor`. They will be passed by **cell-wrap** component.

**Important note #2**: if the column component uses **_cell.mixin.js_** then developers can pass three props with a special name: `styleObj`, `badge` and `allowEmpty`. Their schemas:

### Type `styleObj`

Describes inline CSS styles that will be applied to the cell DOM node. It must be one of the following types:

| Type | Description |
| --- | --- |
| `styleObjDesriptor` |
| `Function (value, row, columnName) => styleObjDescriptor` | see [Vue docs](https://vuejs.org/v2/guide/class-and-style.html#Binding-Inline-Styles) for the `styleObjDescriptor` definition |

#### Example

```javascript
value => {
  if (value > 0) {
    return { color: '#000' }
  }

  return {}
}
```

### Type `badge`

Describes icon for the cell. It must be one of the following types:

| Type                                                   |
| ------------------------------------------------------ |
| `badgeDescriptor`                                      |
| `Function (value, row, columnName) => badgeDescriptor` |

### Object `badgeDescriptor`

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| `name` | `String` | icon class name from Element UI | - |
| `pos` | `String` | icon position. Possible values: `left`, `right` | - |

#### Example

```javascript
{
  name: 'el-icon-close',
  pos: 'right'
}
```

### Type `allowEmpty`

`false` by default. `true` value allows to display an empty string instead of `—` symbol.

### Columns config example

```javascript
;[
  {
    name: 'created',
    label: 'Date created',
    icon: 'el-icon-document',
    format: {
      name: 'date',
      params: ['DD/MM/YYYY hh:mm A'],
    },
  },
  {
    name: 'type',
    label: 'Type',
    icon: 'el-icon-document',
    component: {
      props: {
        styleObj(val) {
          if (val === 'Refund') {
            return { color: '#fc7168' }
          }

          return {}
        },
      },
    },
  },
]
```

## Filters config

Filters config must be an `Array` of `FilterDescriptor`.

### Object `FilterDescriptor`

Describes each column in the table.

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| `attribute` | `String` | name/key of the column | - |
| `icon` | `String` | icon class name from Element UI | - |
| `type` | `String` | type of the associated column. Possible values: `string`, `numeric`, `boolean`, `date`, `time`, `select` | - |
| `values` | `SelectItemsList` | **(optional)** required if `type` is `select` | `[]` |

#### Example

```javascript
{
  attribute: 'orderId',
  type: 'string',
  icon: 'el-icon-document'
}
```

### Array `SelectItemsList`

Is an `Array` of `SelectItem`

### Object `SelectItem`

| Property | Type     | Description                             | Default |
| -------- | -------- | --------------------------------------- | ------- |
| `label`  | `String` | name that will be displayed in checkbox | -       |
| `value:` | `Any`    | must be `String`, `Boolean` or `Number` | -       |

### Filters config example

```javascript
;[
  {
    attribute: 'created',
    icon: 'el-icon-date',
    type: 'date',
  },
  {
    attribute: 'type',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'status',
    type: 'select',
    icon: 'el-icon-document',
    values: [
      {
        label: 'Finalised',
        value: 'Finalised',
      },
      {
        label: 'Failed',
        value: 'Failed',
      },
    ],
  },
]
```

## Data Processor settings

Data Processor accepts `ProcessorOptions` object as single argument.

### Object `ProcessorOptions`

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| `staticQuery` | `Object` | **(optional)** static part of the [dataQuery](#object-dataquery). Values in `staticQuery` have priority over values in [dataQuery](#object-dataquery) | `{}` |
| `query` | `Object` | **(optional)** initial state of the `dataQuery` | `{}` |
| `disableQueryString` | `Boolean` | **(optional)** processor starts queryObject writing to the URL, also enables URL watcher | `false` |
| `component` | `VueComponent` | **(optional)** Vue component which \$watch function will be used to setup URL watcher. **Required** if `disableQueryString` is `false` | - |

### Example of Data Processor settings

```javascript
{
  staticQuery: [ { sort: { 'created': 'asc' }} ],
  component: this
}
```

## Table features

There are three useful components that serve as extensions for the table's functional. They are not required but they can improve UX.

#### Fragments Manager

The main role of Fragments Manager is to save `dataQuery` objects to localStorage. In terms of the Fragments Manager, each `dataQuery` object is called a "display". The Fragments Manager loads displays and provides the view to switch between them. The user can remove any saved display or save a new one at any time. User can't save two displays with the same name. Under the hood, this component reads and rewrites the `dataQuery` property of the Data Processor instance.

#### Columns Hider

The main role of Columns Hider is to provide the view to visually hide columns in the table. The Columns Hider writes to the `hide` property of the `dataQuery` object. Changing the `hide` property doesn't trigger an API request for better UX. The user can hide all columns except the last visible.

#### Data Exporter

The main role of Data Exporter is to export all the rows in the table to one file in the asynchronous manner. Currently, it only supports the CSV format but can be easily extended to support any format in the future. Hidden columns will still be exported. Sorting and filters are followed.

Due to a large amount of data to process, this component runs in a parallel thread (thanks to Web Workers). If the user's browser doesn't support Web Workers, then all data will be processed in the main thread, which can lead to a blocking of the user interface.

## Props

#### Data Table Props

| Prop      | Type                             | Required |
| --------- | -------------------------------- | -------- |
| processor | `DataProcessorInstance`          | true     |
| columns   | [ColumnsConfig](#columns-config) | true     |

Also supports `row-click` event listener.

#### Data Filter Props

| Prop      | Type                             | Required |
| --------- | -------------------------------- | -------- |
| processor | `DataProcessorInstance`          | true     |
| filters   | [FiltersConfig](#filters-config) | true     |

#### Fragments Manager Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| processor | `DataProcessorInstance` | true |
| tableName | `String` | true | is used to avoid collisions when saving displays for different tables |

#### Columns Hider Props

| Prop      | Type                             | Required |
| --------- | -------------------------------- | -------- |
| processor | `DataProcessorInstance`          | true     |
| columns   | [ColumnsConfig](#columns-config) | true     |

#### Data Exporter Props

| Prop      | Type                    | Required |
| --------- | ----------------------- | -------- |
| processor | `DataProcessorInstance` | true     |
