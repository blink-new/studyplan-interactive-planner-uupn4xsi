import { useState, useEffect } from 'react'
import { blink } from './blink/client'
import { Sidebar } from './components/layout/Sidebar'
import { Header } from './components/layout/Header'
import { Dashboard } from './components/dashboard/Dashboard'
import { Calendar } from './components/pages/Calendar'
import { Goals } from './components/pages/Goals'
import { Analytics } from './components/pages/Analytics'
import { Tasks } from './components/pages/Tasks'
import { Settings } from './components/pages/Settings'
import Chatbot from './components/chatbot/Chatbot'
import { Toaster } from './components/ui/toaster'
import { useChatbot } from './hooks/use-chatbot'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const chatbot = useChatbot()

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'calendar':
        return <Calendar />
      case 'goals':
        return <Goals />
      case 'analytics':
        return <Analytics />
      case 'tasks':
        return <Tasks />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading StudyPlan...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mx-auto mb-6">
            <span className="text-2xl font-bold text-white">SP</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to StudyPlan</h1>
          <p className="text-gray-600 mb-6">
            Your interactive study planner to organize goals, track progress, and boost productivity.
          </p>
          <button
            onClick={() => blink.auth.login()}
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Sign In to Get Started
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="flex-1 lg:ml-64">
          <Header user={user} />
          <main className="min-h-[calc(100vh-80px)]">
            {renderContent()}
          </main>
        </div>
      </div>
      
      <Chatbot isOpen={chatbot.isOpen} onToggle={chatbot.toggle} />
      <Toaster />
    </div>
  )
}

export default App