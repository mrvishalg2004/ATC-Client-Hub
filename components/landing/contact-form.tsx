"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm, FormState } from "@/lib/actions";
import { projectTypes } from "@/lib/types";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Mail, User, Phone, Briefcase, DollarSign, CheckCircle } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full shadow-lg hover:shadow-primary/40 transition-shadow" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Submit Your Request
    </Button>
  );
}

export default function ContactForm() {
  const initialState: FormState = { message: "", status: "error" };
  const [state, formAction] = useFormState(submitContactForm, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [projectTypeValue, setProjectTypeValue] = useState<string>("");

  useEffect(() => {
    if (state.message) {
      if (state.status === 'success') {
        toast({
          title: "Success!",
          description: state.message,
        });
        formRef.current?.reset();
        setProjectTypeValue("");
      } else {
        toast({
          title: "Error",
          description: state.message,
          variant: "destructive",
        });
      }
    }
  }, [state, toast, setProjectTypeValue]);

  const benefits = [
    "Centralize all client data.",
    "Track project milestones effortlessly.",
    "Never miss a deadline again.",
    "Impress clients with your organization.",
  ];


  return (
    <section id="contact-form" className="py-20 md:py-32">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
             <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                Get Started
              </div>
            <h2 className="text-4xl font-bold tracking-tight font-headline">Ready to Transform Your Workflow?</h2>
            <p className="text-muted-foreground text-lg">
              Stop juggling spreadsheets and emails. ATC Client Hub provides one central place to manage everything, so you can focus on delivering great work.
            </p>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-foreground/90">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <Card className="shadow-2xl bg-background/80 backdrop-blur-sm border-primary/20 animate-in fade-in-0 zoom-in-95 duration-500">
            <CardHeader>
              <CardTitle className="text-3xl font-headline text-center">Sign Up Now</CardTitle>
              <CardDescription className="text-center">
                Fill out the form below to get started with ATC Client Hub. It's free!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form ref={formRef} action={formAction} className="space-y-4">
                <div className="relative animate-in fade-in-0 zoom-in-95" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="name" name="name" placeholder="Your Name" required className="pl-10" />
                </div>
                <div className="relative animate-in fade-in-0 zoom-in-95" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="email" name="email" type="email" placeholder="your@email.com" required className="pl-10" />
                </div>
                 <div className="relative animate-in fade-in-0 zoom-in-95" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="phone" name="phone" placeholder="Your Phone Number" required className="pl-10"/>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in-0 zoom-in-95" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
                   <div className="relative">
                     <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                    <Select
                      value={projectTypeValue}
                      onValueChange={setProjectTypeValue}
                    >
                      <SelectTrigger id="projectType" className="pl-10">
                        <SelectValue placeholder="Project Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {projectTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <input type="hidden" name="projectType" value={projectTypeValue} required />
                  </div>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="budget" name="budget" type="number" placeholder="Budget ($)" required className="pl-10"/>
                  </div>
                </div>
                <div className="animate-in fade-in-0 zoom-in-95" style={{ animationDelay: '500ms', animationFillMode: 'both' }}>
                  <SubmitButton />
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
