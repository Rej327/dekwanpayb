'use client'

import { useState, useEffect } from 'react'
import {
  Paper,
  Title,
  Text,
  Button,
  Group,
  Stack,
  TextInput,
  Textarea,
  Card,
  Badge,
  LoadingOverlay,
  Grid,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export function PostManager() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [opened, { open, close }] = useDisclosure(false)

  const form = useForm({
    initialValues: {
      title: '',
      body: '',
    },
    validate: {
      title: (value) =>
        value.length < 5 ? 'Title must be at least 5 characters' : null,
      body: (value) =>
        value.length < 10 ? 'Body must be at least 10 characters' : null,
    },
  })

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts?_limit=6'
      )
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const createPost = async (values: typeof form.values) => {
    setLoading(true)
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
          method: 'POST',
          body: JSON.stringify({
            title: values.title,
            body: values.body,
            userId: 1,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      )
      const data = await response.json()
      // Add pseudo-id for key consistency in React
      const newPost = { ...data, id: Date.now() }
      setPosts([newPost, ...posts])
      form.reset()
      close()
    } catch (error) {
      console.error('Error creating post:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2}>Community Posts</Title>
          <Text c="dimmed" size="sm">
            Manage and view posts from the JSONPlaceholder API
          </Text>
        </div>
        <Button onClick={open} variant="light" color="blue">
          Create New Post
        </Button>
      </Group>

      {opened && (
        <Paper withBorder p="md" radius="md" bg="var(--mantine-color-body)">
          <form onSubmit={form.onSubmit(createPost)}>
            <Stack gap="sm">
              <TextInput
                label="Title"
                placeholder="Enter post title"
                {...form.getInputProps('title')}
              />
              <Textarea
                label="Content"
                placeholder="What's on your mind?"
                minRows={3}
                {...form.getInputProps('body')}
              />
              <Group justify="flex-end" mt="md">
                <Button variant="subtle" color="gray" onClick={close}>
                  Cancel
                </Button>
                <Button type="submit" loading={loading}>
                  Publish Post
                </Button>
              </Group>
            </Stack>
          </form>
        </Paper>
      )}

      <div style={{ position: 'relative', minHeight: 200 }}>
        <LoadingOverlay
          visible={loading && posts.length === 0}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />

        <Grid>
          {posts.map((post) => (
            <Grid.Col key={post.id} span={{ base: 12, md: 6, lg: 4 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
                <Card.Section withBorder inheritPadding py="xs">
                  <Group justify="space-between">
                    <Badge color="blue" variant="light">
                      Post #{post.id}
                    </Badge>
                  </Group>
                </Card.Section>

                <Text fw={500} size="lg" mt="md" lineClamp={2}>
                  {post.title}
                </Text>

                <Text mt="xs" c="dimmed" size="sm" lineClamp={3}>
                  {post.body}
                </Text>

                <Button
                  variant="light"
                  color="blue"
                  fullWidth
                  mt="md"
                  radius="md"
                >
                  Read more
                </Button>
              </Card>
            </Grid.Col>
          ))}
        </Grid>

        {!loading && posts.length === 0 && (
          <Text ta="center" c="dimmed" py="xl">
            No posts available
          </Text>
        )}
      </div>
    </Stack>
  )
}
