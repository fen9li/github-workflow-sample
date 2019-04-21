import StringType from './string/string-type'
import SelectType from './select/select-type'
import BooleanType from './boolean/boolean-type'
import DateType from './date/date-type'
import TimeType from './time/time-type'
import RelationalType from './relational/relational-type'
import NumericType from './numeric/numeric-type'

const types = {
  string: StringType,
  select: SelectType,
  boolean: BooleanType,
  date: DateType,
  time: TimeType,
  relational: RelationalType,
  numeric: NumericType,
}

export default types
