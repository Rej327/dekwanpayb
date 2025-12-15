import { render, screen, fireEvent } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { TaskManager } from '../app/components/TaskManager'
import '@testing-library/jest-dom'

const renderWithMantine = (component: React.ReactNode) => {
  return render(<MantineProvider>{component}</MantineProvider>)
}

describe('TaskManager', () => {
  it('renders correctly', () => {
    renderWithMantine(<TaskManager />)
    expect(screen.getByText('Task Manager')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Add a new task')).toBeInTheDocument()
    expect(screen.getByText('No tasks yet')).toBeInTheDocument()
  })

  it('allows adding a task', () => {
    renderWithMantine(<TaskManager />)

    const input = screen.getByPlaceholderText('Add a new task')
    const addButton = screen.getByText('Add')

    fireEvent.change(input, { target: { value: 'New Test Task' } })
    fireEvent.click(addButton)

    expect(screen.getByText('New Test Task')).toBeInTheDocument()
    expect(screen.queryByText('No tasks yet')).not.toBeInTheDocument()
  })

  it('allows toggling a task', () => {
    renderWithMantine(<TaskManager />)

    const input = screen.getByPlaceholderText('Add a new task')
    const addButton = screen.getByText('Add')

    fireEvent.change(input, { target: { value: 'Toggle Task' } })
    fireEvent.click(addButton)

    const checkbox = screen.getByRole('checkbox', { name: /Toggle task/i })
    fireEvent.click(checkbox)

    expect(checkbox).toBeChecked()
  })

  it('allows deleting a task', () => {
    renderWithMantine(<TaskManager />)

    const input = screen.getByPlaceholderText('Add a new task')
    const addButton = screen.getByText('Add')

    fireEvent.change(input, { target: { value: 'Delete Task' } })
    fireEvent.click(addButton)

    expect(screen.getByText('Delete Task')).toBeInTheDocument()

    const deleteButton = screen.getByRole('button', { name: /Delete task/i })
    fireEvent.click(deleteButton)

    expect(screen.queryByText('Delete Task')).not.toBeInTheDocument()
  })
})
