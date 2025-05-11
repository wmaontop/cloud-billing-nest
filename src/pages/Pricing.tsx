
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PricingTable from "@/components/PricingTable";
import { Plan } from "@/lib/types";

const Pricing = () => {
  const gameServerPlans: Plan[] = [
    {
      id: "minecraft-basic",
      name: "Minecraft Basic",
      price: 5.99,
      cycle: "monthly",
      cpu: 2,
      ram: 4,
      disk: 20,
      bandwidth: 1,
      features: [
        "2 vCPU Cores",
        "4GB RAM",
        "20GB SSD Storage",
        "Unlimited Plugins",
        "24/7 Support",
        "Instant Setup",
      ],
    },
    {
      id: "minecraft-premium",
      name: "Minecraft Premium",
      price: 10.99,
      cycle: "monthly",
      cpu: 4,
      ram: 8,
      disk: 50,
      bandwidth: 2,
      features: [
        "4 vCPU Cores",
        "8GB RAM",
        "50GB SSD Storage",
        "DDoS Protection",
        "Premium Support",
        "Instant Setup",
      ],
    },
    {
      id: "fivem-standard",
      name: "FiveM Standard",
      price: 15.99,
      cycle: "monthly",
      cpu: 4,
      ram: 8,
      disk: 60,
      bandwidth: 3,
      features: [
        "4 vCPU Cores",
        "8GB RAM",
        "60GB SSD Storage",
        "Up to 64 Players",
        "1 Gbps Network",
        "Instant Setup",
      ],
    }
  ];

  const vpsPlans: Plan[] = [
    {
      id: "vps-basic",
      name: "VPS Basic",
      price: 9.99,
      cycle: "monthly",
      cpu: 2,
      ram: 2,
      disk: 40,
      bandwidth: 2,
      features: [
        "2 vCPU Cores",
        "2GB RAM",
        "40GB SSD Storage",
        "Full Root Access",
        "Linux/Windows",
        "24/7 Support",
      ],
    },
    {
      id: "vps-standard",
      name: "VPS Standard",
      price: 19.99,
      cycle: "monthly",
      cpu: 4,
      ram: 4,
      disk: 80,
      bandwidth: 4,
      features: [
        "4 vCPU Cores",
        "4GB RAM",
        "80GB SSD Storage",
        "Full Root Access",
        "Linux/Windows",
        "Premium Support",
      ],
    },
    {
      id: "vps-premium",
      name: "VPS Premium",
      price: 29.99,
      cycle: "monthly",
      cpu: 6,
      ram: 8,
      disk: 160,
      bandwidth: 6,
      features: [
        "6 vCPU Cores",
        "8GB RAM",
        "160GB SSD Storage",
        "Full Root Access",
        "Linux/Windows",
        "Priority Support",
      ],
    }
  ];

  const webPlans: Plan[] = [
    {
      id: "web-starter",
      name: "Web Starter",
      price: 3.99,
      cycle: "monthly",
      cpu: 1,
      ram: 1,
      disk: 10,
      bandwidth: 1,
      features: [
        "1 Website",
        "10GB SSD Storage",
        "Unmetered Bandwidth",
        "Free SSL Certificate",
        "99.9% Uptime",
        "24/7 Support",
      ],
    },
    {
      id: "web-plus",
      name: "Web Plus",
      price: 6.99,
      cycle: "monthly",
      cpu: 2,
      ram: 2,
      disk: 25,
      bandwidth: 2,
      features: [
        "Unlimited Websites",
        "25GB SSD Storage",
        "Unmetered Bandwidth",
        "Free SSL Certificate",
        "99.9% Uptime",
        "Priority Support",
      ],
    },
    {
      id: "web-pro",
      name: "Web Pro",
      price: 12.99,
      cycle: "monthly",
      cpu: 3,
      ram: 4,
      disk: 50,
      bandwidth: 3,
      features: [
        "Unlimited Websites",
        "50GB SSD Storage",
        "Unmetered Bandwidth",
        "Free SSL Certificate",
        "99.9% Uptime",
        "WordPress Optimized",
      ],
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-muted py-16">
        <div className="container">
          <h1 className="text-4xl font-bold text-center mb-4">Pricing Plans</h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include 24/7 support, 
            99.9% uptime guarantee, and instant setup through our Pterodactyl panel.
          </p>
        </div>
      </div>
      
      <div className="container py-12">
        <Tabs defaultValue="game" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3 w-[400px]">
              <TabsTrigger value="game">Game Servers</TabsTrigger>
              <TabsTrigger value="vps">VPS</TabsTrigger>
              <TabsTrigger value="web">Web Hosting</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="game" className="mt-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold">Game Server Hosting</h2>
              <p className="text-muted-foreground mt-2">
                Powerful and reliable game servers with easy management through our Pterodactyl panel
              </p>
            </div>
            <PricingTable plans={gameServerPlans} />
            
            <div className="mt-12 bg-muted p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Additional Game Server Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <Link to="/purchase/game/minecraft" className="block bg-background p-6 rounded-lg text-center hover:shadow-md transition-all">
                  <h4 className="font-medium mb-2">Minecraft</h4>
                  <p className="text-sm text-muted-foreground mb-4">Starting at $5.99/mo</p>
                </Link>
                <Link to="/purchase/game/fivem" className="block bg-background p-6 rounded-lg text-center hover:shadow-md transition-all">
                  <h4 className="font-medium mb-2">FiveM</h4>
                  <p className="text-sm text-muted-foreground mb-4">Starting at $15.99/mo</p>
                </Link>
                <Link to="/purchase/game/rust" className="block bg-background p-6 rounded-lg text-center hover:shadow-md transition-all">
                  <h4 className="font-medium mb-2">Rust</h4>
                  <p className="text-sm text-muted-foreground mb-4">Starting at $14.99/mo</p>
                </Link>
                <Link to="/purchase/game/ark" className="block bg-background p-6 rounded-lg text-center hover:shadow-md transition-all">
                  <h4 className="font-medium mb-2">ARK</h4>
                  <p className="text-sm text-muted-foreground mb-4">Starting at $12.99/mo</p>
                </Link>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="vps" className="mt-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold">Virtual Private Servers</h2>
              <p className="text-muted-foreground mt-2">
                Dedicated resources with full control and root access
              </p>
            </div>
            <PricingTable plans={vpsPlans} />
          </TabsContent>
          
          <TabsContent value="web" className="mt-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold">Web Hosting</h2>
              <p className="text-muted-foreground mt-2">
                Fast and reliable hosting for your websites with 99.9% uptime guarantee
              </p>
            </div>
            <PricingTable plans={webPlans} />
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Pricing;
