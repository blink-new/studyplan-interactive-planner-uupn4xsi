import { useState } from 'react'
import { 
  Target, 
  Plus, 
  Edit2, 
  Trash2, 
  Calendar,
  Clock,
  Flag,
  BookOpen,
  CheckCircle2,
  Circle
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface Goal {
  id: string
  title: string
  description: string
  subject: string
  priority: 'low' | 'medium' | 'high'
  progress: number
  dueDate: string
  createdAt: string
  milestones: Milestone[]
  status: 'active' | 'completed' | 'paused'
}

interface Milestone {
  id: string
  title: string
  completed: boolean
  dueDate?: string
}

const subjects = [
  'Computer Science',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'History',
  'Literature',
  'Languages',
  'Art',
  'Music',
  'Other'
]

const subjectColors = {
  'Computer Science': 'bg-blue-500',
  'Mathematics': 'bg-green-500',
  'Physics': 'bg-red-500',
  'Chemistry': 'bg-yellow-500',
  'Biology': 'bg-emerald-500',
  'History': 'bg-purple-500',
  'Literature': 'bg-pink-500',
  'Languages': 'bg-indigo-500',
  'Art': 'bg-orange-500',
  'Music': 'bg-cyan-500',
  'Other': 'bg-gray-500'
}

const initialGoals: Goal[] = [
  {
    id: '1',
    title: 'Master React Hooks',
    description: 'Learn and practice all React hooks including useState, useEffect, useContext, and custom hooks',
    subject: 'Computer Science',
    priority: 'high',
    progress: 75,
    dueDate: '2024-02-15',
    createdAt: '2024-01-01',
    status: 'active',
    milestones: [
      { id: '1', title: 'Learn useState and useEffect', completed: true },
      { id: '2', title: 'Practice useContext and useReducer', completed: true },
      { id: '3', title: 'Build custom hooks', completed: false },
      { id: '4', title: 'Complete practice project', completed: false }
    ]
  },
  {
    id: '2',
    title: 'Complete Calculus Chapter 5',
    description: 'Study integration techniques and applications',
    subject: 'Mathematics',
    priority: 'medium',
    progress: 45,
    dueDate: '2024-01-30',
    createdAt: '2024-01-05',
    status: 'active',
    milestones: [
      { id: '1', title: 'Basic integration rules', completed: true },
      { id: '2', title: 'Integration by parts', completed: false },
      { id: '3', title: 'Applications of integration', completed: false }
    ]
  },
  {
    id: '3',
    title: 'History Presentation',
    description: 'Prepare comprehensive presentation on World War II',
    subject: 'History',
    priority: 'high',
    progress: 100,
    dueDate: '2024-01-20',
    createdAt: '2024-01-10',
    status: 'completed',
    milestones: [
      { id: '1', title: 'Research sources', completed: true },
      { id: '2', title: 'Create outline', completed: true },
      { id: '3', title: 'Design slides', completed: true },
      { id: '4', title: 'Practice presentation', completed: true }
    ]
  }
]

export function Goals() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null)
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'paused'>('all')
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'progress'>('dueDate')

  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    subject: '',
    priority: 'medium' as const,
    dueDate: '',
    milestones: ['']
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <Flag className="h-3 w-3" />
      case 'medium': return <Clock className="h-3 w-3" />
      case 'low': return <Circle className="h-3 w-3" />
      default: return <Circle className="h-3 w-3" />
    }
  }

  const filteredGoals = goals.filter(goal => {
    if (filter === 'all') return true
    return goal.status === filter
  })

  const sortedGoals = [...filteredGoals].sort((a, b) => {
    switch (sortBy) {
      case 'dueDate':
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      case 'priority': {
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      }
      case 'progress':
        return b.progress - a.progress
      default:
        return 0
    }
  })

  const handleCreateGoal = () => {
    if (!newGoal.title || !newGoal.subject || !newGoal.dueDate) return

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      subject: newGoal.subject,
      priority: newGoal.priority,
      progress: 0,
      dueDate: newGoal.dueDate,
      createdAt: new Date().toISOString(),
      status: 'active',
      milestones: newGoal.milestones
        .filter(m => m.trim())
        .map((title, index) => ({
          id: `${Date.now()}-${index}`,
          title: title.trim(),
          completed: false
        }))
    }

    setGoals([...goals, goal])
    setNewGoal({
      title: '',
      description: '',
      subject: '',
      priority: 'medium',
      dueDate: '',
      milestones: ['']
    })
    setIsCreateDialogOpen(false)
  }

  const handleDeleteGoal = (goalId: string) => {
    setGoals(goals.filter(goal => goal.id !== goalId))
  }

  const toggleMilestone = (goalId: string, milestoneId: string) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const updatedMilestones = goal.milestones.map(milestone =>
          milestone.id === milestoneId
            ? { ...milestone, completed: !milestone.completed }
            : milestone
        )
        
        const completedCount = updatedMilestones.filter(m => m.completed).length
        const progress = Math.round((completedCount / updatedMilestones.length) * 100)
        
        return {
          ...goal,
          milestones: updatedMilestones,
          progress,
          status: progress === 100 ? 'completed' as const : 'active' as const
        }
      }
      return goal
    }))
  }

  const addMilestone = () => {
    setNewGoal({
      ...newGoal,
      milestones: [...newGoal.milestones, '']
    })
  }

  const updateMilestone = (index: number, value: string) => {
    const updatedMilestones = [...newGoal.milestones]
    updatedMilestones[index] = value
    setNewGoal({
      ...newGoal,
      milestones: updatedMilestones
    })
  }

  const removeMilestone = (index: number) => {
    setNewGoal({
      ...newGoal,
      milestones: newGoal.milestones.filter((_, i) => i !== index)
    })
  }

  const stats = {
    total: goals.length,
    active: goals.filter(g => g.status === 'active').length,
    completed: goals.filter(g => g.status === 'completed').length,
    avgProgress: Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Target className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Goals</h1>
            <p className="text-gray-600">Set and track your study objectives</p>
          </div>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
              <DialogDescription>
                Set a new study goal with milestones to track your progress.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Goal Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Master React Hooks"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={newGoal.subject} onValueChange={(value) => setNewGoal({ ...newGoal, subject: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your goal in detail..."
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={newGoal.priority} onValueChange={(value: any) => setNewGoal({ ...newGoal, priority: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newGoal.dueDate}
                    onChange={(e) => setNewGoal({ ...newGoal, dueDate: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Milestones</Label>
                {newGoal.milestones.map((milestone, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder={`Milestone ${index + 1}`}
                      value={milestone}
                      onChange={(e) => updateMilestone(index, e.target.value)}
                    />
                    {newGoal.milestones.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeMilestone(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addMilestone}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Milestone
                </Button>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateGoal}>
                Create Goal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Goals</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Target className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-blue-600">{stats.active}</p>
              </div>
              <Circle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Progress</p>
                <p className="text-2xl font-bold text-purple-600">{stats.avgProgress}%</p>
              </div>
              <BookOpen className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex gap-2">
          {(['all', 'active', 'completed', 'paused'] as const).map((status) => (
            <Button
              key={status}
              variant={filter === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(status)}
              className="capitalize"
            >
              {status}
            </Button>
          ))}
        </div>
        
        <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dueDate">Sort by Due Date</SelectItem>
            <SelectItem value="priority">Sort by Priority</SelectItem>
            <SelectItem value="progress">Sort by Progress</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Goals List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedGoals.map((goal) => (
          <Card key={goal.id} className={cn(
            "transition-all hover:shadow-md",
            goal.status === 'completed' && "bg-green-50 border-green-200"
          )}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${subjectColors[goal.subject as keyof typeof subjectColors]}`} />
                    <span className="text-sm text-gray-600">{goal.subject}</span>
                    <Badge 
                      variant="secondary" 
                      className={`${getPriorityColor(goal.priority)} text-white text-xs gap-1`}
                    >
                      {getPriorityIcon(goal.priority)}
                      {goal.priority}
                    </Badge>
                    {goal.status === 'completed' && (
                      <Badge variant="secondary" className="bg-green-500 text-white text-xs">
                        Completed
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{goal.title}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                </div>
                
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteGoal(goal.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Progress */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span className="font-medium">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>
              
              {/* Due Date */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Due: {new Date(goal.dueDate).toLocaleDateString()}</span>
              </div>
              
              {/* Milestones */}
              <div>
                <h4 className="text-sm font-medium mb-2">Milestones</h4>
                <div className="space-y-2">
                  {goal.milestones.map((milestone) => (
                    <div key={milestone.id} className="flex items-center gap-2">
                      <button
                        onClick={() => toggleMilestone(goal.id, milestone.id)}
                        className={cn(
                          "flex items-center justify-center w-4 h-4 rounded border-2 transition-colors",
                          milestone.completed
                            ? "bg-primary border-primary text-white"
                            : "border-gray-300 hover:border-primary"
                        )}
                      >
                        {milestone.completed && <CheckCircle2 className="h-3 w-3" />}
                      </button>
                      <span className={cn(
                        "text-sm",
                        milestone.completed && "line-through text-gray-500"
                      )}>
                        {milestone.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedGoals.length === 0 && (
        <Card>
          <CardContent className="flex items-center justify-center h-64 text-gray-500">
            <div className="text-center">
              <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No goals found</p>
              <p className="text-sm mt-2">
                {filter === 'all' 
                  ? 'Create your first goal to get started!' 
                  : `No ${filter} goals found.`
                }
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}