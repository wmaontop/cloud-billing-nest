
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Server, HardDrive, Cpu, Layers, Globe, ShieldAlert } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const CustomVps = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data for VPS instances
  const vpsInstances = [
    {
      id: "vps-1",
      name: "Web Server",
      ip: "192.168.1.1",
      status: "running",
      cpu: 2,
      ram: 4,
      disk: 80,
      bandwidth: 1000,
      os: "Ubuntu 22.04",
    },
    {
      id: "vps-2",
      name: "Database Server",
      ip: "192.168.1.2",
      status: "stopped",
      cpu: 4,
      ram: 8,
      disk: 160,
      bandwidth: 2000,
      os: "CentOS 9",
    },
    {
      id: "vps-3",
      name: "Dev Environment",
      ip: "192.168.1.3",
      status: "running",
      cpu: 1,
      ram: 2,
      disk: 40,
      bandwidth: 500,
      os: "Debian 12",
    }
  ];

  // Sample network data
  const networkData = [
    {
      id: "net1",
      interface: "eth0",
      mac: "00:1a:2b:3c:4d:5e",
      ipv4: "192.168.1.1",
      ipv6: "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
      subnet: "255.255.255.0",
      gateway: "192.168.1.254"
    }
  ];

  // Sample security data
  const securityRules = [
    {
      id: "rule1",
      name: "Allow HTTP",
      protocol: "TCP",
      port: "80",
      source: "0.0.0.0/0",
      action: "ALLOW"
    },
    {
      id: "rule2",
      name: "Allow HTTPS",
      protocol: "TCP",
      port: "443",
      source: "0.0.0.0/0",
      action: "ALLOW"
    },
    {
      id: "rule3",
      name: "Allow SSH",
      protocol: "TCP",
      port: "22",
      source: "192.168.1.0/24",
      action: "ALLOW"
    }
  ];

  // Sample image data
  const osImages = [
    { id: "img1", name: "Ubuntu 22.04 LTS", type: "Linux", version: "22.04" },
    { id: "img2", name: "CentOS 9", type: "Linux", version: "9.0" },
    { id: "img3", name: "Debian 12", type: "Linux", version: "12.0" },
    { id: "img4", name: "Windows Server 2022", type: "Windows", version: "2022" },
    { id: "img5", name: "Alpine Linux", type: "Linux", version: "3.18" },
    { id: "img6", name: "FreeBSD", type: "BSD", version: "13.2" },
  ];

  // Function to restart VPS
  const handleRestart = (id: string) => {
    toast({
      title: "Restarting VPS",
      description: `VPS ${id} is now restarting. This may take a few moments.`,
    });
  };

  // Function to stop VPS
  const handleStop = (id: string) => {
    toast({
      title: "Stopping VPS",
      description: `VPS ${id} is now stopping.`,
    });
  };

  // Function to start VPS
  const handleStart = (id: string) => {
    toast({
      title: "Starting VPS",
      description: `VPS ${id} is now starting. This may take a few moments.`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Navbar />
      <div className="container mx-auto py-8 flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">VPS Control Panel</h1>
            <p className="text-gray-400">Manage your virtual private servers</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button onClick={() => navigate('/vps/new')} className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500">
              <Server className="mr-2 h-4 w-4" /> Create New VPS
            </Button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">Your VPS Instances</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vpsInstances.map((vps) => (
                <Card key={vps.id} className="bg-gray-800 border border-gray-700">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg text-white">{vps.name}</CardTitle>
                      <div className={`px-2 py-1 rounded text-xs font-semibold ${
                        vps.status === "running" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                      }`}>
                        {vps.status}
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">{vps.ip}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400">CPU</span>
                        <div className="flex items-center">
                          <Cpu className="h-3 w-3 text-blue-400 mr-1" />
                          <span className="text-sm text-white">{vps.cpu} vCores</span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400">RAM</span>
                        <div className="flex items-center">
                          <Layers className="h-3 w-3 text-green-400 mr-1" />
                          <span className="text-sm text-white">{vps.ram} GB</span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400">Disk</span>
                        <div className="flex items-center">
                          <HardDrive className="h-3 w-3 text-amber-400 mr-1" />
                          <span className="text-sm text-white">{vps.disk} GB</span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400">Bandwidth</span>
                        <div className="flex items-center">
                          <Globe className="h-3 w-3 text-purple-400 mr-1" />
                          <span className="text-sm text-white">{vps.bandwidth} GB</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/vps/${vps.id}`)}
                        className="text-gray-300 border-gray-700 hover:bg-gray-700"
                      >
                        Manage
                      </Button>
                      <div className="space-x-2">
                        {vps.status === "running" ? (
                          <>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleRestart(vps.id)}
                              className="text-blue-400 hover:text-blue-300"
                            >
                              Restart
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleStop(vps.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              Stop
                            </Button>
                          </>
                        ) : (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleStart(vps.id)}
                            className="text-green-400 hover:text-green-300"
                          >
                            Start
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-white mb-6">VPS Details</h2>
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-gray-800 border-b border-gray-700">
              <TabsTrigger value="overview" className="data-[state=active]:bg-gray-700">Overview</TabsTrigger>
              <TabsTrigger value="network" className="data-[state=active]:bg-gray-700">Network</TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-gray-700">Security</TabsTrigger>
              <TabsTrigger value="images" className="data-[state=active]:bg-gray-700">OS Images</TabsTrigger>
              <TabsTrigger value="backups" className="data-[state=active]:bg-gray-700">Backups</TabsTrigger>
              <TabsTrigger value="monitoring" className="data-[state=active]:bg-gray-700">Monitoring</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <Card className="bg-gray-800 border border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">System Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-white mb-2">Resource Usage</h3>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-400">CPU</span>
                              <span className="text-sm text-gray-400">45%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-400">Memory</span>
                              <span className="text-sm text-gray-400">60%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-400">Disk</span>
                              <span className="text-sm text-gray-400">25%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div className="bg-amber-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-400">Bandwidth</span>
                              <span className="text-sm text-gray-400">12%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-white mb-2">System Information</h3>
                        <table className="w-full text-sm">
                          <tbody>
                            <tr>
                              <td className="py-1 text-gray-400">Operating System:</td>
                              <td className="py-1 text-white">Ubuntu 22.04 LTS</td>
                            </tr>
                            <tr>
                              <td className="py-1 text-gray-400">Kernel:</td>
                              <td className="py-1 text-white">5.15.0-48-generic</td>
                            </tr>
                            <tr>
                              <td className="py-1 text-gray-400">Uptime:</td>
                              <td className="py-1 text-white">14 days, 3 hours</td>
                            </tr>
                            <tr>
                              <td className="py-1 text-gray-400">Last Boot:</td>
                              <td className="py-1 text-white">May 1, 2023, 13:45</td>
                            </tr>
                            <tr>
                              <td className="py-1 text-gray-400">Load Average:</td>
                              <td className="py-1 text-white">0.45, 0.62, 0.58</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-white mb-2">Quick Actions</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                          Reboot
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                          Power Off
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                          Reset Root Password
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                          Emergency Console
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="network">
              <Card className="bg-gray-800 border border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Network Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-white mb-2">Network Interfaces</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="text-gray-400">
                            <tr>
                              <th className="text-left py-2">Interface</th>
                              <th className="text-left py-2">MAC Address</th>
                              <th className="text-left py-2">IPv4</th>
                              <th className="text-left py-2">IPv6</th>
                              <th className="text-left py-2">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {networkData.map((network) => (
                              <tr key={network.id} className="border-t border-gray-700">
                                <td className="py-2 text-white">{network.interface}</td>
                                <td className="py-2 text-white">{network.mac}</td>
                                <td className="py-2 text-white">{network.ipv4}</td>
                                <td className="py-2 text-white">{network.ipv6}</td>
                                <td className="py-2">
                                  <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                                    Edit
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-white mb-2">DNS Settings</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Primary DNS</label>
                          <Input defaultValue="8.8.8.8" className="bg-gray-800 border-gray-600" />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Secondary DNS</label>
                          <Input defaultValue="8.8.4.4" className="bg-gray-800 border-gray-600" />
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button className="bg-blue-600 hover:bg-blue-500">Save DNS Settings</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card className="bg-gray-800 border border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Security Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-white">Firewall Rules</h3>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-500">
                          Add Rule
                        </Button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="text-gray-400">
                            <tr>
                              <th className="text-left py-2">Rule Name</th>
                              <th className="text-left py-2">Protocol</th>
                              <th className="text-left py-2">Port</th>
                              <th className="text-left py-2">Source</th>
                              <th className="text-left py-2">Action</th>
                              <th className="text-left py-2">Controls</th>
                            </tr>
                          </thead>
                          <tbody>
                            {securityRules.map((rule) => (
                              <tr key={rule.id} className="border-t border-gray-700">
                                <td className="py-2 text-white">{rule.name}</td>
                                <td className="py-2 text-white">{rule.protocol}</td>
                                <td className="py-2 text-white">{rule.port}</td>
                                <td className="py-2 text-white">{rule.source}</td>
                                <td className="py-2">
                                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                    rule.action === "ALLOW" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                                  }`}>
                                    {rule.action}
                                  </span>
                                </td>
                                <td className="py-2 flex space-x-2">
                                  <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                                    Edit
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                                    Delete
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-white mb-4">Security Options</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium">DDoS Protection</h4>
                            <p className="text-sm text-gray-400">Protect your VPS against distributed denial-of-service attacks</p>
                          </div>
                          <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/20">Enable</Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium">IP Access Management</h4>
                            <p className="text-sm text-gray-400">Control which IP addresses can access your VPS</p>
                          </div>
                          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">Configure</Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium">Intrusion Detection</h4>
                            <p className="text-sm text-gray-400">Detect and block suspicious activity</p>
                          </div>
                          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">Configure</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="images">
              <Card className="bg-gray-800 border border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Operating System Images</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-white">Available Images</h3>
                        <div className="flex space-x-2">
                          <Input placeholder="Search images..." className="bg-gray-800 border-gray-600" />
                          <Button className="bg-blue-600 hover:bg-blue-500">Search</Button>
                        </div>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="text-gray-400">
                            <tr>
                              <th className="text-left py-2">Name</th>
                              <th className="text-left py-2">Type</th>
                              <th className="text-left py-2">Version</th>
                              <th className="text-left py-2">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {osImages.map((image) => (
                              <tr key={image.id} className="border-t border-gray-700">
                                <td className="py-2 text-white">{image.name}</td>
                                <td className="py-2 text-white">{image.type}</td>
                                <td className="py-2 text-white">{image.version}</td>
                                <td className="py-2">
                                  <Button variant="outline" size="sm" className="border-blue-500 text-blue-400 hover:bg-blue-500/20">
                                    Install
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-white mb-4">Current System Image</h3>
                      <div className="p-4 border border-dashed border-gray-600 rounded-lg">
                        <div className="flex items-center">
                          <ShieldAlert className="h-10 w-10 text-amber-400 mr-4" />
                          <div>
                            <h4 className="text-white font-medium">Ubuntu 22.04 LTS</h4>
                            <p className="text-sm text-gray-400">Installed on: April 15, 2023</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/20">
                            Reinstall System
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="backups">
              <Card className="bg-gray-800 border border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Backups</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-white">Backup Schedule</h3>
                        <Button className="bg-blue-600 hover:bg-blue-500">
                          Take Backup Now
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Frequency</label>
                          <select className="w-full rounded bg-gray-800 text-white border border-gray-600 p-2">
                            <option>Daily</option>
                            <option>Weekly</option>
                            <option>Monthly</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Time</label>
                          <select className="w-full rounded bg-gray-800 text-white border border-gray-600 p-2">
                            <option>12:00 AM</option>
                            <option>3:00 AM</option>
                            <option selected>4:00 AM</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Retention</label>
                          <select className="w-full rounded bg-gray-800 text-white border border-gray-600 p-2">
                            <option>Last 3 backups</option>
                            <option selected>Last 5 backups</option>
                            <option>Last 10 backups</option>
                          </select>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button>Save Schedule</Button>
                      </div>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-white mb-4">Backup History</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="text-gray-400">
                            <tr>
                              <th className="text-left py-2">Date</th>
                              <th className="text-left py-2">Size</th>
                              <th className="text-left py-2">Type</th>
                              <th className="text-left py-2">Status</th>
                              <th className="text-left py-2">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-t border-gray-700">
                              <td className="py-2 text-white">May 12, 2023 04:00 AM</td>
                              <td className="py-2 text-white">4.2 GB</td>
                              <td className="py-2 text-white">Automated</td>
                              <td className="py-2">
                                <span className="px-2 py-1 rounded text-xs font-semibold bg-green-500/20 text-green-400">
                                  Completed
                                </span>
                              </td>
                              <td className="py-2">
                                <div className="flex space-x-2">
                                  <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                                    Restore
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                                    Delete
                                  </Button>
                                </div>
                              </td>
                            </tr>
                            <tr className="border-t border-gray-700">
                              <td className="py-2 text-white">May 11, 2023 04:00 AM</td>
                              <td className="py-2 text-white">4.1 GB</td>
                              <td className="py-2 text-white">Automated</td>
                              <td className="py-2">
                                <span className="px-2 py-1 rounded text-xs font-semibold bg-green-500/20 text-green-400">
                                  Completed
                                </span>
                              </td>
                              <td className="py-2">
                                <div className="flex space-x-2">
                                  <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                                    Restore
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                                    Delete
                                  </Button>
                                </div>
                              </td>
                            </tr>
                            <tr className="border-t border-gray-700">
                              <td className="py-2 text-white">May 10, 2023 04:00 AM</td>
                              <td className="py-2 text-white">4.0 GB</td>
                              <td className="py-2 text-white">Automated</td>
                              <td className="py-2">
                                <span className="px-2 py-1 rounded text-xs font-semibold bg-green-500/20 text-green-400">
                                  Completed
                                </span>
                              </td>
                              <td className="py-2">
                                <div className="flex space-x-2">
                                  <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                                    Restore
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                                    Delete
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="monitoring">
              <Card className="bg-gray-800 border border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">System Monitoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-white mb-4">Resource Usage History</h3>
                      <div className="h-64 bg-gray-800 rounded-lg border border-gray-700 flex items-center justify-center">
                        <p className="text-gray-400">Resource usage graphs would appear here.</p>
                      </div>
                      <div className="flex justify-end mt-4">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                            Last 24 Hours
                          </Button>
                          <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                            Last Week
                          </Button>
                          <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                            Last Month
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-white mb-4">Alert Configuration</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium">CPU Usage Alert</h4>
                            <p className="text-sm text-gray-400">Notify when CPU usage exceeds threshold</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Input type="number" defaultValue={90} className="w-20 bg-gray-800 border-gray-600" />
                            <span className="text-gray-400">%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium">Memory Usage Alert</h4>
                            <p className="text-sm text-gray-400">Notify when memory usage exceeds threshold</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Input type="number" defaultValue={85} className="w-20 bg-gray-800 border-gray-600" />
                            <span className="text-gray-400">%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium">Disk Usage Alert</h4>
                            <p className="text-sm text-gray-400">Notify when disk usage exceeds threshold</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Input type="number" defaultValue={90} className="w-20 bg-gray-800 border-gray-600" />
                            <span className="text-gray-400">%</span>
                          </div>
                        </div>
                        <div className="pt-4">
                          <Button>Save Alert Settings</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CustomVps;
