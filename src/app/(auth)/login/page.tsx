'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { env } from '@/lib/env';
import axios from 'axios';
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

export default function LoginPage() {
  const { toast } = useToast();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onLogin = async () => {
    try {
      setLoading(true);
      await axios.post(env.NEXT_PUBLIC_API_URL + '/auth/login', user);
      toast({
        variant: 'default',
        title: 'Login Berhasil',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Login Gagal',
        description: 'Username atau password yang anda masukkan salah',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-wrap flex-col items-center justify-center">
      <Card className="w-[300px] sm:w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <Link
              className="text-right text-xs text-slate-500 hover:underline hover:text-slate-300"
              href="/forgotpassword"
            >
              Forgot Password
            </Link>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            disabled={
              user.email.length > 0 && user.password.length > 0 ? false : true
            }
            onClick={onLogin}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Login'
            )}
          </Button>
          <Link href="/signup">
            <Button variant="outline">Signup</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
