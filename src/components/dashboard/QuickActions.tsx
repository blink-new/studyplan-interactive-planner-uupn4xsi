import { Plus, Clock, Target, Calendar, BookOpen } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const actions = [
  {
    id: 'new-goal',
    label: 'New Goal',
    icon: Target,
    color: 'bg-blue-500 hover:bg-blue-600',
    description: 'Set a new study goal'
  },
  {
    id: 'start-session',
    label: 'Start Session',
    icon: Clock,
    color: 'bg-green-500 hover:bg-green-600',
    description: 'Begin studying now'
  },
  {
    id: 'schedule',
    label: 'Schedule',
    icon: Calendar,
    color: 'bg-purple-500 hover:bg-purple-600',
    description: 'Plan your week'
  },
  {
    id: 'add-subject',
    label: 'Add Subject',
    icon: BookOpen,
    color: 'bg-orange-500 hover:bg-orange-600',
    description: 'Organize by subject'
  }
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <Button
              key={action.id}
              variant="outline"
              className="w-full justify-start gap-3 h-auto p-3 hover:shadow-sm"
            >
              <div className={`p-2 rounded-lg ${action.color} text-white`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="text-left">
                <p className="font-medium text-sm">{action.label}</p>
                <p className="text-xs text-gray-500">{action.description}</p>
              </div>
            </Button>
          )
        })}
      </CardContent>
    </Card>
  )
}