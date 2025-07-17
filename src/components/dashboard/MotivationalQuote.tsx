import { useState, useEffect } from 'react'
import { Quote, RefreshCw } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const quotes = [
  {
    text: "The expert in anything was once a beginner.",
    author: "Helen Hayes"
  },
  {
    text: "Success is the sum of small efforts repeated day in and day out.",
    author: "Robert Collier"
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela"
  },
  {
    text: "The beautiful thing about learning is that no one can take it away from you.",
    author: "B.B. King"
  },
  {
    text: "Study hard what interests you the most in the most undisciplined, irreverent and original manner possible.",
    author: "Richard Feynman"
  }
]

export function MotivationalQuote() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0])
  const [isRefreshing, setIsRefreshing] = useState(false)

  const getRandomQuote = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length)
      setCurrentQuote(quotes[randomIndex])
      setIsRefreshing(false)
    }, 500)
  }

  useEffect(() => {
    // Set a random quote on component mount
    getRandomQuote()
  }, [])

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Quote className="h-4 w-4 text-purple-600" />
          Daily Inspiration
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={getRandomQuote}
          disabled={isRefreshing}
          className="h-8 w-8 text-purple-600 hover:bg-purple-100"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent>
        <blockquote className="text-sm text-gray-700 italic leading-relaxed mb-3">
          "{currentQuote.text}"
        </blockquote>
        <cite className="text-xs font-medium text-purple-600">
          — {currentQuote.author}
        </cite>
      </CardContent>
    </Card>
  )
}