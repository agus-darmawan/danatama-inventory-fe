import AuthRedirect from './_auth_redirect';
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthRedirect />
      <main className="flex flex-col min-h-screen w-full overflow-y-auto ">
        <div className="h-[30vh] flex items-center justify-center bg-neutral-900">
          <h1 className="text-2xl font-medium text-white">Mutiara Danatama</h1>
        </div>
        <div className="min-h-[70vh] bg-white rounded-t-3xl py-2 px-2 relative">
          {children}
          <div className="w-full mx-auto  absolute bottom-6">
            <h3 className="text-sm text-center ">CV Mutiara Danatama</h3>
          </div>
        </div>
      </main>
    </>
  );
}
