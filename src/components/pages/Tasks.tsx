import { useState } from 'react'
import { 
  CheckSquare, 
  Plus, 
  Calendar,
  Clock,
  Flag,
  BookOpen,
  User,
  Filter,
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  AlertCircle
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

interface Task {
  id: string
  title: string
  description: string
  subject: string
  priority: 'low' | 'medium' | 'high'
  status: 'todo' | 'in-progress' | 'completed' | 'overdue'
  dueDate: string
  createdAt: string
  assignedBy?: string // For teacher assignments
  type: 'personal' | 'assignment'
  estimatedTime?: number // in minutes
  actualTime?: number // in minutes
  tags: string[]
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

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Complete React Project',
    description: 'Build a todo app using React hooks and context API',
    subject: 'Computer Science',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2024-01-25',
    createdAt: '2024-01-15',
    assignedBy: 'Prof. Johnson',
    type: 'assignment',
    estimatedTime: 180,
    actualTime: 120,
    tags: ['coding', 'project', 'react']
  },
  {
    id: '2',
    title: 'Study Calculus Chapter 6',
    description: 'Review derivatives and practice problems 1-20',
    subject: 'Mathematics',
    priority: 'medium',
    status: 'todo',
    dueDate: '2024-01-22',
    createdAt: '2024-01-18',
    type: 'personal',
    estimatedTime: 90,
    tags: ['study', 'calculus']
  },
  {
    id: '3',
    title: 'History Essay',
    description: 'Write 1500-word essay on World War II causes',
    subject: 'History',
    priority: 'high',
    status: 'completed',
    dueDate: '2024-01-20',
    createdAt: '2024-01-10',
    assignedBy: 'Dr. Smith',
    type: 'assignment',
    estimatedTime: 240,
    actualTime: 210,
    tags: ['essay', 'research', 'wwii']
  },
  {
    id: '4',
    title: 'Physics Lab Report',
    description: 'Complete lab report on momentum conservation',
    subject: 'Physics',
    priority: 'medium',
    status: 'overdue',
    dueDate: '2024-01-19',
    createdAt: '2024-01-12',
    assignedBy: 'Prof. Wilson',
    type: 'assignment',
    estimatedTime: 120,
    tags: ['lab', 'physics', 'report']
  },
  {
    id: '5',
    title: 'Read Literature Chapter 3',
    description: 'Read and take notes on Shakespeare analysis',
    subject: 'Literature',
    priority: 'low',
    status: 'todo',
    dueDate: '2024-01-28',
    createdAt: '2024-01-16',
    type: 'personal',
    estimatedTime: 60,
    tags: ['reading', 'shakespeare']
  }
]

export function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterSubject, setFilterSubject] = useState<string>('all')
  const [filterPriority, setFilterPriority] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'created'>('dueDate')
  
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    subject: '',
    priority: 'medium' as const,
    dueDate: '',
    estimatedTime: '',
    tags: ''
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': return 'bg-gray-500'
      case 'in-progress': return 'bg-blue-500'
      case 'completed': return 'bg-green-500'
      case 'overdue': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'todo': return <Clock className="h-3 w-3" />
      case 'in-progress': return <AlertCircle className="h-3 w-3" />
      case 'completed': return <Check className="h-3 w-3" />
      case 'overdue': return <X className="h-3 w-3" />
      default: return <Clock className="h-3 w-3" />
    }
  }

  const isOverdue = (task: Task) => {
    const today = new Date().toISOString().split('T')[0]
    return task.dueDate < today && task.status !== 'completed'
  }

  // Update overdue tasks
  const updatedTasks = tasks.map(task => ({
    ...task,
    status: isOverdue(task) ? 'overdue' as const : task.status
  }))

  const filteredTasks = updatedTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesSubject = filterSubject === 'all' || task.subject === filterSubject
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus
    
    return matchesSearch && matchesSubject && matchesPriority && matchesStatus
  })

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'dueDate':
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      case 'priority': {
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      }
      case 'created':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      default:
        return 0
    }
  })

  const handleCreateTask = () => {
    if (!newTask.title || !newTask.subject || !newTask.dueDate) return

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      subject: newTask.subject,
      priority: newTask.priority,
      status: 'todo',
      dueDate: newTask.dueDate,
      createdAt: new Date().toISOString(),
      type: 'personal',
      estimatedTime: newTask.estimatedTime ? parseInt(newTask.estimatedTime) : undefined,
      tags: newTask.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    }

    setTasks([...tasks, task])
    setNewTask({
      title: '',
      description: '',
      subject: '',
      priority: 'medium',
      dueDate: '',
      estimatedTime: '',
      tags: ''
    })
    setIsCreateDialogOpen(false)
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const updateTaskStatus = (taskId: string, status: Task['status']) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status } : task
    ))
  }

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const newStatus = task.status === 'completed' ? 'todo' : 'completed'
        return { ...task, status: newStatus }
      }
      return task
    }))
  }

  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    overdue: updatedTasks.filter(t => t.status === 'overdue').length,
    assignments: tasks.filter(t => t.type === 'assignment').length
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <CheckSquare className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
            <p className="text-gray-600">Manage assignments and to-dos</p>
          </div>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>
                Add a new task or assignment to your list.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Task Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Complete Math Homework"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={newTask.subject} onValueChange={(value) => setNewTask({ ...newTask, subject: value })}>
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
                  placeholder="Describe the task details..."
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={newTask.priority} onValueChange={(value: any) => setNewTask({ ...newTask, priority: value })}>
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
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="estimatedTime">Est. Time (min)</Label>
                  <Input
                    id="estimatedTime"
                    type="number"
                    placeholder="60"
                    value={newTask.estimatedTime}
                    onChange={(e) => setNewTask({ ...newTask, estimatedTime: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  placeholder="e.g., homework, study, project"
                  value={newTask.tags}
                  onChange={(e) => setNewTask({ ...newTask, tags: e.target.value })}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTask}>
                Create Task
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-600">{stats.todo}</p>
              <p className="text-sm text-gray-600">To Do</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
              <p className="text-sm text-gray-600">In Progress</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
              <p className="text-sm text-gray-600">Overdue</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{stats.assignments}</p>
              <p className="text-sm text-gray-600">Assignments</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Select value={filterSubject} onValueChange={setFilterSubject}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dueDate">Due Date</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="created">Created</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-4">
          {sortedTasks.map((task) => (
            <Card key={task.id} className={cn(
              "transition-all hover:shadow-md",
              task.status === 'completed' && "bg-green-50 border-green-200",
              task.status === 'overdue' && "bg-red-50 border-red-200"
            )}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Checkbox
                    checked={task.status === 'completed'}
                    onCheckedChange={() => toggleTaskCompletion(task.id)}
                    className="mt-1"
                  />
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className={cn(
                          "font-medium",
                          task.status === 'completed' && "line-through text-gray-500"
                        )}>
                          {task.title}
                        </h3>
                        <p className="text-sm text-gray-600">{task.description}</p>
                      </div>
                      
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-600"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${subjectColors[task.subject as keyof typeof subjectColors]}`} />
                        <span className="text-gray-600">{task.subject}</span>
                      </div>
                      
                      <Badge 
                        variant="secondary" 
                        className={`${getPriorityColor(task.priority)} text-white text-xs gap-1`}
                      >
                        <Flag className="h-3 w-3" />
                        {task.priority}
                      </Badge>
                      
                      <Badge 
                        variant="secondary" 
                        className={`${getStatusColor(task.status)} text-white text-xs gap-1`}
                      >
                        {getStatusIcon(task.status)}
                        {task.status}
                      </Badge>
                      
                      {task.type === 'assignment' && (
                        <Badge variant="outline" className="text-xs gap-1">
                          <User className="h-3 w-3" />
                          {task.assignedBy}
                        </Badge>
                      )}
                      
                      <div className="flex items-center gap-1 text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                      
                      {task.estimatedTime && (
                        <div className="flex items-center gap-1 text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>{task.estimatedTime}m</span>
                        </div>
                      )}
                    </div>
                    
                    {task.tags.length > 0 && (
                      <div className="flex gap-1 flex-wrap">
                        {task.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {sortedTasks.length === 0 && (
            <Card>
              <CardContent className="flex items-center justify-center h-64 text-gray-500">
                <div className="text-center">
                  <CheckSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No tasks found</p>
                  <p className="text-sm mt-2">Try adjusting your filters or create a new task.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="kanban">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {(['todo', 'in-progress', 'completed', 'overdue'] as const).map((status) => (
              <Card key={status}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium capitalize flex items-center gap-2">
                    {getStatusIcon(status)}
                    {status.replace('-', ' ')}
                    <Badge variant="secondary" className="ml-auto">
                      {updatedTasks.filter(t => t.status === status).length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {updatedTasks
                    .filter(task => task.status === status)
                    .map((task) => (
                      <Card key={task.id} className="p-3 cursor-pointer hover:shadow-sm transition-shadow">
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">{task.title}</h4>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${subjectColors[task.subject as keyof typeof subjectColors]}`} />
                            <span className="text-xs text-gray-600">{task.subject}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge 
                              variant="secondary" 
                              className={`${getPriorityColor(task.priority)} text-white text-xs`}
                            >
                              {task.priority}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </Card>
                    ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}