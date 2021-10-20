import { convertText } from '../../utils/helpers'

test('Should convert text correctly', () => {
  const text = '<i>It</i><b> is</b><i> the</i> best <b>app</b>'
  expect(convertText(text)).toEqual('It is the best app')
})