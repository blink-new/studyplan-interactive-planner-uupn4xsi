export interface User {
  id: string
  email: string
  displayName?: string
  role: 'student' | 'teacher'
}

export interface Goal {
  id: string
  userId: string
  title: string
  description?: string
  subject: string
  targetDate: string
  priority: 'low' | 'medium' | 'high'
  status: 'active' | 'completed' | 'paused'
  progress: number
  createdAt: string
  updatedAt: string
}

export interface StudySession {
  id: string
  userId: string
  goalId?: string
  subject: string
  title: string
  description?: string
  startTime: string
  endTime?: string
  duration: number
  status: 'scheduled' | 'active' | 'completed' | 'cancelled'
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface Task {
  id: string
  userId: string
  teacherId?: string
  title: string
  description?: string
  subject: string
  dueDate: string
  priority: 'low' | 'medium' | 'high'
  status: 'pending' | 'in_progress' | 'completed' | 'overdue'
  assignedAt: string
  completedAt?: string
  createdAt: string
  updatedAt: string
}

export interface Subject {
  id: string
  name: string
  color: string
  icon?: string
}

export interface MotivationalQuote {
  id: string
  text: string
  author: string
  category: string
}