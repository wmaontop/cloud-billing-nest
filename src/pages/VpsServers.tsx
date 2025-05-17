import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Server, Shield, Network, Cpu, MemoryStick, HardDrive, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const VpsServers = () => {
  // Track which plan is hovered for enhanced effects
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  
  // Track if the component is mounted for animations
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };
  
  const featureVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />
      
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 py-16">
        <div className="container">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold text-center mb-4 text-white">Premium VPS Hosting</h1>
            <p className="text-blue-200 text-center max-w-2xl mx-auto text-lg">
              Enterprise-grade virtual private servers with full root access, 
              dedicated resources, and 99.9% uptime guarantee.
            </p>
          </motion.div>
        </div>
      </div>
      
      <div className="container py-12">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isMounted ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            <Card 
              className={`border-gray-700 bg-gray-800 hover:border-blue-500/50 transition-all duration-300 ${
                hoveredPlan === 'basic' ? 'shadow-lg shadow-blue-500/20 -translate-y-1' : ''
              }`}
              onMouseEnter={() => setHoveredPlan('basic')}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              <CardHeader className="pb-6">
                <Badge className="w-fit mb-2 bg-blue-900 text-blue-200">Basic</Badge>
                <CardTitle className="text-2xl text-white">VPS Basic</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">$9.99</span>
                  <span className="text-gray-400">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">2 vCPU Cores</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">2GB RAM</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">40GB SSD Storage</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">2TB Bandwidth</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">Linux/Windows</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">Full Root Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">24/7 Support</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/purchase/vps/basic" className="w-full">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600">Purchase Now</Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className={`border-blue-500 bg-gray-800 shadow-md relative overflow-hidden ${
                hoveredPlan === 'standard' ? 'shadow-xl shadow-blue-500/30 -translate-y-2' : ''
              }`}
              onMouseEnter={() => setHoveredPlan('standard')}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              <div className="absolute -right-10 -top-10 bg-blue-500 w-20 h-20 rounded-full flex items-end justify-start">
                <span className="text-xs font-bold text-white ml-2 mb-2">POPULAR</span>
              </div>
              <CardHeader className="pb-6">
                <Badge className="w-fit mb-2 bg-blue-600 text-blue-100">Standard</Badge>
                <CardTitle className="text-2xl text-white">VPS Standard</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">$19.99</span>
                  <span className="text-gray-400">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">4 vCPU Cores</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">4GB RAM</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">80GB SSD Storage</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">4TB Bandwidth</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">Linux/Windows</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">Full Root Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">Premium Support</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/purchase/vps/standard" className="w-full">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 shadow-lg shadow-blue-500/20">Purchase Now</Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card 
              className={`border-gray-700 bg-gray-800 hover:border-purple-500/50 transition-all duration-300 ${
                hoveredPlan === 'premium' ? 'shadow-lg shadow-purple-500/20 -translate-y-1' : ''
              }`}
              onMouseEnter={() => setHoveredPlan('premium')}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              <CardHeader className="pb-6">
                <Badge className="w-fit mb-2 bg-purple-900 text-purple-200">Premium</Badge>
                <CardTitle className="text-2xl text-white">VPS Premium</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">$29.99</span>
                  <span className="text-gray-400">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-purple-400" />
                  <span className="text-gray-300">6 vCPU Cores</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-purple-400" />
                  <span className="text-gray-300">8GB RAM</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-purple-400" />
                  <span className="text-gray-300">160GB SSD Storage</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-purple-400" />
                  <span className="text-gray-300">6TB Bandwidth</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-purple-400" />
                  <span className="text-gray-300">Linux/Windows</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-purple-400" />
                  <span className="text-gray-300">Full Root Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-purple-400" />
                  <span className="text-gray-300">Priority Support</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/purchase/vps/premium" className="w-full">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600">Purchase Now</Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
        
        <div className="mt-20">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold mb-4 text-white">All VPS Plans Include</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our VPS hosting comes with everything you need to get your server up and running quickly,
              securely, and reliably.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={isMounted ? "visible" : "hidden"}
          >
            <motion.div variants={featureVariants} className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500/30 transition-all duration-300">
              <Server className="h-10 w-10 text-blue-400 mb-4" />
              <h3 className="font-semibold mb-2 text-white text-lg">Full Root Access</h3>
              <p className="text-gray-400 text-sm">Complete control over your server environment with SSH access</p>
            </motion.div>
            
            <motion.div variants={featureVariants} className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500/30 transition-all duration-300">
              <Shield className="h-10 w-10 text-blue-400 mb-4" />
              <h3 className="font-semibold mb-2 text-white text-lg">99.9% Uptime</h3>
              <p className="text-gray-400 text-sm">Reliable hosting with guaranteed uptime and minimal downtime</p>
            </motion.div>
            
            <motion.div variants={featureVariants} className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500/30 transition-all duration-300">
              <HardDrive className="h-10 w-10 text-blue-400 mb-4" />
              <h3 className="font-semibold mb-2 text-white text-lg">SSD Storage</h3>
              <p className="text-gray-400 text-sm">Lightning-fast solid state drives for better performance and reliability</p>
            </motion.div>
            
            <motion.div variants={featureVariants} className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500/30 transition-all duration-300">
              <Shield className="h-10 w-10 text-blue-400 mb-4" />
              <h3 className="font-semibold mb-2 text-white text-lg">DDoS Protection</h3>
              <p className="text-gray-400 text-sm">Enterprise-grade protection against distributed denial of service attacks</p>
            </motion.div>
            
            <motion.div variants={featureVariants} className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500/30 transition-all duration-300">
              <Cpu className="h-10 w-10 text-blue-400 mb-4" />
              <h3 className="font-semibold mb-2 text-white text-lg">Instant Setup</h3>
              <p className="text-gray-400 text-sm">Get your server up and running in minutes with our automated provisioning</p>
            </motion.div>
            
            <motion.div variants={featureVariants} className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500/30 transition-all duration-300">
              <HardDrive className="h-10 w-10 text-blue-400 mb-4" />
              <h3 className="font-semibold mb-2 text-white text-lg">Automated Backups</h3>
              <p className="text-gray-400 text-sm">Regular scheduled backups to keep your data safe and recoverable</p>
            </motion.div>
            
            <motion.div variants={featureVariants} className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500/30 transition-all duration-300">
              <MemoryStick className="h-10 w-10 text-blue-400 mb-4" />
              <h3 className="font-semibold mb-2 text-white text-lg">24/7 Support</h3>
              <p className="text-gray-400 text-sm">Technical assistance whenever you need it through our ticketing system</p>
            </motion.div>
            
            <motion.div variants={featureVariants} className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500/30 transition-all duration-300">
              <Globe className="h-10 w-10 text-blue-400 mb-4" />
              <h3 className="font-semibold mb-2 text-white text-lg">Scalability</h3>
              <p className="text-gray-400 text-sm">Easily upgrade as your needs grow without any service interruption</p>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-20 bg-gradient-to-r from-blue-900 to-purple-900 p-10 rounded-2xl text-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to Get Started?</h2>
          <p className="text-blue-200 mb-6 max-w-2xl mx-auto">
            Choose the plan that fits your needs and deploy your VPS in minutes.
            Our team is ready to help you with any questions.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
                Contact Sales
              </Button>
            </Link>
            <Link to="/purchase/vps/standard">
              <Button className="bg-white text-blue-900 hover:bg-blue-100">
                Deploy Now
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default VpsServers;
