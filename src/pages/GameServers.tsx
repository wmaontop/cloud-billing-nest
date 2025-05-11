
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const GameServers = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-muted py-16">
        <div className="container">
          <h1 className="text-4xl font-bold text-center mb-4">Game Server Hosting</h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Powerful and reliable game server hosting with instant setup and easy management
            through our Pterodactyl panel.
          </p>
        </div>
      </div>
      
      <div className="container py-12">
        <Tabs defaultValue="minecraft" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="minecraft">Minecraft</TabsTrigger>
              <TabsTrigger value="fivem">FiveM</TabsTrigger>
              <TabsTrigger value="rust">Rust</TabsTrigger>
              <TabsTrigger value="ark">ARK</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="minecraft" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Minecraft Basic</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">$5.99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>2 vCPU Cores</li>
                    <li>4GB RAM</li>
                    <li>20GB SSD Storage</li>
                    <li>Unlimited Plugins</li>
                    <li>24/7 Support</li>
                    <li>Instant Setup</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/purchase/game/minecraft-basic" className="w-full">
                    <Button className="w-full">Purchase Now</Button>
                  </Link>
                </CardFooter>
              </Card>
              
              <Card className="border-primary">
                <CardHeader>
                  <CardTitle>Minecraft Standard</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">$10.99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>4 vCPU Cores</li>
                    <li>8GB RAM</li>
                    <li>50GB SSD Storage</li>
                    <li>Unlimited Plugins</li>
                    <li>Premium Support</li>
                    <li>Instant Setup</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/purchase/game/minecraft-standard" className="w-full">
                    <Button className="w-full">Purchase Now</Button>
                  </Link>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Minecraft Premium</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">$15.99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>6 vCPU Cores</li>
                    <li>12GB RAM</li>
                    <li>100GB SSD Storage</li>
                    <li>Unlimited Plugins</li>
                    <li>Priority Support</li>
                    <li>Instant Setup</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/purchase/game/minecraft-premium" className="w-full">
                    <Button className="w-full">Purchase Now</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="fivem" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>FiveM Starter</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">$15.99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>4 vCPU Cores</li>
                    <li>8GB RAM</li>
                    <li>60GB SSD Storage</li>
                    <li>Up to 64 Players</li>
                    <li>24/7 Support</li>
                    <li>Instant Setup</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/purchase/game/fivem-starter" className="w-full">
                    <Button className="w-full">Purchase Now</Button>
                  </Link>
                </CardFooter>
              </Card>
              
              <Card className="border-primary">
                <CardHeader>
                  <CardTitle>FiveM Standard</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">$24.99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>6 vCPU Cores</li>
                    <li>12GB RAM</li>
                    <li>100GB SSD Storage</li>
                    <li>Up to 128 Players</li>
                    <li>Premium Support</li>
                    <li>Instant Setup</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/purchase/game/fivem-standard" className="w-full">
                    <Button className="w-full">Purchase Now</Button>
                  </Link>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>FiveM Premium</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">$34.99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>8 vCPU Cores</li>
                    <li>16GB RAM</li>
                    <li>150GB SSD Storage</li>
                    <li>Up to 256 Players</li>
                    <li>Priority Support</li>
                    <li>Instant Setup</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/purchase/game/fivem-premium" className="w-full">
                    <Button className="w-full">Purchase Now</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="rust" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Rust Starter</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">$14.99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>4 vCPU Cores</li>
                    <li>8GB RAM</li>
                    <li>60GB SSD Storage</li>
                    <li>Up to 50 Players</li>
                    <li>24/7 Support</li>
                    <li>Instant Setup</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/purchase/game/rust-starter" className="w-full">
                    <Button className="w-full">Purchase Now</Button>
                  </Link>
                </CardFooter>
              </Card>
              
              <Card className="border-primary">
                <CardHeader>
                  <CardTitle>Rust Standard</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">$24.99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>6 vCPU Cores</li>
                    <li>12GB RAM</li>
                    <li>100GB SSD Storage</li>
                    <li>Up to 100 Players</li>
                    <li>Premium Support</li>
                    <li>Instant Setup</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/purchase/game/rust-standard" className="w-full">
                    <Button className="w-full">Purchase Now</Button>
                  </Link>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Rust Premium</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">$34.99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>8 vCPU Cores</li>
                    <li>16GB RAM</li>
                    <li>150GB SSD Storage</li>
                    <li>Up to 200 Players</li>
                    <li>Priority Support</li>
                    <li>Instant Setup</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/purchase/game/rust-premium" className="w-full">
                    <Button className="w-full">Purchase Now</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="ark" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>ARK Starter</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">$12.99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>4 vCPU Cores</li>
                    <li>8GB RAM</li>
                    <li>80GB SSD Storage</li>
                    <li>Up to 20 Players</li>
                    <li>24/7 Support</li>
                    <li>Instant Setup</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/purchase/game/ark-starter" className="w-full">
                    <Button className="w-full">Purchase Now</Button>
                  </Link>
                </CardFooter>
              </Card>
              
              <Card className="border-primary">
                <CardHeader>
                  <CardTitle>ARK Standard</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">$19.99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>6 vCPU Cores</li>
                    <li>12GB RAM</li>
                    <li>120GB SSD Storage</li>
                    <li>Up to 40 Players</li>
                    <li>Premium Support</li>
                    <li>Instant Setup</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/purchase/game/ark-standard" className="w-full">
                    <Button className="w-full">Purchase Now</Button>
                  </Link>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>ARK Premium</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">$29.99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>8 vCPU Cores</li>
                    <li>16GB RAM</li>
                    <li>200GB SSD Storage</li>
                    <li>Up to 70 Players</li>
                    <li>Priority Support</li>
                    <li>Instant Setup</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/purchase/game/ark-premium" className="w-full">
                    <Button className="w-full">Purchase Now</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default GameServers;
