'use client'

import { useState } from 'react'
import { MainShell } from './components/MainShell'
import { Dashboard } from './components/Dashboard'
import { TaskManager } from './components/TaskManager'
import { Settings } from './components/Settings'
import { PostManager } from './components/PostManager'

export default function Home() {
  const [activeTab, setActiveTab] = useState('Dashboard')

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <Dashboard />
      case 'Tasks':
        return <TaskManager />
      case 'Posts':
        return <PostManager />
      case 'Settings':
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <MainShell activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </MainShell>
  )
}
