
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const VpsServers = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-muted py-16">
        <div className="container">
          <h1 className="text-4xl font-bold text-center mb-4">VPS Hosting</h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Powerful virtual private servers with full root access, dedicated resources, 
            and 99.9% uptime guarantee.
          </p>
        </div>
      </div>
      
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>VPS Basic</CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold">$9.99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>2 vCPU Cores</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>2GB RAM</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>40GB SSD Storage</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>2TB Bandwidth</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Linux/Windows</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Full Root Access</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>24/7 Support</span>
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/purchase/vps/basic" className="w-full">
                <Button className="w-full">Purchase Now</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="border-primary shadow-md">
            <CardHeader>
              <CardTitle>VPS Standard</CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold">$19.99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>4 vCPU Cores</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>4GB RAM</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>80GB SSD Storage</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>4TB Bandwidth</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Linux/Windows</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Full Root Access</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Premium Support</span>
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/purchase/vps/standard" className="w-full">
                <Button className="w-full">Purchase Now</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>VPS Premium</CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold">$29.99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>6 vCPU Cores</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>8GB RAM</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>160GB SSD Storage</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>6TB Bandwidth</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Linux/Windows</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Full Root Access</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Priority Support</span>
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/purchase/vps/premium" className="w-full">
                <Button className="w-full">Purchase Now</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-center">All VPS Plans Include</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Full Root Access</h3>
              <p className="text-muted-foreground text-sm">Complete control over your server environment</p>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-semibold mb-2">99.9% Uptime</h3>
              <p className="text-muted-foreground text-sm">Reliable hosting with minimal downtime</p>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-semibold mb-2">SSD Storage</h3>
              <p className="text-muted-foreground text-sm">Lightning fast solid state drives for better performance</p>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-semibold mb-2">DDoS Protection</h3>
              <p className="text-muted-foreground text-sm">Enterprise-grade protection against attacks</p>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Instant Setup</h3>
              <p className="text-muted-foreground text-sm">Get your server up and running in minutes</p>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Backups</h3>
              <p className="text-muted-foreground text-sm">Regular automated backups to keep your data safe</p>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground text-sm">Technical assistance whenever you need it</p>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Scalability</h3>
              <p className="text-muted-foreground text-sm">Easily upgrade as your needs grow</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default VpsServers;
