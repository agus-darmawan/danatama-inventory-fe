'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronRight, ShoppingCart } from 'lucide-react';
import { useEffect } from 'react';

export default function Page() {
  const { loggedIn, logout, user, fetchUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  const menuItems = [
    {
      id: 1,
      name: 'Pembelian',
      orders: 0,
      icon: <ShoppingCart size={30} />,
      link: '/pembelian',
    },
    {
      id: 2,
      name: 'Pesanan',
      orders: 3,
      icon: <ShoppingCart size={30} />,
      link: '/pesanan',
    },
    {
      id: 3,
      name: 'Favorit',
      orders: 5,
      icon: <ShoppingCart size={30} />,
      link: '/favorit',
    },
  ];

  return (
    <main className="flex flex-col min-h-screen w-full overflow-y-auto">
      <div className="h-[20vh] flex justify-start bg-neutral-900">
        {loggedIn && (
          <div className="mt-10 text-center">
            <Button
              type="button"
              variant="link"
              className="text-white"
              onClick={handleLogout}
            >
              {'< Logout'}
            </Button>
          </div>
        )}
      </div>
      <div className="min-h-[80vh] bg-white rounded-t-3xl py-5 px-5 relative">
        <div className="absolute h-28 w-28 rounded-full bg-slate-500 left-1/2 transform -translate-x-1/2 -top-14"></div>
        <h2 className="pt-10 font-medium text-lg mx-auto text-center">
          {user?.username}
        </h2>
        <div className="gap-3 mt-5 flex flex-col">
          {menuItems.map((item) => (
            <Link key={item.id} href={item.link}>
              <Card className="flex justify-between items-center px-3 py-2 cursor-pointer">
                <div className="flex items-center gap-3">
                  {item.icon}
                  <div className="">
                    <h2>{item.name}</h2>
                    <p className="text-sm text-slate-500">
                      {item.orders} Orders
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <ChevronRight size={30} />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
