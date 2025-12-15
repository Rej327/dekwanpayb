import { render, screen, fireEvent } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { Settings } from '../app/components/Settings'
import '@testing-library/jest-dom'

const renderWithMantine = (component: React.ReactNode) => {
  return render(<MantineProvider>{component}</MantineProvider>)
}

describe('Settings', () => {
  it('renders settings form correctly', () => {
    renderWithMantine(<Settings />)
    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Pick one')).toBeInTheDocument()
    expect(screen.getByText('Save Changes')).toBeInTheDocument()
  })

  it('validates email input', async () => {
    renderWithMantine(<Settings />)

    const emailInput = screen.getByLabelText(/Email/i)
    const saveButton = screen.getByText('Save Changes')

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.click(saveButton)

    expect(await screen.findByText('Invalid email')).toBeInTheDocument()
  })

  it('submits valid form', async () => {
    // Mock console.log
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

    renderWithMantine(<Settings />)

    const emailInput = screen.getByLabelText(/Email/i)
    const saveButton = screen.getByText('Save Changes')

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.click(saveButton)

    // Wait for potential async validation/submission
    // In this simple case, we check if validation error is NOT present
    expect(screen.queryByText('Invalid email')).not.toBeInTheDocument()

    // Clean up
    logSpy.mockRestore()
  })
})
