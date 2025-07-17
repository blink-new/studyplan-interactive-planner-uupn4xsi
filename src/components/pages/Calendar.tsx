import { useState } from 'react'
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Clock, 
  BookOpen, 
  Edit2, 
  Trash2,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Square
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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

interface StudySession {
  id: string
  title: string
  subject: string
  description: string
  startTime: string
  endTime: string
  date: string
  status: 'scheduled' | 'in-progress' | 'completed' | 'missed'
  type: 'study' | 'review' | 'exam' | 'assignment'
  location?: string
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

const sessionTypes = [
  { value: 'study', label: 'Study Session', color: 'bg-blue-500' },
  { value: 'review', label: 'Review', color: 'bg-green-500' },
  { value: 'exam', label: 'Exam', color: 'bg-red-500' },
  { value: 'assignment', label: 'Assignment', color: 'bg-purple-500' }
]

const initialSessions: StudySession[] = [
  {
    id: '1',
    title: 'React Hooks Deep Dive',
    subject: 'Computer Science',
    description: 'Study useState, useEffect, and custom hooks',
    startTime: '09:00',
    endTime: '11:00',
    date: '2024-01-20',
    status: 'scheduled',
    type: 'study',
    location: 'Library'
  },
  {
    id: '2',
    title: 'Calculus Review',
    subject: 'Mathematics',
    description: 'Review integration techniques',
    startTime: '14:00',
    endTime: '15:30',
    date: '2024-01-20',
    status: 'completed',
    type: 'review'
  },
  {
    id: '3',
    title: 'History Exam',
    subject: 'History',
    description: 'World War II exam',
    startTime: '10:00',
    endTime: '12:00',
    date: '2024-01-22',
    status: 'scheduled',
    type: 'exam',
    location: 'Room 205'
  },
  {
    id: '4',
    title: 'Physics Lab Report',
    subject: 'Physics',
    description: 'Complete lab report on momentum',
    startTime: '16:00',
    endTime: '18:00',
    date: '2024-01-21',
    status: 'scheduled',
    type: 'assignment'
  }
]

export function Calendar() {
  const [sessions, setSessions] = useState<StudySession[]>(initialSessions)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<'month' | 'week' | 'day'>('month')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string>('')
  
  const [newSession, setNewSession] = useState({
    title: '',
    subject: '',
    description: '',
    startTime: '',
    endTime: '',
    date: '',
    type: 'study' as const,
    location: ''
  })

  // Get current month/year for calendar header
  const monthYear = currentDate.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  })

  // Get days in current month
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }
    
    return days
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const getSessionsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    return sessions.filter(session => session.date === dateString)
  }

  const getTodaysSessions = () => {
    const today = new Date().toISOString().split('T')[0]
    return sessions.filter(session => session.date === today)
  }

  const getUpcomingSessions = () => {
    const today = new Date().toISOString().split('T')[0]
    return sessions
      .filter(session => session.date >= today && session.status === 'scheduled')
      .sort((a, b) => {
        if (a.date === b.date) {
          return a.startTime.localeCompare(b.startTime)
        }
        return a.date.localeCompare(b.date)
      })
      .slice(0, 5)
  }

  const handleCreateSession = () => {
    if (!newSession.title || !newSession.subject || !newSession.date || !newSession.startTime || !newSession.endTime) {
      return
    }

    const session: StudySession = {
      id: Date.now().toString(),
      title: newSession.title,
      subject: newSession.subject,
      description: newSession.description,
      startTime: newSession.startTime,
      endTime: newSession.endTime,
      date: newSession.date,
      status: 'scheduled',
      type: newSession.type,
      location: newSession.location
    }

    setSessions([...sessions, session])
    setNewSession({
      title: '',
      subject: '',
      description: '',
      startTime: '',
      endTime: '',
      date: '',
      type: 'study',
      location: ''
    })
    setIsCreateDialogOpen(false)
  }

  const handleDeleteSession = (sessionId: string) => {
    setSessions(sessions.filter(session => session.id !== sessionId))
  }

  const updateSessionStatus = (sessionId: string, status: StudySession['status']) => {
    setSessions(sessions.map(session =>
      session.id === sessionId ? { ...session, status } : session
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500'
      case 'in-progress': return 'bg-yellow-500'
      case 'completed': return 'bg-green-500'
      case 'missed': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getTypeColor = (type: string) => {
    const typeObj = sessionTypes.find(t => t.value === type)
    return typeObj?.color || 'bg-gray-500'
  }

  const stats = {
    total: sessions.length,
    today: getTodaysSessions().length,
    completed: sessions.filter(s => s.status === 'completed').length,
    upcoming: getUpcomingSessions().length
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <CalendarIcon className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
            <p className="text-gray-600">Schedule and manage your study sessions</p>
          </div>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Schedule Session
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Schedule Study Session</DialogTitle>
              <DialogDescription>
                Create a new study session with details and timing.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Session Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., React Hooks Study"
                    value={newSession.title}
                    onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={newSession.subject} onValueChange={(value) => setNewSession({ ...newSession, subject: value })}>
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
                  placeholder="What will you study or work on?"
                  value={newSession.description}
                  onChange={(e) => setNewSession({ ...newSession, description: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newSession.date}
                    onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={newSession.startTime}
                    onChange={(e) => setNewSession({ ...newSession, startTime: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={newSession.endTime}
                    onChange={(e) => setNewSession({ ...newSession, endTime: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Session Type</Label>
                  <Select value={newSession.type} onValueChange={(value: any) => setNewSession({ ...newSession, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sessionTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location (Optional)</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Library, Room 205"
                    value={newSession.location}
                    onChange={(e) => setNewSession({ ...newSession, location: e.target.value })}
                  />
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateSession}>
                Schedule Session
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
                <p className="text-sm text-gray-600">Total Sessions</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today</p>
                <p className="text-2xl font-bold text-blue-600">{stats.today}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
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
              <BookOpen className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-purple-600">{stats.upcoming}</p>
              </div>
              <Plus className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  {monthYear}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => navigateMonth('prev')}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => navigateMonth('next')}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {getDaysInMonth().map((date, index) => {
                  if (!date) {
                    return <div key={index} className="p-2 h-20" />
                  }
                  
                  const daysSessions = getSessionsForDate(date)
                  const isToday = date.toDateString() === new Date().toDateString()
                  
                  return (
                    <div
                      key={index}
                      className={cn(
                        "p-2 h-20 border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors",
                        isToday && "bg-primary/10 border-primary/20"
                      )}
                      onClick={() => setSelectedDate(date.toISOString().split('T')[0])}
                    >
                      <div className={cn(
                        "text-sm font-medium mb-1",
                        isToday ? "text-primary" : "text-gray-900"
                      )}>
                        {date.getDate()}
                      </div>
                      <div className="space-y-1">
                        {daysSessions.slice(0, 2).map((session) => (
                          <div
                            key={session.id}
                            className={cn(
                              "text-xs px-1 py-0.5 rounded text-white truncate",
                              subjectColors[session.subject as keyof typeof subjectColors]
                            )}
                          >
                            {session.title}
                          </div>
                        ))}
                        {daysSessions.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{daysSessions.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Sessions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Today's Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              {getTodaysSessions().length === 0 ? (
                <p className="text-gray-500 text-sm">No sessions scheduled for today</p>
              ) : (
                <div className="space-y-3">
                  {getTodaysSessions().map((session) => (
                    <div key={session.id} className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-sm">{session.title}</h4>
                          <p className="text-xs text-gray-600">{session.subject}</p>
                        </div>
                        <div className="flex gap-1">
                          {session.status === 'scheduled' && (
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6"
                              onClick={() => updateSessionStatus(session.id, 'in-progress')}
                            >
                              <Play className="h-3 w-3" />
                            </Button>
                          )}
                          {session.status === 'in-progress' && (
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6"
                              onClick={() => updateSessionStatus(session.id, 'completed')}
                            >
                              <Square className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {session.startTime} - {session.endTime}
                        </span>
                        <Badge 
                          variant="secondary" 
                          className={`${getStatusColor(session.status)} text-white text-xs`}
                        >
                          {session.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Sessions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              {getUpcomingSessions().length === 0 ? (
                <p className="text-gray-500 text-sm">No upcoming sessions</p>
              ) : (
                <div className="space-y-3">
                  {getUpcomingSessions().map((session) => (
                    <div key={session.id} className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-sm">{session.title}</h4>
                          <p className="text-xs text-gray-600">{session.subject}</p>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 text-red-600"
                          onClick={() => handleDeleteSession(session.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {new Date(session.date).toLocaleDateString()} • {session.startTime}
                        </span>
                        <Badge 
                          variant="secondary" 
                          className={`${getTypeColor(session.type)} text-white text-xs`}
                        >
                          {session.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}