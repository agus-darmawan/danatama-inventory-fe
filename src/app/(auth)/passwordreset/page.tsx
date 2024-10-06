'use client';

import { useState } from 'react';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

export default function PasswordResetPage() {
  const { toast } = useToast(); // Using custom toast
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const verifyEmail = async () => {
    try {
      setLoading(true);
      await axios.post('/api/users/forgotpassword', { email });
      toast({
        variant: 'default',
        title: 'User Found',
        description:
          'Please check your inbox and click on the verification link.',
        duration: 10000, // 10 seconds
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Something went wrong, please try again.',
      });
    } finally {
      setLoading(false);
      setEmail('');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-4 min-h-screen">
      <Card className="w-[300px] sm:w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Password Reset</CardTitle>
          <CardDescription>
            Enter your email to reset the password
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button disabled={email.length === 0} onClick={verifyEmail}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Submit'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
