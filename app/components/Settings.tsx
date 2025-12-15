'use client'

import { TextInput, Button, Group, Box, Title, Select } from '@mantine/core'
import { useForm } from '@mantine/form'

export function Settings() {
  const form = useForm({
    initialValues: {
      email: 'user@example.com',
      username: 'dekwan',
      theme: 'auto',
      notifications: 'enabled',
    },

    validate: {
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : 'Invalid email',
    },
  })

  return (
    <Box maw={400} mx="auto">
      <Title order={2} mb="lg">
        Settings
      </Title>

      <form
        onSubmit={form.onSubmit((values: typeof form.values) =>
          console.log(values)
        )}
      >
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
          mb="md"
        />

        <TextInput
          label="Username"
          placeholder="Your username"
          {...form.getInputProps('username')}
          mb="md"
        />

        <Select
          label="Theme Preference"
          placeholder="Pick one"
          data={['Light', 'Dark', 'Auto']}
          {...form.getInputProps('theme')}
          mb="md"
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Save Settings</Button>
        </Group>
      </form>
    </Box>
  )
}
