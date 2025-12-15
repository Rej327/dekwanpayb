import { render, screen, fireEvent } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import Home from '../app/page'
import '@testing-library/jest-dom'

// Mock components to simplify routing test
jest.mock('../app/components/Dashboard', () => ({
  Dashboard: () => <div>Mocked Dashboard</div>,
}))
jest.mock('../app/components/TaskManager', () => ({
  TaskManager: () => <div>Mocked TaskManager</div>,
}))
jest.mock('../app/components/Settings', () => ({
  Settings: () => <div>Mocked Settings</div>,
}))
jest.mock('../app/components/PostManager', () => ({
  PostManager: () => <div>Mocked PostManager</div>,
}))

const renderWithMantine = (component: React.ReactNode) => {
  // Use a mock matchMedia if not already globally mocked, but usually it is in jest.setup.ts
  return render(<MantineProvider>{component}</MantineProvider>)
}

describe('App Routing', () => {
  it('renders Dashboard by default', () => {
    renderWithMantine(<Home />)
    expect(screen.getByText('Mocked Dashboard')).toBeInTheDocument()
  })

  it('navigates to Tasks when clicked', () => {
    renderWithMantine(<Home />)

    const tasksLink = screen.getByText('Tasks')
    fireEvent.click(tasksLink)

    expect(screen.getByText('Mocked TaskManager')).toBeInTheDocument()
    expect(screen.queryByText('Mocked Dashboard')).not.toBeInTheDocument()
  })

  it('navigates to Posts when clicked', () => {
    renderWithMantine(<Home />)

    const postsLink = screen.getByText('Posts')
    fireEvent.click(postsLink)

    expect(screen.getByText('Mocked PostManager')).toBeInTheDocument()
  })

  it('navigates to Settings when clicked', () => {
    renderWithMantine(<Home />)

    const settingsLink = screen.getByText('Settings')
    fireEvent.click(settingsLink)

    expect(screen.getByText('Mocked Settings')).toBeInTheDocument()
  })

  it('preserves navigation state', () => {
    renderWithMantine(<Home />)

    // Go to Settings
    fireEvent.click(screen.getByText('Settings'))
    expect(screen.getByText('Mocked Settings')).toBeInTheDocument()

    // Go back to Dashboard
    fireEvent.click(screen.getByText('Dashboard'))
    expect(screen.getByText('Mocked Dashboard')).toBeInTheDocument()
  })
})
