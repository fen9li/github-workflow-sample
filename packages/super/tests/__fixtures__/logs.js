module.exports = {
  table: [
    {
      createdAt: '2019-08-06T09:43:00Z',
      id: '1',
      description: 'POST / v1/invoice items/ii_1ES822huHS9w29jhSji82990',
      value: 'ABC',
      updatedBy: {
        name: 'User1',
        id: '1',
      },
      name: 'POST/v1/point1',
      status: 200,
      method: 'POST',
      ipAddress: '111.111.11.111',
      origin: 'https://dashboard.stripe.com/',
      requestBody: `{
        "type": "request",
        "number": 11,
        "object": {
          "key": "value"
        },
        "array": [

        ],
        "boolean": true,
        "nul": null
      }`,
      responseBody: `{
        "type": "response",
        "object": {
          "string": "a string",
          "number": 22,
        }
      }`,
      url: '/v1/point1',
      source: 'Dashboard - johnsmith@email.com.au',
      related: 'webhook_endpoint-weuwy728uh2hw98h92',
      version: '14/03/2019 (latest)',
      updatedAt: '2019-04-15T12:40:31.965Z',
      time: '2019-04-15T12:40:31.965Z',
    },
    {
      createdAt: '2019-08-06T09:43:00Z',
      id: '2',
      description: 'POST / v1/webhook_endpoints',
      value: 'ABC',
      updatedBy: {
        name: 'User2',
        id: '2',
      },
      status: 403,
      method: 'POST',
      ipAddress: '222.111.42.150',
      origin: 'https://dashboard.stripe.com/',
      requestBody: `{
        "type": "request",
        "number": 33,
        "object": {
          "key": "value"
        },
        "array": [

        ],
        "boolean": true,
        "nul": null
      }`,
      responseBody: `{
        "type": "response",
        "object": {
          "string": "a string",
          "number": 44,
        }
      }`,
      url: '/v1/point2',
      name: 'POST/v1/point2',
      source: 'Dashboard - johnsmith@email.com.au',
      related: 'webhook_endpoint-weuwy728uh2hw98h92',
      version: '14/03/2019 (latest)',
      updatedAt: '2019-04-15T12:40:31.965Z',
      time: '2019-04-15T12:40:31.965Z',
    },
    {
      createdAt: '2019-08-06T09:43:00Z',
      id: '3',
      description: 'POST / v1/invoice items/ii_1ES822huHS9w29jhSji82990',
      value: 'DEF',
      updatedBy: {
        name: 'Admin1',
        id: '3',
      },
      status: 401,
      method: 'POST',
      ipAddress: '333.111.42.150',
      origin: 'https://dashboard.stripe.com/',
      requestBody: `{
        "type": "request",
        "number": 55,
        "object": {
          "key": "value"
        },
        "array": [

        ],
        "boolean": true,
        "nul": null
      }`,
      responseBody: `{
        "type": "response",
        "object": {
          "string": "a string",
          "number": 66,
        }
      }`,
      url: '/v1/point3',
      name: 'POST/v1/point3',
      source: 'Dashboard - johnsmith@email.com.au',
      related: 'webhook_endpoint-weuwy728uh2hw98h92',
      version: '14/03/2019 (latest)',
      updatedAt: '2019-04-15T12:40:31.965Z',
      time: '2019-04-15T12:40:31.965Z',
    },
    {
      id: '4',
      createdAt: '2019-04-15T12:40:31.965Z',
      description: 'random POST/v1/point1 request',
      name: 'POST/v1/point1',
      value: 'XYZ',
      status: 200,
      method: 'POST',
      url: '/v1/point3',
      ipAddress: '111.111.42.150',
      origin: 'https://dashboard.stripe.com/',
      requestBody: `{
        "url": "https://eonx.com",
        "number": 77,
        "object": {
          "key": "value"
        },
        "array": [

        ],
        "boolean": true,
        "nul": null
      }`,
      responseBody: `{
        "type": "response",
        "object": {
          "string": "a string",
          "number": 88,
        }
      }`,
      source: 'Dashboard - johnsmith@email.com.au',
      related: 'webhook_endpoint-weuwy728uh2hw98h92',
      version: '14/03/2019 (latest)',
      updatedAt: '2019-04-15T12:40:31.965Z',
      time: '2019-04-15T12:40:31.965Z',
      updatedBy: {
        name: 'User4',
        id: '4'
      },
    },
  ]
}
