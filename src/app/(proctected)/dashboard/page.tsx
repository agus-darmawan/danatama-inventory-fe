'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/hooks/use-auth';

import { Button } from '@/components/ui/button';

export default function Page() {
  const { loggedIn, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="container">
      <div className="text-center">
        <Link href="/login">Login</Link>
      </div>

      {loggedIn && (
        <div className="mt-10 text-center">
          <Button type="button" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      )}

      <div className="mt-10 text-center">Dashboard here</div>
    </div>
  );
}
