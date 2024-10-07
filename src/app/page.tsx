import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Link className="font-semibold text-3xl text-white" href="/login">
        Mutiara Danatama
      </Link>
    </div>
  );
}
