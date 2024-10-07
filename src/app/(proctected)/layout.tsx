import NoAuthRedirect from './_no_auth_redirect';

export default function NoAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NoAuthRedirect />
      {children}
    </div>
  );
}
