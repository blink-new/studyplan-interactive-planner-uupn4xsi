import { useState, useEffect } from 'react'
import { 
  Target, 
  Clock, 
  CheckSquare, 
  TrendingUp,
  Calendar,
  BookOpen,
  Award,
  Plus
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { MotivationalQuote } from './MotivationalQuote'
import { QuickActions } from './QuickActions'
import { RecentActivity } from './RecentActivity'
import { UpcomingSessions } from './UpcomingSessions'

const mockStats = {
  totalGoals: 8,
  completedGoals: 3,
  totalStudyTime: 24.5,
  weeklyStreak: 7,
  pendingTasks: 5,
  completedTasks: 12
}

const mockRecentGoals = [
  {
    id: '1',
    title: 'Master React Hooks',
    subject: 'Computer Science',
    progress: 75,
    dueDate: '2024-01-20',
    priority: 'high' as const
  },
  {
    id: '2',
    title: 'Complete Calculus Chapter 5',
    subject: 'Mathematics',
    progress: 45,
    dueDate: '2024-01-18',
    priority: 'medium' as const
  },
  {
    id: '3',
    title: 'Prepare History Presentation',
    subject: 'History',
    progress: 90,
    dueDate: '2024-01-15',
    priority: 'high' as const
  }
]

const subjectColors = {
  'Computer Science': 'bg-blue-500',
  'Mathematics': 'bg-green-500',
  'History': 'bg-purple-500',
  'Physics': 'bg-red-500',
  'Chemistry': 'bg-yellow-500'
}

export function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Good {currentTime.getHours() < 12 ? 'morning' : currentTime.getHours() < 18 ? 'afternoon' : 'evening'}! 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Ready to crush your study goals today?
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Today</p>
          <p className="text-lg font-semibold text-gray-900">
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-primary to-primary/80 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">
              Active Goals
            </CardTitle>
            <Target className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalGoals - mockStats.completedGoals}</div>
            <p className="text-xs opacity-90">
              {mockStats.completedGoals} completed this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Study Time
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalStudyTime}h</div>
            <p className="text-xs text-muted-foreground">
              This week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tasks
            </CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.pendingTasks}</div>
            <p className="text-xs text-muted-foreground">
              {mockStats.completedTasks} completed
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent to-accent/80 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">
              Study Streak
            </CardTitle>
            <Award className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.weeklyStreak} days</div>
            <p className="text-xs opacity-90">
              Keep it up! 🔥
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Goals */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Current Goals
              </CardTitle>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Goal
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockRecentGoals.map((goal) => (
                <div key={goal.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{goal.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className={`w-3 h-3 rounded-full ${subjectColors[goal.subject as keyof typeof subjectColors]}`} />
                        <span className="text-sm text-gray-600">{goal.subject}</span>
                        <Badge 
                          variant="secondary" 
                          className={`${getPriorityColor(goal.priority)} text-white text-xs`}
                        >
                          {goal.priority}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{goal.progress}%</p>
                      <p className="text-xs text-gray-500">Due {goal.dueDate}</p>
                    </div>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <RecentActivity />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Motivational Quote */}
          <MotivationalQuote />

          {/* Quick Actions */}
          <QuickActions />

          {/* Upcoming Sessions */}
          <UpcomingSessions />
        </div>
      </div>
    </div>
  )
}