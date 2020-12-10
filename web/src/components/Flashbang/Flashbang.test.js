import { render } from '@redwoodjs/testing'

import Flashbang from './Flashbang'

describe('Flashbang', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Flashbang />)
    }).not.toThrow()
  })
})
