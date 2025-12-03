import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UserPlus, ListChecks, Filter, Briefcase } from 'lucide-react';

const features = [
  {
    icon: <UserPlus className="h-10 w-10 text-primary" />,
    title: 'Client Onboarding',
    description: 'Easily add new clients and store all their essential information in one secure, centralized location.',
  },
  {
    icon: <ListChecks className="h-10 w-10 text-primary" />,
    title: 'Project Tracking',
    description: 'Monitor project progress with customizable statuses. Know exactly where each project stands at a glance.',
  },
  {
    icon: <Filter className="h-10 w-10 text-primary" />,
    title: 'Smart Filtering',
    description: 'Instantly find clients by project type or status. Spend less time searching and more time doing.',
  },
  {
    icon: <Briefcase className="h-10 w-10 text-primary" />,
    title: 'Lightweight CRM',
    description: 'Manage client relationships without the complexity of traditional CRMs. Simple, intuitive, and powerful.',
  },
];

export default function Features() {
  return (
    <section className="py-20 md:py-32 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            Everything You Need, Nothing You Don&apos;t
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            ATC Client Hub provides the essential tools to streamline your workflow and enhance client management.
          </p>
        </div>
        <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-background/50 backdrop-blur-sm border border-primary/10 shadow-lg hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-300">
              <CardHeader className="flex flex-col items-center text-center gap-4">
                {feature.icon}
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
