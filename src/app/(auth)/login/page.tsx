'use client';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAuth } from '@/hooks/use-auth';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { ILogin } from '@/types/auth';

export default function LoginPage() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ILogin>({
    defaultValues: {
      emailOrUsername: '',
      password: '',
    },
  });

  const handleForm: SubmitHandler<ILogin> = async (data) => {
    try {
      await login(data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-full ">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Login</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(handleForm)}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="emailOrUsername">Email atau Username</Label>
            <Input
              id="emailOrUsername"
              type="text"
              placeholder="contoh@gmail.com"
              {...register('emailOrUsername', { required: true })}
            />
          </div>
          <div className="grid gap-2 relative">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                placeholder="•••••••••••••••"
                type={showPassword ? 'text' : 'password'}
                {...register('password', { required: true })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 justify-between items-start">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full"
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 animate-spin" />
            ) : (
              'Login'
            )}
          </Button>
          <Link
            className="text-right text-sm text-blue-500 hover:underline hover:text-blue-300 ml-auto"
            href="/forgotpassword"
          >
            Lupa password ?
          </Link>
          <div className="flex text-center text-sm gap-2">
            <h3>Belum punya akun </h3>
            <Link
              className="text-blue-500 hover:underline hover:text-blue-300"
              href="/signup"
            >
              Buat akun
            </Link>
          </div>
        </CardFooter>
      </form>
    </div>
  );
}
