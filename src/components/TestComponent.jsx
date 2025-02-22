import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Alert, AlertDescription } from './ui/alert'

const TestComponent = () => {
  const [message, setMessage] = useState('')

  const handleDefaultClick = () => {
    setMessage('Default button clicked!')
  }

  const handleDestructiveClick = () => {
    setMessage('Destructive button clicked!')
  }

  const handleOutlineClick = () => {
    setMessage('Outline button clicked!')
  }

  return (
    <Card className="w-96 mx-auto mt-8">
      <CardHeader>
        <CardTitle>Test Component</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Button 
            variant="default" 
            onClick={handleDefaultClick}
            className="w-full"
          >
            Default Button
          </Button>
          
          <Button 
            variant="destructive" 
            onClick={handleDestructiveClick}
            className="w-full"
          >
            Destructive Button
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleOutlineClick}
            className="w-full"
          >
            Outline Button
          </Button>
        </div>

        {message && (
          <Alert>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}

export default TestComponent
