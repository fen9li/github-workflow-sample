# Filtering

Most of the time, table filtering is binded to a certain value in ElasticSearch (e.g. `id`, `name`, etc) and comparison passed down from Cliend Side (`eq`, `contains`, `gt`, `lt`, etc.).

But if value, that should be filtered is not presented in Elastic Search (it is calculated on Client Side and passed down to table column to display), a regular filter won't work.

A custom sorting mechanism may be defined for a filter to to solve this.

## Custom filtering

Regular Elastuc Search filtering query might looks like this:

```js
query: {
  bool: {
    must: {
      terms: {
        type: ['active']
      }
    }
  }
}
```

```js
query: {
  bool: {
    filter: [
      {
        script: {
          script: {
            source: 'doc.amount.size() != 0',
            lang: 'painless',
            params: {
              attribute: 'amount',
              type: 'select',
              comparison: 'select',
              value: ['amount'],
            },
          },
        },
      },
    ]
  }
}
```

`lang` - language of sorting script. `Painless` - is a built-in language in Elastic Search. Based on Java. Most likely that is a language you need.

Read more about `Painless` [Here](https://www.elastic.co/guide/en/elasticsearch/painless/current/painless-walkthrough.html).

`source` - actual script that will be executed on every entity. `doc` is a single entity (a.k.a `document`). In order to include entity, a script must return `true`.

**Important note**: Elastic Search does not have `null` values. So, is order to check that value is not `null` you explicitly check is value exists: `doc.originalValue.size() != 0`

`params` - an object with optional variables, that will also be passed down to Elastic Search to execute the script. **For custom sorting passing original destructed filter object is required**.

## Add custom sorting to a certain column

First, create a function, that returns an object with this structure

```js
function myCustomFilter(filter) {
  return {
    label: function(v) {
      return 'custom label for' + v
    },
    script: {
      script: {
        source: 'doc.amount.size() != 0',
        lang: 'painless',
        params: { ...filter },
      },
    },
  }
}
```

Then, pass this function as `customFiltering` property to a single filter object (in `some.table.js`).

```js
{
  attribute: 'amount',
  label: 'No. in Use',
  type: 'numeric',
  icon: 'el-icon-files',
  customFiltering: myCustomFilter
}
```

### Custom label

Some custom filter may require altering displayed filter label.

This may be done, by defining `label` function in returning object of your `customFilter`, which accepts an original filter value as a parameter.

**Note** custom filtering may be applied to any existing filter type.

Live example is availabe in `packages/payments/coupons/coupons.table.js`
