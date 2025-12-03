import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-dashboard');

  return (
    <section className="w-full py-20 md:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-1 lg:gap-12 xl:gap-16">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-6">
              <div className="relative inline-flex flex-col items-center">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary/80">
                  Client Success Platform
                </span>
                <div className="relative mt-3">
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 blur-3xl bg-gradient-to-r from-primary/40 via-accent/40 to-primary/40 opacity-70 animate-pulse"
                  />
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl xl:text-7xl/none font-headline text-balance">
                    <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-accent">
                      Effortless Client Management
                    </span>
                    <span className="block text-foreground/90">
                      is Finally Here
                    </span>
                  </h1>
                </div>
              </div>
              <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
                Organize, track, and manage your client projects with ATC Client Hub. A simple, yet powerful tool designed for freelancers and agencies.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="shadow-lg hover:shadow-primary/50 transition-shadow">
                <Link href="#contact-form">Get Started for Free</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          </div>
          <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-xl shadow-2xl group">
            {heroImage && (
              <Image
                alt="ATC Client Manager Dashboard"
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                src={heroImage.imageUrl}
                data-ai-hint={heroImage.imageHint}
                width={1200}
                height={675}
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
