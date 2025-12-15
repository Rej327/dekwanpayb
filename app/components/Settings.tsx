'use client'

import {
  TextInput,
  Button,
  Group,
  Box,
  Title,
  Select,
  Paper,
  Text,
  Stack,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useState } from 'react'
import { isValidEmail } from '../utils/validators'

export function Settings() {
  const [loading, setLoading] = useState(false)
  const form = useForm({
    initialValues: {
      email: 'user@example.com',
      username: 'dekwan',
      theme: 'auto',
      notifications: 'enabled',
    },

    validate: {
      email: (value: string) => (isValidEmail(value) ? null : 'Invalid email'),
    },
  })

  const handleSubmit = (values: typeof form.values) => {
    setLoading(true)
    setTimeout(() => {
      console.log(values)
      setLoading(false)
    }, 1000)
  }

  return (
    <Box maw={500} mx="auto">
      <Stack mb="xl">
        <Title order={2}>Settings</Title>
        <Text c="dimmed" size="sm">
          Manage your account preferences and application settings.
        </Text>
      </Stack>

      <Paper withBorder p="xl" radius="md" shadow="sm">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <TextInput
              withAsterisk
              label="Email Address"
              description="We'll never share your email with anyone else."
              placeholder="your@email.com"
              {...form.getInputProps('email')}
            />

            <TextInput
              label="Username"
              description="Your public display name."
              placeholder="Your username"
              {...form.getInputProps('username')}
            />

            <Select
              label="Theme Preference"
              description="Choose how the app looks to you."
              placeholder="Pick one"
              data={['Light', 'Dark', 'Auto']}
              {...form.getInputProps('theme')}
            />

            <Group justify="flex-end" mt="lg">
              <Button type="submit" loading={loading}>
                Save Changes
              </Button>
            </Group>
          </Stack>
        </form>
      </Paper>
    </Box>
  )
}
