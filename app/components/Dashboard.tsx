'use client'

import {
  SimpleGrid,
  Paper,
  Text,
  Group,
  ThemeIcon,
  RingProgress,
  Center,
  Stack,
  Title,
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
      <Stack mb="xl">
        <Title order={2}>Dashboard Overview</Title>
        <Text c="dimmed" size="sm">
          Summary of your activity and progress.
        </Text>
      </Stack>

      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
        <Paper withBorder p="xl" radius="md" shadow="sm">
          <Group justify="space-between">
            <div>
              <Text c="dimmed" tt="uppercase" fw={700} size="xs" ls={1}>
                Total Tasks
              </Text>
              <Text fw={700} size="3rem" lh={1} mt="sm">
                {stats.totalTasks}
              </Text>
              <Text c="dimmed" size="sm" mt="xs">
                All time tasks
              </Text>
            </div>
            <ThemeIcon color="blue" variant="light" size={60} radius="md">
              <Text size="xl">📝</Text>
            </ThemeIcon>
          </Group>
        </Paper>

        <Paper withBorder p="xl" radius="md" shadow="sm">
          <Group justify="space-between">
            <div>
              <Text
                c="dimmed"
                tt="uppercase"
                fw={700}
                size="xs"
                style={{ letterSpacing: 1 }}
              >
                Completed
              </Text>
              <Text fw={700} size="3rem" lh={1} mt="sm">
                {stats.completedTasks}
              </Text>
              <Text c="dimmed" size="sm" mt="xs">
                Tasks finished
              </Text>
            </div>
            <ThemeIcon color="green" variant="light" size={60} radius="md">
              <Text size="xl">✅</Text>
            </ThemeIcon>
          </Group>
        </Paper>

        <Paper withBorder p="md" radius="md" shadow="sm">
          <Center h="100%">
            <Group>
              <RingProgress
                size={100}
                roundCaps
                thickness={10}
                sections={[{ value: completionRate, color: 'blue' }]}
                label={
                  <Text c="blue" fw={700} ta="center" size="sm">
                    {completionRate}%
                  </Text>
                }
              />
              <div>
                <Text fw={700} size="lg">
                  Completion Rate
                </Text>
                <Text c="dimmed" size="sm">
                  Overall progress
                </Text>
              </div>
            </Group>
          </Center>
        </Paper>
      </SimpleGrid>
    </div>
  )
}
