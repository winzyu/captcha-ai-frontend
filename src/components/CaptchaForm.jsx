import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import CaptchaHistory from './CaptchaHistory';

const CaptchaForm = () => {
  const [captchaData, setCaptchaData] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState([]);

  const fetchNewCaptcha = async () => {
    try {
      setLoading(true);
      setStatus({ type: null, message: '' });
      
      const response = await fetch('http://localhost:5000/api/captcha/random');
      const data = await response.json();
      
      if (data.success) {
        setCaptchaData(data);
      } else {
        setStatus({
          type: 'error',
          message: 'Failed to load CAPTCHA. Please try again.'
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Error connecting to server. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const loadPreviousCaptcha = (attempt) => {
    setCaptchaData({
      imagePath: attempt.imagePath,
      prediction: attempt.actualText
    });
    setUserInput(attempt.userInput);
    setStatus({ type: null, message: '' });
  };

  const verifyCaptcha = async () => {
    if (!userInput.trim()) {
      setStatus({
        type: 'error',
        message: 'Please enter the CAPTCHA text'
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/captcha/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: userInput,
          imageFile: captchaData.imagePath
        }),
      });

      const data = await response.json();
      
      // Record the attempt
      setAttempts(prev => [{
        imagePath: captchaData.imagePath,
        userInput: userInput,
        actualText: data.actualText,
        correct: data.correct,
        timestamp: new Date()
      }, ...prev]);

      setStatus({
        type: data.correct ? 'success' : 'error',
        message: data.correct ? 
          'CAPTCHA verified successfully!' : 
          'Incorrect CAPTCHA text. Please try again.'
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Error verifying CAPTCHA. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewCaptcha();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      <Card className="h-[500px]">
        <CardHeader>
          <CardTitle className="text-center">Verify CAPTCHA</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4">
          {captchaData && (
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center gap-2">
                <img
                  src={`http://localhost:5000${captchaData.imagePath}`}
                  alt="CAPTCHA"
                  className="border rounded-lg"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={fetchNewCaptcha}
                  disabled={loading}
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                </Button>
              </div>
              
              <div className="w-full space-y-2">
                <Input
                  type="text"
                  placeholder="Enter CAPTCHA text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="text-center"
                  disabled={loading}
                />
                
                <Button
                  className="w-full"
                  onClick={verifyCaptcha}
                  disabled={loading || !userInput.trim()}
                >
                  Verify
                </Button>
              </div>
            </div>
          )}

          {status.message && (
            <Alert variant={status.type === 'error' ? 'destructive' : 'default'}>
              <AlertDescription className="flex items-center justify-center gap-2">
                {status.type === 'success' ? (
                  <CheckCircle className="h-4 w-4" />
                ) : status.type === 'error' ? (
                  <XCircle className="h-4 w-4" />
                ) : null}
                {status.message}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <div className="h-[500px]">
        <CaptchaHistory attempts={attempts} onAttemptClick={loadPreviousCaptcha} />
      </div>
    </div>
  );
};

export default CaptchaForm;
