import { render, screen } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { Dashboard } from '../app/components/Dashboard'
import '@testing-library/jest-dom'

const renderWithMantine = (component: React.ReactNode) => {
  return render(<MantineProvider>{component}</MantineProvider>)
}

describe('Dashboard', () => {
  it('renders default stats correctly', () => {
    renderWithMantine(<Dashboard />)
    expect(screen.getByText('Dashboard Overview')).toBeInTheDocument()
    expect(screen.getByText('Total Tasks')).toBeInTheDocument()
    expect(screen.getByText('Completed')).toBeInTheDocument()
    expect(screen.getByText('Completion Rate')).toBeInTheDocument()
  })

  it('renders custom stats correctly', () => {
    const stats = { totalTasks: 10, completedTasks: 5 }
    renderWithMantine(<Dashboard stats={stats} />)

    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    // 50% completion
    expect(screen.getByText('50%')).toBeInTheDocument()
  })

  it('handles zero tasks gracefully', () => {
    const stats = { totalTasks: 0, completedTasks: 0 }
    renderWithMantine(<Dashboard stats={stats} />)

    expect(screen.getByText('0%')).toBeInTheDocument()
  })
})
