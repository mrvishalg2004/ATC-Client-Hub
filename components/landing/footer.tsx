import Link from 'next/link';
import { Logo } from '../logo';

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col md:flex-row items-center justify-between py-6 gap-4 text-center md:text-left">
        <div className="flex items-center gap-2">
          <Logo />
          <p className="text-sm font-semibold">ATC Client Hub</p>
        </div>
        <p className="text-sm text-muted-foreground md:order-first">
          © {new Date().getFullYear()} ATC Client Hub. All rights reserved.
        </p>
        <nav className="flex gap-4">
          <Link href="#" className="text-sm hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-sm hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
