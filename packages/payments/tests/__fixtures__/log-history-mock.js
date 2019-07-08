module.exports = {
  table: [
    {
      id: 'log0',
      createdAt: '2019-04-15T12:40:31.965Z',
      description: 'POST/v1/point1',
      name: 'POST/v1/point1',
      status: '200',
      method: 'POST',
      url: '/v1/point1',
      ipAddress: '111.111.42.150',
      version: '0.0.1',
      source: 'Dashboard - pavel@loyaltycorp.com.au',
      related: 'webhook_endpoint - we_2Y....',
      origin: 'https://dashboard.stripe.com/',
      requestQuery: 'param1=123',
      requestBody: `{
        "string": "a string",
        "number": 10575.023,
        "object": {
          "key": "value"  
        },
        "array": [

        ],
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
    },
    {
      id: 'log1',
      createdAt: '2019-04-16T12:35:31.965Z',
      description: 'POST/v1/point2',
      name: 'POST/v1/point2',
      method: 'GET',
      url: '/v1/point2',
      status: '401',
      ipAddress: '111.111.42.150',
      version: '0.0.1',
      source: 'Dashboard - pavel@loyaltycorp.com.au',
      related: 'webhook_endpoint - we_2Y....',
      origin: 'https://dashboard.stripe.com/',
      requestQuery: 'param1=888888',
      requestBody: `{
        "string": "a string",
        "number": 10575.023,
        "object": {
          "key": "value"
        },
        "array": [

        ],
        "boolean": true,
        "nul": null
      }`,
      responseBody: `{
        "string": "a string",
        "number": 10575.023,
        "object": {
          "key": "value"
        },
        "array": [

        ],
        "boolean": true,
        "nul": null
      }`,
    },
  ],
}
