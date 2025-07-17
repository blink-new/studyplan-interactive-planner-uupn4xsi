import { Clock, Calendar, Play } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const upcomingSessions = [
  {
    id: '1',
    title: 'Calculus Review',
    subject: 'Mathematics',
    startTime: '2:00 PM',
    duration: 60,
    status: 'scheduled' as const
  },
  {
    id: '2',
    title: 'React Components',
    subject: 'Computer Science',
    startTime: '4:30 PM',
    duration: 45,
    status: 'scheduled' as const
  },
  {
    id: '3',
    title: 'History Essay',
    subject: 'History',
    startTime: '7:00 PM',
    duration: 90,
    status: 'scheduled' as const
  }
]

const subjectColors = {
  'Computer Science': 'bg-blue-100 text-blue-800',
  'Mathematics': 'bg-green-100 text-green-800',
  'History': 'bg-purple-100 text-purple-800',
  'Physics': 'bg-red-100 text-red-800'
}

export function UpcomingSessions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Today's Sessions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {upcomingSessions.map((session) => (
          <div key={session.id} className="p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h4 className="font-medium text-sm text-gray-900">{session.title}</h4>
                <Badge 
                  variant="secondary" 
                  className={`text-xs mt-1 ${subjectColors[session.subject as keyof typeof subjectColors]}`}
                >
                  {session.subject}
                </Badge>
              </div>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                <Play className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>{session.startTime}</span>
              <span>•</span>
              <span>{session.duration} min</span>
            </div>
          </div>
        ))}
        
        {upcomingSessions.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No sessions scheduled for today</p>
            <Button size="sm" variant="outline" className="mt-2">
              Schedule Session
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}