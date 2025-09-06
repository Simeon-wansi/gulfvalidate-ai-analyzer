import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast({
        variant: 'destructive',
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
      });
      return;
    }
    
    // Simulate API call
    console.log('Subscribing with email:', email);
    toast({
      title: 'Subscribed!',
      description: "You're now on the list for GCC startup insights.",
    });
    setEmail('');
  };

  return (
    <footer className={cn("bg-gradient-to-r from-primary to-primary-light text-primary-foreground", className)}>
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} GulfValidate. All rights reserved.</p>
          </div>
          <div className="w-full md:w-auto">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-4">
              <label htmlFor="newsletter-email" className="font-semibold whitespace-nowrap">
                Subscribe for GCC startup insights
              </label>
              <div className="flex w-full max-w-sm">
                <Input
                  type="email"
                  id="newsletter-email"
                  placeholder="your.email@example.com"
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 rounded-r-none focus:bg-background focus:text-foreground"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" className="rounded-l-none bg-accent text-accent-foreground hover:bg-accent/90">
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
