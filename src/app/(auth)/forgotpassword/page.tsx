'use client';

import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';

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

import { IForgotPassword } from '@/types/auth';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { forgotPassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<IForgotPassword>({
    defaultValues: {
      email: '',
    },
  });

  const handleForm: SubmitHandler<IForgotPassword> = async (data) => {
    try {
      await forgotPassword(data);
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Password Reset</CardTitle>
        <CardDescription>
          Masukan email anda untuk mereset password
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(handleForm)}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="m@example.com"
              {...register('email', { required: true })}
            />
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
          <div className="flex text-center text-sm gap-2">
            <h3>Kembali ke </h3>
            <Link
              className="text-blue-500 hover:underline hover:text-blue-300"
              href="/login"
            >
              login
            </Link>
          </div>
        </CardFooter>
      </form>
    </div>
  );
}
