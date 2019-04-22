# API Mocking Guide

- [Basic concepts](#basic-concepts)
- [Table/Filter API mocking](#tablefilter-api-mocking)
- [Usual backend API mocking](#usual-backend-api-mocking)

## Basic concepts

There are two possible cases where you need to mock some server request:

1.  you are testing `data-table`/`data-filter` component
2.  you are testing all other common components

In both cases you must store mock/fixture files in the monorepo root in the folder `/tests/mock-api/<monorepo-package-name>/<mock-file-name>.js`. Ex: `/test/mock-api/payments/transactions-table-mock.js`

## Table/Filter API mocking

There is a special data processor called `mock-processor`. It doesn't make any requests to the server, it just reads the mock file and passes its content like a "server response". MockProcessor requires `mockFrom` key with the string value like `<monorepo-package-name>/<mock-file-name>.js` (without slash at the beginning).

Mock file must export `{ table: [] }` object as a CommonJS module because `mock-processor` will read it like `require('@mock-api/' + mockFrom).table`:

```javascript
module.exports = {
  table: [
    { status: 'Refund', created: '2018-08-30T16:20:26.843Z' },
    { status: 'Finalised', created: '2018-08-30T16:21:12.843Z' },
  ],
}
```

Here is the short example how to use the `mock-processor` to test `data-table` or `data-filter` components:

```javascript
import { TABLE_FILTERS } from './transactions-table.js'
import DataFilter from '...'

describe('the best data-filter test ever', () => {
  const processor = new MockProcessor({
    disableQueryString: true,
    mockFrom: 'payments/transactions-table-mock.js',
  })

  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(DataFilter, {
      propsData: {
        filters: TABLE_FILTERS,
        processor,
      },
    })
  })

  it('filters should work on transactions page', () => {
    /* ... */
  })
})
```

## Usual backend API mocking

In case of testing the usual components, you need to use `jest-mock-axios` npm package.

```javascript
import mockAxios from 'jest-mock-axios'
import SomeComponent from '...'

describe('some component test', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(SomeComponent)
  })
  afterEach(() => {
    mockAxios.reset()
  })

  it('filters should work on transactions page', () => {
    // 1. trigger request somehow
    wrapper.vm.doSmthThatWillLeadUsToApiRequest()

    // 2.1 mock response (1st variant)
    mockAxios.mockResponse({
      data: {
        /*
         *  This is the response.
         *  It may be an array, or whatever
         *  you need to present as the response.
         */
      },
    })

    // 2.2 mock response (2nd variant)
    /*
     * mockResponseFrom doesn't presented in jest-mock-axios
     * package because it is our own sugar method.
     * mockResponseFrom works similar to the 'mockFrom' key of mock-processor.
     */
    mockAxios.mockResponseFrom('payments/transactions-table-mock.js')

    // 2.3 mock error response (3rd variant)
    mockAxios.mockError(new Error('Awful backend error.'))
  })
})
```

[Here](https://github.com/knee-cola/jest-mock-axios#axios-mock-api) you can read more about `jest-mock-axios` methods.
