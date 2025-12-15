'use client'

import {
  AppShell,
  Burger,
  Group,
  NavLink,
  Text,
  Title,
  useMantineColorScheme,
  ActionIcon,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

interface MainShellProps {
  children: React.ReactNode
  activeTab: string
  onTabChange: (tab: string) => void
}

export function MainShell({
  children,
  activeTab,
  onTabChange,
}: MainShellProps) {
  const [opened, { toggle }] = useDisclosure()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  const data = [
    { label: 'Dashboard', description: 'Overview & Stats' },
    { label: 'Tasks', description: 'Manage your todos' },
    { label: 'Settings', description: 'App preferences' },
  ]

  const items = data.map((item) => (
    <NavLink
      key={item.label}
      active={item.label === activeTab}
      label={item.label}
      description={item.description}
      onClick={() => {
        onTabChange(item.label)
        // Close drawer on mobile when item selected
        if (window.innerWidth < 768 && opened) {
          toggle()
        }
      }}
      variant="filled"
      color="blue"
    />
  ))

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Title order={3}>DekwanPayb</Title>
          </Group>
          <ActionIcon
            variant="default"
            onClick={() => toggleColorScheme()}
            size="lg"
            aria-label="Toggle color scheme"
          >
            {colorScheme === 'dark' ? '☀️' : '🌙'}
          </ActionIcon>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Text size="xs" fw={500} c="dimmed" mb="sm">
          MENU
        </Text>
        {items}
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}
