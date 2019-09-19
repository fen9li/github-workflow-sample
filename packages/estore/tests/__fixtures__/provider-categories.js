module.exports = {
  table: [
    {
      created_at: "2019-05-24T04:14:12Z",
      updated_at: "2019-06-24T04:22:12Z",
      id: '1',
      groupName: "Group A",
      tiers: [
        {
          name: 'Tier A' ,
          categories: ['Category A', 'Category B', 'Category C']
        },
        {
          name: 'Tier B',
          categories: ['Category A', 'Category B']
        },
      ],
    },
    {
      created_at: "2019-05-24T04:14:12Z",
      updated_at: "2019-06-24T04:22:12Z",
      id: '2',
      groupName: "Group B",
      tiers: [
        {
          name: 'Tier A' ,
          categories: ['Category A']
        },
        {
          name: 'Tier B',
          categories: ['Category A', 'Category B', 'Category C', 'Category D']
        },
        {
          name: 'Tier C',
          categories: ['Category A', 'Category D']
        },
      ],
    }
  ]
}
