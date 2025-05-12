
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Server, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { createServer } from "@/lib/pterodactyl-api";

const ServerPurchase = () => {
  const { type, plan } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [serverName, setServerName] = useState("");
  const [location, setLocation] = useState("us-east");
  const [isLoading, setIsLoading] = useState(false);
  
  const getPlanDetails = () => {
    // In a real implementation, this would fetch from an API
    switch (type) {
      case "game":
        switch (plan) {
          case "minecraft-basic":
            return {
              name: "Minecraft Basic",
              price: 5.99,
              specs: {
                cpu: 2,
                ram: 4,
                disk: 20,
                bandwidth: 1
              },
              features: [
                "2 vCPU Cores",
                "4GB RAM",
                "20GB SSD Storage",
                "Unlimited Plugins",
                "24/7 Support",
                "Instant Setup"
              ]
            };
          case "fivem-standard":
            return {
              name: "FiveM Standard",
              price: 15.99,
              specs: {
                cpu: 4,
                ram: 8,
                disk: 60,
                bandwidth: 3
              },
              features: [
                "4 vCPU Cores",
                "8GB RAM",
                "60GB SSD Storage",
                "Up to 64 Players",
                "1 Gbps Network",
                "Instant Setup"
              ]
            };
          // Add more cases for other plans
          default:
            return {
              name: "Game Server",
              price: 9.99,
              specs: {
                cpu: 2,
                ram: 4,
                disk: 30,
                bandwidth: 2
              },
              features: [
                "2+ vCPU Cores",
                "4+ GB RAM",
                "30+ GB SSD Storage",
                "Custom Configuration",
                "24/7 Support"
              ]
            };
        }
      case "vps":
        switch (plan) {
          case "basic":
            return {
              name: "VPS Basic",
              price: 9.99,
              specs: {
                cpu: 2,
                ram: 2,
                disk: 40,
                bandwidth: 2
              },
              features: [
                "2 vCPU Cores",
                "2GB RAM",
                "40GB SSD Storage",
                "Full Root Access",
                "Linux/Windows",
                "24/7 Support"
              ]
            };
          // Add more cases for other plans
          default:
            return {
              name: "VPS Server",
              price: 14.99,
              specs: {
                cpu: 2,
                ram: 4,
                disk: 60,
                bandwidth: 3
              },
              features: [
                "2+ vCPU Cores",
                "4+ GB RAM",
                "60+ GB SSD Storage",
                "Full Root Access",
                "Linux/Windows",
                "24/7 Support"
              ]
            };
        }
      case "web":
        switch (plan) {
          case "starter":
            return {
              name: "Web Starter",
              price: 3.99,
              specs: {
                websites: 1,
                storage: 10,
                bandwidth: "Unmetered",
                emails: 5
              },
              features: [
                "1 Website",
                "10GB SSD Storage",
                "Unmetered Bandwidth",
                "Free SSL Certificate",
                "5 Email Accounts",
                "24/7 Support"
              ]
            };
          // Add more cases for other plans
          default:
            return {
              name: "Web Hosting",
              price: 5.99,
              specs: {
                websites: 1,
                storage: 20,
                bandwidth: "Unmetered",
                emails: 10
              },
              features: [
                "1+ Website",
                "20+ GB SSD Storage",
                "Unmetered Bandwidth",
                "Free SSL Certificate",
                "10+ Email Accounts",
                "24/7 Support"
              ]
            };
        }
      default:
        return {
          name: "Unknown Plan",
          price: 0,
          specs: {
            cpu: 0,
            ram: 0,
            disk: 0,
            bandwidth: 0
          },
          features: []
        };
    }
  };
  
  const planDetails = getPlanDetails();
  
  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Get user ID from localStorage (in a real app, this would come from authentication)
      const userData = localStorage.getItem('ngHostingUser');
      const userId = userData ? JSON.parse(userData).id : 1;
      
      // Get appropriate egg ID based on plan type
      let eggId = 1; // Default to Minecraft
      
      if (type === 'game') {
        if (plan?.includes('minecraft')) {
          eggId = 2; // Paper (Minecraft)
        } else if (plan?.includes('fivem')) {
          eggId = 3; // FiveM
        }
      }
      
      // Create server parameters
      const serverParams = {
        name: serverName,
        user: userId,
        egg: eggId,
        docker_image: "ghcr.io/pterodactyl/yolks:java_17", // Default for Minecraft
        startup: "java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}",
        environment: {
          SERVER_JARFILE: "server.jar",
          MINECRAFT_VERSION: "latest"
        },
        limits: {
          memory: planDetails.specs.ram * 1024, // Convert GB to MB
          swap: 0,
          disk: planDetails.specs.disk * 1024, // Convert GB to MB
          io: 500,
          cpu: planDetails.specs.cpu * 100 // Convert vCores to percentage
        },
        feature_limits: {
          databases: 1,
          backups: 1,
          allocations: 1
        },
        allocation: {
          default: 1
        }
      };
      
      // Call API to create server
      await createServer(serverParams);
      
      // Show success message
      toast({
        title: "Server purchased successfully!",
        description: `Your ${planDetails.name} server "${serverName}" is being deployed. You'll receive an email when it's ready.`,
      });
      
      // Redirect to dashboard after purchase
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating server:", error);
      toast({
        title: "Purchase failed",
        description: "There was an error creating your server. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-muted py-16">
        <div className="container">
          <h1 className="text-4xl font-bold text-center mb-4">Purchase {planDetails.name}</h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Complete your order and get your server up and running in minutes.
          </p>
        </div>
      </div>
      
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Configure Your Server</h2>
            
            <form onSubmit={handlePurchase} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="server-name" className="text-sm font-medium">
                  Server Name
                </label>
                <Input 
                  id="server-name" 
                  placeholder="My Awesome Server" 
                  value={serverName}
                  onChange={(e) => setServerName(e.target.value)}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">
                  Server Location
                </label>
                <Select
                  value={location}
                  onValueChange={(value) => setLocation(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us-east">US East (New York)</SelectItem>
                    <SelectItem value="us-west">US West (Los Angeles)</SelectItem>
                    <SelectItem value="eu-west">EU West (London)</SelectItem>
                    <SelectItem value="eu-central">EU Central (Frankfurt)</SelectItem>
                    <SelectItem value="asia-east">Asia (Singapore)</SelectItem>
                    <SelectItem value="aus-east">Australia (Sydney)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="pt-6 border-t">
                <h3 className="font-semibold mb-4">Payment Details</h3>
                
                <div className="space-y-2">
                  <label htmlFor="card-holder" className="text-sm font-medium">
                    Cardholder Name
                  </label>
                  <Input id="card-holder" placeholder="John Doe" required />
                </div>
                
                <div className="space-y-2 mt-4">
                  <label htmlFor="card-number" className="text-sm font-medium">
                    Card Number
                  </label>
                  <Input id="card-number" placeholder="1234 5678 9012 3456" required />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <label htmlFor="expiry" className="text-sm font-medium">
                      Expiry Date
                    </label>
                    <Input id="expiry" placeholder="MM/YY" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="cvc" className="text-sm font-medium">
                      CVC
                    </label>
                    <Input id="cvc" placeholder="123" required />
                  </div>
                </div>
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Processing..." : `Purchase Now - $${planDetails.price}/month`}
              </Button>
              
              <p className="text-sm text-center text-muted-foreground mt-2">
                By purchasing, you agree to our Terms of Service and Privacy Policy
              </p>
            </form>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5 text-primary" />
                  {planDetails.name}
                </CardTitle>
                <div className="text-lg font-semibold">${planDetails.price}/month</div>
              </CardHeader>
              <CardContent>
                <h3 className="font-medium mb-2">Server Specifications</h3>
                <div className="space-y-2 mb-6">
                  {Object.entries(planDetails.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-muted-foreground">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
                
                <h3 className="font-medium mb-2">Features</h3>
                <div className="space-y-2">
                  {planDetails.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 flex justify-between">
                <span>Total (Monthly)</span>
                <span className="font-bold">${planDetails.price}</span>
              </CardFooter>
            </Card>
            
            <div className="mt-8 bg-muted p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Instant Setup with NextGen Panel</h3>
              <p className="text-muted-foreground mb-4">
                Your server will be automatically created and available immediately 
                after purchase through our NextGen management panel.
              </p>
              <p className="text-sm text-muted-foreground">
                Access details will be sent to your email address.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ServerPurchase;
