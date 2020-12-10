import { render } from '@redwoodjs/testing'

import PainButton from './PainButton'

describe('PainButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PainButton />)
    }).not.toThrow()
  })
})
