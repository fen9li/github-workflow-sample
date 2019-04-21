import * as bodybuilder from 'bodybuilder'
import { Client } from 'elasticsearch'
import dayjs from 'dayjs'
import get from 'lodash/get'
import DataProcessor from './data-processor'

const dateStringFormatter = date => {
  // input format 'DD/MM/YYYY'
  return date
    .split('/')
    .reverse()
    .join('-')
}

const utcOffset = () => {
  return new Date().getTimezoneOffset()
}

const filterTypes = {
  eq: 'term',
  gt: 'range',
  lt: 'range',
  starts: 'wildcard',
  ends: 'wildcard',
  contains: 'wildcard',
  doesnt_contain: 'regexp',
  after: 'range',
  before: 'range',
  on: 'range',
  select: 'terms',
}

const filterValues = {
  gt: value => ({ gt: value }),
  lt: value => ({ lt: value }),
  starts: value => value + '*',
  ends: value => '*' + value,
  contains: value => '*' + value + '*',
  doesnt_contain: value => '~(.*' + value + '.*)',
  after: value => ({
    gt: dayjs.utc(dateStringFormatter(value))
      .add(1, 'day')
      .add(utcOffset(), 'minute')
      .format(),
  }),
  before: value => ({
    lt: dayjs.utc(dateStringFormatter(value))
      .add(utcOffset(), 'minute')
      .format(),
  }),
  on: value => ({
    gt: dayjs.utc(dateStringFormatter(value))
      .add(utcOffset(), 'minute')
      .format(),
    lt: dayjs.utc(dateStringFormatter(value))
      .add(1, 'day')
      .add(utcOffset(), 'minute')
      .format(),
  }),
}


function getFilterType({ comparison }) {
  return filterTypes[comparison] || 'match'
}

function getFilterValue({ value, comparison }) {
  return filterValues[comparison] ? filterValues[comparison](value) : value
}

function buildBody(queryObj) {
  const { filters, sort } = queryObj
  const body = bodybuilder()

  if (filters.length) {
    filters.forEach(p => {
      const filterType = getFilterType(p)

      if (filterType) {
        body.query(filterType, p.attribute, getFilterValue(p))
      }
    })
  } else {
    body.query('match_all')
  }

  if (Object.keys(sort).length) {
    const preparedSort = []

    for (const key in sort) {
      if (sort.hasOwnProperty(key)) {
        preparedSort.push({ [key]: sort[key] })
      }
    }

    body.sort(preparedSort)
  }

  return body.build()
}

const client = new Client({
  host: process.env.VUE_APP_ELASTIC_HOST,
  apiVersion: '6.6',
})

export default class ElasticAdapter extends DataProcessor {
  constructor(params) {
    super(params)

    this.index = params.index
    /*
     * dataQuery created in DataProcessor super
     */

    this.init()
  }

  async sendRequest(dataQuery) {
    const response = await client.search({
      index: this.index,
      body: buildBody(dataQuery),
      from: dataQuery.pageSize * (dataQuery.page - 1),
      size: dataQuery.pageSize,
    })

    return {
      data: get(response, 'hits.hits', []).map(i => i._source),
      total: get(response, 'hits.total', 0),
    }
  }

  async sendRequestAll(dataQuery) {
    const response = await client.search({
      index: this.index,
      body: buildBody(dataQuery),
      from: 0,
      size: 10000, /* @todo need to implement new interface for larger values */
    })


    return {
      data: get(response, 'hits.hits', []).map(i => i._source),
      total: get(response, 'hits.total', 0),
    }
  }
}
