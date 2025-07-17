import { Settings as SettingsIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Settings() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <SettingsIcon className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Customize your study planner</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Application Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-gray-500">
            <div className="text-center">
              <SettingsIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Settings panel coming soon!</p>
              <p className="text-sm mt-2">Configure notifications, preferences, and account settings.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}