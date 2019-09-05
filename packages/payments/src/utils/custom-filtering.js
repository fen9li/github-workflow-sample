import dayjs from '@lib/node_modules/dayjs'

function couponValidityPeriod(filter) {
  const { comparison } = filter
  let source

  const valueExists = `doc.validityPeriod.size() != 0`
  const value = `doc.validityPeriod.value`

  if(comparison === 'eq') {
    source = `${valueExists} && ${value} == 'P${filter.value}M'`
  } else {
    let sign
    switch(comparison) {
      case 'lt': sign = '<'
        break
      case 'gt': sign = '>'
    }
    source = `${valueExists} && Integer.parseInt(${value}.substring(1,2)) ${sign} ${filter.value}`
  }

  return {
    label: function(v) { return v === 1 ? `${v} Month` : `${v} Months` },
    script : {
      script : {
        source,
        lang: "painless",
        params:
          { ...filter }
      }
    }
  }
}

function couponAmount(filter) {
  const type = filter.value && filter.value[0]
  const percentage = 'doc.discountPercentage.size()'
  const source = (type === 'discountPercentage') ? `${percentage} != 0` : `${percentage} == 0`

  return {
    script : {
      script : {
        source,
        lang: "painless",
        params:
          { ...filter }
      }
    }
  }
}

function existingCoupons() {
  const today = dayjs.utc(dayjs()).startOf('day').valueOf()
  const endExists = `doc.endAt.size() != 0`
  const endNotExists = `doc.endAt.size() == 0`
  const endDate = `doc.endAt.value.getMillis()`
  const source = `${endNotExists} || (${endExists} && ${endDate} > params.today)`

  return {
    script : {
      script : {
        source,
        lang: "painless",
        params: {
          today
        }
      }
    }
  }
}

export {
  couponValidityPeriod,
  couponAmount,
  existingCoupons
}
