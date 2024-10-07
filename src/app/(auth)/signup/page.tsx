'use client';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAuth } from '@/hooks/use-auth';

import { Button } from '@/components/ui/button';
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { IRegister } from '@/types/auth';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: signup } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<IRegister>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  });

  const handleForm: SubmitHandler<IRegister> = async (data) => {
    try {
      await signup(data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-full w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Signup</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(handleForm)}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              placeholder="username"
              {...register('username')}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="contoh@gmail.com"
              {...register('email')}
            />
          </div>
          <div className="grid gap-2 relative">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                placeholder="•••••••••••••••"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2  text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </Button>
            </div>
          </div>
          <div className="grid gap-2 relative">
            <Label htmlFor="password_confirmation">Confirm Password</Label>
            <div className="relative">
              <Input
                id="password_confirmation"
                placeholder="•••••••••••••••"
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('password_confirmation')}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2  text-gray-500"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3 mb-10 items-start">
          <Button
            className="w-full rounded-full"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Signup'
            )}
          </Button>
          <div className="flex text-center text-sm gap-2">
            <h3>Sudah punya akun </h3>
            <Link
              className="text-blue-500 hover:underline hover:text-blue-300"
              href="/login"
            >
              Login
            </Link>
          </div>
        </CardFooter>
      </form>
    </div>
  );
}
