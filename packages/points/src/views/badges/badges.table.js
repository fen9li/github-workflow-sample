import ApiProcessor from '@lib/processors/api-processor'

const TABLE_FILTERS = [{
  attribute: 'earnedOn',
  label: 'Badge last earned on',
  icon: 'el-icon-date',
  type: 'date'
}, {
  attribute: 'id',
  label: 'Badge ID',
  type: 'string',
  icon: 'el-icon-document',
}, {
  attribute: 'name',
  label: 'Badge Name',
  type: 'string',
  icon: 'el-icon-document',
}, {
  attribute: 'description',
  label: 'Badge Description',
  type: 'string',
  icon: 'el-icon-document',
}, {
  attribute: 'provider',
  label: 'Provider Name',
  icon: 'el-icon-document',
  type: 'string'
}, {
  attribute: 'attained',
  label: 'Times Attained',
  icon: 'el-icon-document',
  type: 'numeric'
}, ]

const TABLE_COLUMNS = [{
  name: 'earnedOn',
  label: 'Badge last earned on',
  icon: 'el-icon-date',
  format: {
    name: 'date',
    params: ['DD/MM/YYYY hh:mm A'],
  },
}, {
  name: 'id',
  label: 'Badge ID',
  type: 'string',
  icon: 'el-icon-document',
}, {
  name: 'name',
  label: 'Badge Name',
  type: 'string',
  icon: 'el-icon-document',
}, {
  name: 'logo',
  label: 'Badge Logo',
  icon: 'el-icon-document',
  width: 100,
  component: {
    is: 'cell-logo',
  },
  format(value) {
    if (value) {
      return `${value}//-/preview/40x40/-/quality/best/`
    }
    return false
  },
}, {
  name: 'description',
  label: 'Badge Description',
  type: 'string',
  icon: 'el-icon-document',
}, {
  name: 'provider',
  label: 'Provider Name',
  type: 'string',
  icon: 'el-icon-document',
}, {
  name: 'attained',
  label: 'Times Attained',
  type: 'numeric',
  icon: 'el-icon-document',
  width: 120,
  component: {
    props: {
      styleObj() {
        return {
          color: 'var(--color-primary)'
        }
      },
    },
  },
}, ]

export default function (component) {
  return {
    processor: new ApiProcessor({
      component,
      path: 'badges',
      index: 'badges',
    }),
    filters: TABLE_FILTERS,
    columns: TABLE_COLUMNS,
  }
}
