import Home from '@/app/page'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'

describe('Page', () => {
  it('renders the dashboard by default', () => {
    render(
      <MantineProvider>
        <Home />
      </MantineProvider>
    )

    expect(screen.getByText('Dashboard Overview')).toBeInTheDocument()
    expect(screen.getByText('DekwanPayb')).toBeInTheDocument()
  })
})
