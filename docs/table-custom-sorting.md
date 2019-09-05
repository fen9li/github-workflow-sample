# Sorting

Most of the time, table sorting is binded to a certain value in ElasticSearch (e.g. `id`, `name`, etc) represented by String or Number.

Regular Elastuc Search sorting query looks like this:

```js
sort: [{ createdAt: { order: 'desc' } }]
```

But sometimes, a value for a table column (in this case value under `createdAt` key) does not actually exist in Elastic Search and is being calculated or formated on the Client Side and then passed to be displayed.

Despite that, user have to be able to sort these custom column value as well as usual.

Regular sorting will return Elastic Search error (as trying to sort the value, which does not exist).

In this case a `custom sorting` might be used.

## Custom sorting (script sorting)

Custom sorting is based on scripting feature provided by Elastic Search under `_script` object. More about Elastic Search scripting you can read [Here](https://www.elastic.co/guide/en/elasticsearch/reference/7.3/modules-scripting-using.html).

Basically, the idea is that we pass a script defined on our Client Side App, and this script will be ran on every available within `index` (e.g. `clients`, `products`, `transactions`. etc) on Backend Side (in Elastic Search), are return sorted hits.

Here is a basic example:

```js
sort: [
  {
    _script: {
      type: 'number',
      order: 'asc',
      script: {
        lang: 'painless',
        source:
          'int order = 0; if(doc.originalValue.size() != 0 && doc.originalValue.value === params.compareValue) { order = 1 } else { order = 2 } order; ',
        params: {
          compareValue: 'One',
        },
      },
    },
  },
]
```

Let's take a deeper look:

`type` - value type on which sorting is based. In this example it's gonna be a number, that we return in `source`.

`order` - sorting order

`lang` - language of sorting script. `Painless` - is a built-in language in Elastic Search. Based on Java. Most likely that is a language you need.

Read more about `Painless` [Here](https://www.elastic.co/guide/en/elasticsearch/painless/current/painless-walkthrough.html).

`source` - actual script that will be executed on every entity. `doc` is a single entity (a.k.a `document`).

**Important note**: Elastic Search does not have `null` values. So, is order to check that value is not `null` you explicitly check is value exists: `doc.originalValue.size() != 0`

`params` - an object with optional variables, that will also be passed down to Elastic Search to execute the script.

**Remember**, the script we pass as a string will be executed on backend, so if you need an access to external variables (e.g. a value to compare) - `params` in exactly the place.

## Add custom sorting to a certain column

First, create a function, that returns an object with this structure

```js
function myCustomSorting(order, field) {
  return {
    type: 'number',
    order: 'asc',
    script: {
      lang: 'painless',
      source:
        'int order = 0; if(doc.originalValue.size() != 0 && doc.originalValue.value === params.compareValue) { order = 1 } else { order = 2 } order; ',
      params: {
        compareValue: 'One',
      },
    },
  }
}
```

Then, pass this function as `sorting` property to a single column object (in `some.table.js`).

```js
{
  name: "amount",
  label: "Amount",
  icon: "el-icon-money",
  sorting: myCustomSorting,
}
```

Live example is availabe in `packages/payments/coupons/coupons.table.js`
