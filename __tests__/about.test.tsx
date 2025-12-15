import { render } from '@testing-library/react'
import AboutPage from '../app/(public)/about/page'

describe('About page', () => {
  it('renders the about page', () => {
    const { getByText } = render(<AboutPage />)
    expect(getByText('About Page')).toBeInTheDocument()
  })
})
