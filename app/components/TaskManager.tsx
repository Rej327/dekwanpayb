'use client'

import { useState } from 'react'
import {
  TextInput,
  Button,
  Group,
  Box,
  Title,
  Checkbox,
  ActionIcon,
  Paper,
  Stack,
  Text,
} from '@mantine/core'

interface Task {
  id: number
  text: string
  completed: boolean
}

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState('')

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([{ id: Date.now(), text: newTask, completed: false }, ...tasks])
      setNewTask('')
    }
  }

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  return (
    <Box maw={600} mx="auto">
      <Group justify="space-between" mb="xl" align="center">
        <div>
          <Title order={2}>My Tasks</Title>
          <Text c="dimmed" size="sm">
            Keep track of your daily goals
          </Text>
        </div>
        <Text fw={500} c="blue">
          {tasks.filter((t) => t.completed).length}/{tasks.length} Done
        </Text>
      </Group>

      <Paper withBorder p="md" radius="md" mb="lg" shadow="sm">
        <Group gap="xs">
          <TextInput
            placeholder="What needs to be done?"
            value={newTask}
            onChange={(e) => setNewTask(e.currentTarget.value)}
            style={{ flex: 1 }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') addTask()
            }}
            size="md"
          />
          <Button onClick={addTask} size="md">
            Add Task
          </Button>
        </Group>
      </Paper>

      <Stack gap="sm">
        {tasks.map((task) => (
          <Paper
            key={task.id}
            shadow="xs"
            p="md"
            radius="md"
            withBorder
            style={{
              transition: 'all 0.2s ease',
              opacity: task.completed ? 0.6 : 1,
              borderColor: task.completed
                ? 'var(--mantine-color-green-3)'
                : undefined,
            }}
          >
            <Group justify="space-between">
              <Group>
                <Checkbox
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  aria-label={`Toggle task ${task.text}`}
                  size="md"
                  color="green"
                  radius="xl"
                />
                <Text
                  size="md"
                  td={task.completed ? 'line-through' : 'none'}
                  c={task.completed ? 'dimmed' : undefined}
                >
                  {task.text}
                </Text>
              </Group>
              <ActionIcon
                color="red"
                variant="subtle"
                onClick={() => deleteTask(task.id)}
                aria-label="Delete task"
                size="lg"
              >
                🗑️
              </ActionIcon>
            </Group>
          </Paper>
        ))}
        {tasks.length === 0 && (
          <Box py={50} ta="center" c="dimmed">
            <Text size="xl">✨ No tasks yet</Text>
            <Text size="sm">Add a task above to get started!</Text>
          </Box>
        )}
      </Stack>
    </Box>
  )
}
