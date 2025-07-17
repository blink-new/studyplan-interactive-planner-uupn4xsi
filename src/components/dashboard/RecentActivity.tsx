import { CheckCircle, Clock, Target, BookOpen } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const activities = [
  {
    id: '1',
    type: 'goal_completed',
    title: 'Completed "Learn React Basics"',
    subject: 'Computer Science',
    time: '2 hours ago',
    icon: CheckCircle,
    color: 'text-green-600'
  },
  {
    id: '2',
    type: 'session_completed',
    title: 'Finished 45min study session',
    subject: 'Mathematics',
    time: '4 hours ago',
    icon: Clock,
    color: 'text-blue-600'
  },
  {
    id: '3',
    type: 'goal_created',
    title: 'Created new goal "Master Calculus"',
    subject: 'Mathematics',
    time: '1 day ago',
    icon: Target,
    color: 'text-purple-600'
  },
  {
    id: '4',
    type: 'subject_added',
    title: 'Added new subject "Physics"',
    subject: 'Physics',
    time: '2 days ago',
    icon: BookOpen,
    color: 'text-orange-600'
  }
]

const subjectColors = {
  'Computer Science': 'bg-blue-100 text-blue-800',
  'Mathematics': 'bg-green-100 text-green-800',
  'Physics': 'bg-red-100 text-red-800',
  'History': 'bg-purple-100 text-purple-800'
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`p-2 rounded-full bg-gray-100 ${activity.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    {activity.title}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${subjectColors[activity.subject as keyof typeof subjectColors]}`}
                    >
                      {activity.subject}
                    </Badge>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}