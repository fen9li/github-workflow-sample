import { formatDate } from './format-date'

describe('@utils/format-date', () => {
  it('correctly compares dates years apart', () => {
    const date = new Date(2002, 4, 1)
    const formattedDate = formatDate(date, 'DD/MM/YYYY', false)
    expect(formattedDate).toEqual('01/05/2002')
  })

  it('correctly compares dates months apart', () => {
    const date = new Date(2017, 7, 1)
    const formattedDate = formatDate(date, 'DD/MM/YYYY', false)
    expect(formattedDate).toEqual('01/08/2017')
  })

  it('correctly compares dates days apart', () => {
    const date = new Date(2017, 10, 11)
    const formattedDate = formatDate(date, 'DD/MM/YYYY', false)
    expect(formattedDate).toEqual('11/11/2017')
  })
})
