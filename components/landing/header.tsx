import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Logo />
          <span className="font-bold">ATC Client Hub</span>
        </Link>
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/dashboard">Dashboard Login</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
