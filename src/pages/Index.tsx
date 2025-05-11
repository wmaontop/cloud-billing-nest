
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Server, CreditCard, Database, Link as LinkIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import PricingTable from "@/components/PricingTable";
import { Plan } from "@/lib/types";

const Index = () => {
  const plans: Plan[] = [
    {
      id: "starter",
      name: "Starter",
      price: 5.99,
      cycle: "monthly",
      cpu: 1,
      ram: 2,
      disk: 20,
      bandwidth: 1,
      features: [
        "Minecraft Server",
        "24/7 Support",
        "99.9% Uptime",
        "Automated Backups"
      ],
    },
    {
      id: "standard",
      name: "Standard",
      price: 12.99,
      cycle: "monthly",
      cpu: 2,
      ram: 4,
      disk: 50,
      bandwidth: 2,
      features: [
        "All Starter Features",
        "Multiple Game Servers",
        "DDoS Protection",
        "Modpack Installation",
        "Priority Support"
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: 24.99,
      cycle: "monthly",
      cpu: 4,
      ram: 8,
      disk: 100,
      bandwidth: 5,
      features: [
        "All Standard Features",
        "Dedicated Resources",
        "Custom Domain",
        "Database Access",
        "API Access",
        "24/7 Phone Support"
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-gradient py-20 md:py-32">
        <div className="container flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Game & Web Hosting <br />
            Powered by Pterodactyl
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl">
            Fast, reliable, and secure hosting services with easy server management
            through the powerful Pterodactyl Panel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/pricing">
              <Button size="lg" className="text-lg px-8">
                View Plans
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="text-lg px-8 bg-white/10 text-white border-white/20 hover:bg-white/20">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer a wide range of hosting services to meet all your needs,
              from game servers to web hosting and VPS solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard
              title="Game Servers"
              description="Deploy your game server in seconds with our optimized game hosting platform. Support for Minecraft, FiveM, Rust, ARK and more."
              icon={<Server />}
              href="/game-servers"
            />
            <ServiceCard
              title="Web Hosting"
              description="Fast and reliable web hosting for your websites and applications with 99.9% uptime guarantee."
              icon={<LinkIcon />}
              href="/web-hosting"
            />
            <ServiceCard
              title="VPS Hosting"
              description="Powerful virtual private servers with full root access and dedicated resources for your projects."
              icon={<Database />}
              href="/vps"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-muted py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose NextGen Hosting</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide the best hosting experience with powerful features and
              excellent customer support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="feature-icon mb-4">
                <Server className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-2">Pterodactyl Panel</h3>
              <p className="text-muted-foreground">
                Manage your servers with ease using the intuitive Pterodactyl control panel.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="feature-icon mb-4">
                <Database className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-2">NVMe SSD Storage</h3>
              <p className="text-muted-foreground">
                Ultra-fast storage for quicker load times and better performance.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="feature-icon mb-4">
                <CreditCard className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-2">Simple Billing</h3>
              <p className="text-muted-foreground">
                Transparent pricing with no hidden fees and flexible payment options.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="feature-icon mb-4">
                <LinkIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-2">Global Network</h3>
              <p className="text-muted-foreground">
                Servers in multiple locations worldwide for low-latency connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that works best for you. All plans come with the
              Pterodactyl Panel and 24/7 support.
            </p>
          </div>

          <PricingTable plans={plans} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-accent py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and experience the best
            hosting service backed by our 30-day money-back guarantee.
          </p>
          <Link to="/register">
            <Button size="lg" className="text-lg px-8 bg-white text-accent hover:bg-white/90">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
