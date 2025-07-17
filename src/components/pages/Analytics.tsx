import { useState } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Target, 
  Calendar,
  BookOpen,
  Award,
  Activity,
  PieChart,
  LineChart
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
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

// Mock data for analytics
const studyData = {
  weeklyHours: [
    { day: 'Mon', hours: 3.5, sessions: 2 },
    { day: 'Tue', hours: 2.0, sessions: 1 },
    { day: 'Wed', hours: 4.5, sessions: 3 },
    { day: 'Thu', hours: 3.0, sessions: 2 },
    { day: 'Fri', hours: 2.5, sessions: 2 },
    { day: 'Sat', hours: 5.0, sessions: 3 },
    { day: 'Sun', hours: 1.5, sessions: 1 }
  ],
  subjectDistribution: [
    { subject: 'Computer Science', hours: 12.5, percentage: 35, color: 'bg-blue-500' },
    { subject: 'Mathematics', hours: 8.0, percentage: 22, color: 'bg-green-500' },
    { subject: 'Physics', hours: 6.5, percentage: 18, color: 'bg-red-500' },
    { subject: 'History', hours: 5.0, percentage: 14, color: 'bg-purple-500' },
    { subject: 'Literature', hours: 4.0, percentage: 11, color: 'bg-pink-500' }
  ],
  monthlyProgress: [
    { month: 'Sep', completed: 8, total: 10 },
    { month: 'Oct', completed: 12, total: 15 },
    { month: 'Nov', completed: 15, total: 18 },
    { month: 'Dec', completed: 18, total: 20 },
    { month: 'Jan', completed: 14, total: 22 }
  ],
  productivityTrends: [
    { week: 'Week 1', focus: 85, efficiency: 78, satisfaction: 82 },
    { week: 'Week 2', focus: 78, efficiency: 85, satisfaction: 80 },
    { week: 'Week 3', focus: 92, efficiency: 88, satisfaction: 90 },
    { week: 'Week 4', focus: 88, efficiency: 82, satisfaction: 85 }
  ],
  streakData: {
    current: 7,
    longest: 15,
    thisMonth: 22,
    totalDays: 156
  },
  timeDistribution: {
    morning: 25,
    afternoon: 45,
    evening: 30
  }
}

const achievements = [
  {
    id: '1',
    title: 'Study Streak Master',
    description: '7 days consecutive study streak',
    icon: '🔥',
    earned: true,
    date: '2024-01-20'
  },
  {
    id: '2',
    title: 'Goal Crusher',
    description: 'Completed 10 goals this month',
    icon: '🎯',
    earned: true,
    date: '2024-01-18'
  },
  {
    id: '3',
    title: 'Time Master',
    description: 'Studied for 50+ hours this month',
    icon: '⏰',
    earned: false,
    progress: 78
  },
  {
    id: '4',
    title: 'Subject Explorer',
    description: 'Study 5 different subjects',
    icon: '📚',
    earned: true,
    date: '2024-01-15'
  }
]

export function Analytics() {
  const [timeRange, setTimeRange] = useState('week')
  const [selectedMetric, setSelectedMetric] = useState('hours')

  const totalHours = studyData.weeklyHours.reduce((sum, day) => sum + day.hours, 0)
  const totalSessions = studyData.weeklyHours.reduce((sum, day) => sum + day.sessions, 0)
  const avgSessionLength = totalHours / totalSessions
  const mostProductiveDay = studyData.weeklyHours.reduce((max, day) => 
    day.hours > max.hours ? day : max
  )

  const currentWeekGoals = 22
  const completedGoals = 14
  const goalCompletionRate = Math.round((completedGoals / currentWeekGoals) * 100)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600">Track your study progress and insights</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-primary to-primary/80 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">
              Total Study Time
            </CardTitle>
            <Clock className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHours.toFixed(1)}h</div>
            <p className="text-xs opacity-90">
              +2.5h from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Study Sessions
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSessions}</div>
            <p className="text-xs text-muted-foreground">
              Avg {avgSessionLength.toFixed(1)}h per session
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Goal Completion
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{goalCompletionRate}%</div>
            <p className="text-xs text-muted-foreground">
              {completedGoals} of {currentWeekGoals} goals
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
            <div className="text-2xl font-bold">{studyData.streakData.current} days</div>
            <p className="text-xs opacity-90">
              Best: {studyData.streakData.longest} days
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="productivity">Productivity</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Study Hours Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Weekly Study Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studyData.weeklyHours.map((day) => (
                    <div key={day.day} className="flex items-center gap-4">
                      <div className="w-12 text-sm font-medium">{day.day}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">{day.hours}h</span>
                          <span className="text-xs text-gray-500">{day.sessions} sessions</span>
                        </div>
                        <Progress value={(day.hours / 5) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Most productive day: <span className="font-medium">{mostProductiveDay.day}</span> ({mostProductiveDay.hours}h)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Monthly Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studyData.monthlyProgress.map((month) => {
                    const completionRate = (month.completed / month.total) * 100
                    return (
                      <div key={month.month} className="flex items-center gap-4">
                        <div className="w-12 text-sm font-medium">{month.month}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600">
                              {month.completed}/{month.total} goals
                            </span>
                            <span className="text-xs text-gray-500">
                              {Math.round(completionRate)}%
                            </span>
                          </div>
                          <Progress value={completionRate} className="h-2" />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Time Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Study Time Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{studyData.timeDistribution.morning}%</div>
                  <p className="text-sm text-gray-600">Morning</p>
                  <p className="text-xs text-gray-500">6AM - 12PM</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{studyData.timeDistribution.afternoon}%</div>
                  <p className="text-sm text-gray-600">Afternoon</p>
                  <p className="text-xs text-gray-500">12PM - 6PM</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{studyData.timeDistribution.evening}%</div>
                  <p className="text-sm text-gray-600">Evening</p>
                  <p className="text-xs text-gray-500">6PM - 12AM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Subject Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Subject Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studyData.subjectDistribution.map((subject) => (
                    <div key={subject.subject} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${subject.color}`} />
                          <span className="text-sm font-medium">{subject.subject}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium">{subject.hours}h</span>
                          <span className="text-xs text-gray-500 ml-2">({subject.percentage}%)</span>
                        </div>
                      </div>
                      <Progress value={subject.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Subject Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Subject Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studyData.subjectDistribution.map((subject) => {
                    const performance = Math.floor(Math.random() * 30) + 70 // Mock performance data
                    return (
                      <div key={subject.subject} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${subject.color}`} />
                          <div>
                            <p className="font-medium text-sm">{subject.subject}</p>
                            <p className="text-xs text-gray-500">{subject.hours}h studied</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">{performance}%</div>
                          <Badge 
                            variant="secondary" 
                            className={performance >= 85 ? "bg-green-500 text-white" : 
                                     performance >= 70 ? "bg-yellow-500 text-white" : 
                                     "bg-red-500 text-white"}
                          >
                            {performance >= 85 ? "Excellent" : performance >= 70 ? "Good" : "Needs Work"}
                          </Badge>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="productivity" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Productivity Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  Productivity Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studyData.productivityTrends.map((week) => (
                    <div key={week.week} className="space-y-3">
                      <h4 className="font-medium text-sm">{week.week}</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600">Focus</span>
                          <span className="text-xs font-medium">{week.focus}%</span>
                        </div>
                        <Progress value={week.focus} className="h-1" />
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600">Efficiency</span>
                          <span className="text-xs font-medium">{week.efficiency}%</span>
                        </div>
                        <Progress value={week.efficiency} className="h-1" />
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600">Satisfaction</span>
                          <span className="text-xs font-medium">{week.satisfaction}%</span>
                        </div>
                        <Progress value={week.satisfaction} className="h-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Study Streak Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Study Streak Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">
                      {studyData.streakData.current}
                    </div>
                    <p className="text-sm text-gray-600">Current Streak (Days)</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-xl font-bold">{studyData.streakData.longest}</div>
                      <p className="text-xs text-gray-600">Longest Streak</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-xl font-bold">{studyData.streakData.thisMonth}</div>
                      <p className="text-xs text-gray-600">Days This Month</p>
                    </div>
                  </div>
                  
                  <div className="text-center p-3 bg-primary/10 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{studyData.streakData.totalDays}</div>
                    <p className="text-sm text-gray-600">Total Study Days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className={cn(
                "transition-all",
                achievement.earned ? "bg-green-50 border-green-200" : "bg-gray-50"
              )}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{achievement.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{achievement.description}</p>
                      
                      {achievement.earned ? (
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-500 text-white">
                            Earned
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {new Date(achievement.date!).toLocaleDateString()}
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Progress</span>
                            <span className="text-sm font-medium">{achievement.progress}%</span>
                          </div>
                          <Progress value={achievement.progress} className="h-2" />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}