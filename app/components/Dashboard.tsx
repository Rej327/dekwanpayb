'use client'

import {
  SimpleGrid,
  Paper,
  Text,
  Group,
  ThemeIcon,
  RingProgress,
  Center,
} from '@mantine/core'

interface DashboardProps {
  stats?: {
    totalTasks: number
    completedTasks: number
  }
}

export function Dashboard({
  stats = { totalTasks: 5, completedTasks: 3 },
}: DashboardProps) {
  const completionRate =
    stats.totalTasks > 0
      ? Math.round((stats.completedTasks / stats.totalTasks) * 100)
      : 0

  return (
    <div>
      <Text size="xl" fw={700} mb="lg">
        Dashboard Overview
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 3 }}>
        <Paper withBorder p="md" radius="md">
          <Group justify="space-between">
            <div>
              <Text c="dimmed" tt="uppercase" fw={700} size="xs">
                Total Tasks
              </Text>
              <Text fw={700} size="xl">
                {stats.totalTasks}
              </Text>
            </div>
            <ThemeIcon color="blue" variant="light" size={38} radius="md">
              📝
            </ThemeIcon>
          </Group>
        </Paper>

        <Paper withBorder p="md" radius="md">
          <Group justify="space-between">
            <div>
              <Text c="dimmed" tt="uppercase" fw={700} size="xs">
                Completed
              </Text>
              <Text fw={700} size="xl">
                {stats.completedTasks}
              </Text>
            </div>
            <ThemeIcon color="green" variant="light" size={38} radius="md">
              ✅
            </ThemeIcon>
          </Group>
        </Paper>

        <Paper withBorder p="md" radius="md">
          <Center>
            <RingProgress
              size={80}
              roundCaps
              thickness={8}
              sections={[{ value: completionRate, color: 'blue' }]}
              label={
                <Text c="blue" fw={700} ta="center" size="xs">
                  {completionRate}%
                </Text>
              }
            />
            <Text ml="sm" size="sm" fw={500}>
              Completion Rate
            </Text>
          </Center>
        </Paper>
      </SimpleGrid>
    </div>
  )
}
