import sortBy from 'lodash/sortBy'

export default function sort(array, field = 'label') {
  return sortBy(array, function(item) { return item[field].toLowerCase() })
}
