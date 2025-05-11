
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const WebHosting = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-muted py-16">
        <div className="container">
          <h1 className="text-4xl font-bold text-center mb-4">Web Hosting</h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Fast and reliable web hosting with 99.9% uptime guarantee and free SSL certificates.
          </p>
        </div>
      </div>
      
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Web Starter</CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold">$3.99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>1 Website</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>10GB SSD Storage</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Unmetered Bandwidth</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Free SSL Certificate</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>5 Email Accounts</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>24/7 Support</span>
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/purchase/web/starter" className="w-full">
                <Button className="w-full">Purchase Now</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="border-primary shadow-md">
            <CardHeader>
              <CardTitle>Web Plus</CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold">$6.99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Unlimited Websites</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>25GB SSD Storage</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Unmetered Bandwidth</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Free SSL Certificate</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Unlimited Email Accounts</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Premium Support</span>
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/purchase/web/plus" className="w-full">
                <Button className="w-full">Purchase Now</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Web Pro</CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold">$12.99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Unlimited Websites</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>50GB SSD Storage</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Unmetered Bandwidth</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Free SSL Certificate</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Unlimited Email Accounts</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>WordPress Optimized</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Priority Support</span>
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/purchase/web/pro" className="w-full">
                <Button className="w-full">Purchase Now</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-center">All Web Hosting Plans Include</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-semibold mb-2">cPanel Control Panel</h3>
              <p className="text-muted-foreground text-sm">Easy-to-use control panel for website management</p>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Free SSL Certificate</h3>
              <p className="text-muted-foreground text-sm">Secure your website and boost SEO rankings</p>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-semibold mb-2">99.9% Uptime</h3>
              <p className="text-muted-foreground text-sm">Reliable hosting with minimal downtime</p>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Daily Backups</h3>
              <p className="text-muted-foreground text-sm">Automatic backups to keep your data safe</p>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-semibold mb-2">One-Click Installs</h3>
              <p className="text-muted-foreground text-sm">Easily install WordPress, Joomla, and more</p>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-semibold mb-2">SSD Storage</h3>
              <p className="text-muted-foreground text-sm">Lightning fast solid state drives for better performance</p>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground text-sm">Technical assistance whenever you need it</p>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Email Accounts</h3>
              <p className="text-muted-foreground text-sm">Professional email addresses with your domain</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default WebHosting;
