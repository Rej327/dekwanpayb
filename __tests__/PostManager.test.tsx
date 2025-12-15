import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MantineProvider } from '@mantine/core'
import { PostManager } from '../app/components/PostManager'
import '@testing-library/jest-dom'

// Mock global fetch
global.fetch = jest.fn()

const renderWithMantine = (component: React.ReactNode) => {
  return render(<MantineProvider>{component}</MantineProvider>)
}

describe('PostManager', () => {
  beforeEach(() => {
    ;(global.fetch as jest.Mock).mockClear()
  })

  it('renders post manager and fetches posts', async () => {
    const mockPosts = [
      { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 },
      { id: 2, title: 'Post 2', body: 'Body 2', userId: 1 },
    ]

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockPosts,
    })

    renderWithMantine(<PostManager />)

    expect(screen.getByText('Community Posts')).toBeInTheDocument()

    // Should display posts after fetch
    await waitFor(() => {
      expect(screen.getByText('Post 1')).toBeInTheDocument()
      expect(screen.getByText('Post 2')).toBeInTheDocument()
    })
  })

  it('allows creating a new post', async () => {
    const user = userEvent.setup()

    // Mock initial fetch
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => [],
    })

    renderWithMantine(<PostManager />)

    // Open create modal
    await user.click(screen.getByText('Create New Post'))

    const titleInput = screen.getByPlaceholderText('Enter post title')
    const bodyInput = screen.getByPlaceholderText("What's on your mind?")
    const submitButton = screen.getByText('Publish Post')

    // Fill form
    await user.type(titleInput, 'New Test Post')
    await user.type(bodyInput, 'This is a test post body content')

    // Mock create response
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        title: 'New Test Post',
        body: 'This is a test post body content',
        userId: 1,
        id: 101,
      }),
    })

    await user.click(submitButton)

    expect(await screen.findByText('New Test Post')).toBeInTheDocument()
  })

  it('validates post inputs', async () => {
    const user = userEvent.setup()

    // Mock initial fetch to return empty array so component renders without crashing
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => [],
    })

    renderWithMantine(<PostManager />)

    // Open create modal
    await user.click(screen.getByText('Create New Post'))

    const submitButton = screen.getByText('Publish Post')

    // Try to submit empty
    await user.click(submitButton)

    expect(
      await screen.findByText('Title must be at least 5 characters')
    ).toBeInTheDocument()
    expect(
      await screen.findByText('Body must be at least 10 characters')
    ).toBeInTheDocument()
  })
})
