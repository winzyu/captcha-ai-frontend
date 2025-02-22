import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { CheckCircle, XCircle } from 'lucide-react';

const CaptchaHistory = ({ attempts, onAttemptClick }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-center">Attempt History</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 p-4">
        <div className="h-full overflow-y-auto pr-2">
          <div className="space-y-2">
            {attempts.map((attempt, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 border rounded-lg bg-background hover:bg-accent cursor-pointer transition-colors"
                onClick={() => onAttemptClick(attempt)}
              >
                <img
                  src={`http://localhost:5000${attempt.imagePath}`}
                  alt={`CAPTCHA attempt ${index + 1}`}
                  className="h-8 border rounded"
                />
                <div className="flex-1">
                  <p className="font-medium text-sm">Guess: {attempt.userInput}</p>
                  <p className="text-xs text-muted-foreground">
                    Actual: {attempt.actualText}
                  </p>
                </div>
                {attempt.correct ? (
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                )}
              </div>
            ))}
            {attempts.length === 0 && (
              <p className="text-center text-muted-foreground text-sm py-4">
                No attempts yet
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CaptchaHistory;
