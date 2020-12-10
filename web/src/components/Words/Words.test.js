import { render } from '@redwoodjs/testing'

import Words from './Words'

describe('Words', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Words />)
    }).not.toThrow()
  })
})
