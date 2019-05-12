module.exports = {
  table: [
    {
      name: 'POST/v1/point1',
      id: 'log-0',
      createdAt: '2019-04-15T12:40:31.965Z',
      method: 'POST',
      url: '/v1/point1',
      status: '200',
      ipAddress: '111.111.42.150',
      version: '0.0.1',
      source: 'Dashboard - pavel@loyaltycorp.com.au',
      related: 'webhook_endpoint - we_2Y....',
      origin: 'https://dashboard.stripe.com/',
      requestQuery: 'param1=123',
      requestBody: '{"req_par1": 123, "req_par2": "Some string"}',
      responseBody: `{
        table: [
          {
            code: 'HD876',
            productName: 'Earning less than $35.000 p.a. *',
            anchorDate: '30/05',
          },
          {
            code: 'JW846',
            productName: 'Earning less than $25.000 p.a. *',
            anchorDate: '21/05',
          },
        ],
      }`,
    },
    {
      name: 'POST/v1/point2',
      id: 'log-1',
      createdAt: '2019-04-16T12:35:31.965Z',
      method: 'GET',
      url: '/v1/point2',
      status: '200',
      ipAddress: '111.111.42.150',
      version: '0.0.1',
      source: 'Dashboard - pavel@loyaltycorp.com.au',
      related: 'webhook_endpoint - we_2Y....',
      origin: 'https://dashboard.stripe.com/',
      requestQuery: 'param1=123',
      requestBody: '{"req_par1": 123, "req_par2": "Some string"}',
      responseBody: `{
        table: [
          {
            code: 'HD876',
            productName: 'Another kind of product',
            anchorDate: '31/01',
          },
          {
            code: 'HA488',
            productName: 'Unpaid product',
            anchorDate: '11/06',
          },
          {
            code: 'II999',
            productName: 'Nothing here',
            anchorDate: '30/05',
          },
        ],
      }`,
    },
  ],
}
