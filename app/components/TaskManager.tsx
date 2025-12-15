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
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }])
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
    <Box maw={500} mx="auto">
      <Title order={2} mb="lg">
        Task Manager
      </Title>

      <Group mb="md">
        <TextInput
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.currentTarget.value)}
          style={{ flex: 1 }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') addTask()
          }}
        />
        <Button onClick={addTask}>Add</Button>
      </Group>

      <Stack>
        {tasks.map((task) => (
          <Paper key={task.id} shadow="xs" p="sm" withBorder>
            <Group justify="space-between">
              <Group>
                <Checkbox
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  aria-label={`Toggle task ${task.text}`}
                />
                <span
                  style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                  }}
                >
                  {task.text}
                </span>
              </Group>
              <ActionIcon
                color="red"
                variant="subtle"
                onClick={() => deleteTask(task.id)}
                aria-label="Delete task"
              >
                🗑️
              </ActionIcon>
            </Group>
          </Paper>
        ))}
        {tasks.length === 0 && (
          <Paper p="sm" c="dimmed" ta="center">
            No tasks yet
          </Paper>
        )}
      </Stack>
    </Box>
  )
}
