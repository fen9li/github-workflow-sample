import ApiProcessor from '@lib/processors/api-processor'
import cellRoute from '~/components/cells/cell-route.vue'

const TABLE_FILTERS = [{
  attribute: 'status',
  type: 'select',
  icon: 'el-icon-document',
  values: [{
    label: 'Enabled',
    value: true,
  },
  {
    label: 'Disabled',
    value: false,
  }],
},
{
  attribute: 'name',
  label: 'Offer Name',
  type: 'string',
  icon: 'el-icon-document',
},
{
  attribute: 'feed_offer.feed',
  type: 'string',
  icon: 'el-icon-document',
},
{
  attribute: 'created_at',
  label: 'Offer Start Date',
  type: 'date',
  icon: 'el-icon-document',
}]

const TABLE_COLUMNS = [{
  name: 'enabled',
  icon: 'el-icon-document',
  component: {
    is: 'cell-toggle',
  },
},
{
  name: 'name',
  label: 'Offer Name',
  icon: 'el-icon-document',
},
{
  name: 'description',
  label: 'Offer Description',
  icon: 'el-icon-document',
},
{
  name: 'feed_offer.feed',
  icon: 'el-icon-document',
},
{
  name: 'created_at',
  label: 'Offer Start Date',
  icon: 'el-icon-document',
  format: 'dateTime',
},
{
  sortable: false,
  width: 80,
  component: {
    is: cellRoute,
    props: {
      text: 'View Offers',
      pathName: 'merchant-offers',
      identifier: 'id',
    },
  },
}]

export default function(component) {
  return {
    processor: new ApiProcessor({
      component,
      path: 'offers',
    }),
    filters: TABLE_FILTERS,
    columns: TABLE_COLUMNS,
  }
}
