module.exports = {
  details: {
    url: 'http://pamembership.com.au',
    mode: 'live',
    id: 1,
    active: true,
    events: [
      'customer.created', 'customer.deleted', 'customer.updated', 'customer.bank_account_deleted', 'customer.discount.created',
    ],
  },
  table: [
    {
      type: 'customer.updated',
      id: 'evt_1US8902hki76hF5279g1',
      date: '2019-02-10T17:54:31.965Z',
      url: 'http://pamembers.com.au',
      status: 'failed',
      requestBody: `{
        "string": "a string",
        "number": 10575.023,
        "object": {
          "key": "value"
        },
        "array": [],
        "boolean": true,
        "nul": null
      }`,
      responseBody: `{
        "string": "a string",
        "number": 10575.023,
        "object": {
          "string": "a string",
          "number": 10575.023,
          "array": ["string", 525],
          "boolean": true,
          "nul": null
        },
        "array": [],
        "boolean": true,
        "nul": null,
        "obj": {
        "string": "a string",
        "number": 10575.023,
        "object": {
          "string": "a string",
          "number": 10575.023,
          "array": ["string", 525],
          "boolean": true,
          "nul": null
        },
        "array": [],
        "boolean": true,
        "nul": null
      }
      }`,
      responseCode: '301 (Moved Permanentely)',
    },
    {
      type: 'customer.subscription.updated',
      id: 'evt_1US8902hki76hF5279g2',
      date: '2019-02-10T17:54:31.965Z',
      url: 'http://pamembers.com.au',
      status: 'failed',
      requestBody: `{
        "string": "a string",
        "number": 10575.023,
        "object": {
          "key": "value"
        },
        "array": [],
        "boolean": true,
        "nul": null
      }`,
      responseBody: `{
        "string": "a string",
        "number": 10575.023,
        "object": {
          "string": "a string",
          "number": 10575.023,
          "array": ["string", 525],
          "boolean": true,
          "nul": null
        },
        "array": [],
        "boolean": true,
        "nul": null,
        "obj": {
        "string": "a string",
        "number": 10575.023,
        "object": {
          "string": "a string",
          "number": 10575.023,
          "array": ["string", 525],
          "boolean": true,
          "nul": null
        },
        "array": [],
        "boolean": true,
        "nul": null
      }
      }`,
      responseCode: '301 (Moved Permanentely)',
    },
    {
      type: 'customer.updated',
      id: 'evt_1US8902hki76hF5279g6',
      date: '2019-02-10T17:54:31.965Z',
      url: 'http://pamembers.com.au',
      status: 'failed',
      requestBody: `{
        "string": "a string",
        "number": 10575.023,
        "object": {
          "key": "value"
        },
        "array": [],
        "boolean": true,
        "nul": null
      }`,
      responseBody: `{
        "string": "a string",
        "number": 10575.023,
        "object": {
          "string": "a string",
          "number": 10575.023,
          "array": ["string", 525],
          "boolean": true,
          "nul": null
        },
        "array": [],
        "boolean": true,
        "nul": null,
        "obj": {
        "string": "a string",
        "number": 10575.023,
        "object": {
          "string": "a string",
          "number": 10575.023,
          "array": ["string", 525],
          "boolean": true,
          "nul": null
        },
        "array": [],
        "boolean": true,
        "nul": null
      }
      }`,
      responseCode: '301 (Moved Permanentely)',
    },
  ],
}
