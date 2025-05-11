import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Server, 
  HardDrive, 
  Network, 
  Cpu, 
  Power, 
  RefreshCw, 
  Terminal, 
  Database, 
  FileCode, 
  Shield, 
  Settings, 
  Globe,
  ArrowRightLeft,
  Folder
} from "lucide-react";

const CustomVps = () => {
  const { user } = useAuth();
  const [consoleOutput, setConsoleOutput] = useState<string[]>([
    "Connected to VPS via SSH",
    "Welcome to NextGen VPS",
    "Ubuntu 22.04.3 LTS",
    "System information as of Wed May 11 14:12:33 UTC 2025",
    "",
    "System load:  0.08               Users logged in:       1",
    "Usage of /:   25.1% of 50.00GB   IPv4 address for eth0: 192.168.1.100",
    "Memory usage: 35%                Swap usage:            0%",
    "Temperature:  45°C"
  ]);
  const [command, setCommand] = useState("");

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    setConsoleOutput((prev) => [...prev, `root@nextgen:~$ ${command}`]);
    
    setTimeout(() => {
      if (command.toLowerCase() === "ls") {
        setConsoleOutput((prev) => [...prev, "app  data  logs  public  scripts"]);
      } else if (command.toLowerCase() === "uptime") {
        setConsoleOutput((prev) => [...prev, " 14:14:25 up 48 days, 3:42, 1 user, load average: 0.08, 0.12, 0.10"]);
      } else if (command.toLowerCase().includes("help")) {
        setConsoleOutput((prev) => [...prev, "Available commands: ls, uptime, help, clear"]);
      } else if (command.toLowerCase() === "clear") {
        setConsoleOutput([]);
      } else {
        setConsoleOutput((prev) => [...prev, `Command '${command}' not found in simulation.`]);
      }
    }, 500);

    setCommand("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />
      
      <div className="container py-8 flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">VPS Control Panel</h1>
            <p className="text-gray-400">Manage your virtual private server</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <Button 
              size="sm" 
              variant="outline"
              className="border-green-500 text-green-400 hover:bg-green-500/20"
            >
              <Power className="h-4 w-4 mr-2" />
              Start
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/20"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Restart
            </Button>
            <Button 
              size="sm" 
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
            >
              <Power className="h-4 w-4 mr-2" />
              Stop
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-red-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                CPU Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Cpu className="h-4 w-4 text-red-400" />
                  <span className="text-sm font-medium">17%</span>
                </div>
                <Progress value={17} className="bg-gray-700 h-2">
                  <div className="h-full bg-gradient-to-r from-red-500 to-blue-500 rounded-full" style={{ width: '17%' }} />
                </Progress>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>2 vCPUs</span>
                  <span>2.4 GHz</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-blue-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Memory Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Database className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-medium">1.4 GB / 4 GB</span>
                </div>
                <Progress value={35} className="bg-gray-700 h-2">
                  <div className="h-full bg-gradient-to-r from-red-500 to-blue-500 rounded-full" style={{ width: '35%' }} />
                </Progress>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>RAM</span>
                  <span>35%</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-green-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Disk Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <HardDrive className="h-4 w-4 text-green-400" />
                  <span className="text-sm font-medium">12.5 GB / 50 GB</span>
                </div>
                <Progress value={25} className="bg-gray-700 h-2">
                  <div className="h-full bg-gradient-to-r from-red-500 to-blue-500 rounded-full" style={{ width: '25%' }} />
                </Progress>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>SSD</span>
                  <span>25.1%</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-purple-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Network className="h-4 w-4 text-purple-400" />
                  <span className="text-sm font-medium">
                    <ArrowRightLeft className="h-3 w-3 inline mr-1" />
                    2.3 MB/s
                  </span>
                </div>
                <Progress value={42} className="bg-gray-700 h-2">
                  <div className="h-full bg-gradient-to-r from-red-500 to-blue-500 rounded-full" style={{ width: '42%' }} />
                </Progress>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Unlimited</span>
                  <span>1 Gbps</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="console" className="w-full">
          <TabsList className="bg-gray-800 mb-6">
            <TabsTrigger value="console" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              SSH Console
            </TabsTrigger>
            <TabsTrigger value="files" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              File Manager
            </TabsTrigger>
            <TabsTrigger value="apps" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              Applications
            </TabsTrigger>
            <TabsTrigger value="network" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              Network
            </TabsTrigger>
            <TabsTrigger value="backups" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              Backups
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="console" className="mt-6">
            <Card className="bg-gray-800 border-red-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Terminal className="h-5 w-5 mr-2 text-red-400" />
                      SSH Terminal
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Control your server with SSH commands
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Select defaultValue="bash">
                      <SelectTrigger className="w-[120px] bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Shell" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 text-white border-gray-700">
                        <SelectItem value="bash">Bash</SelectItem>
                        <SelectItem value="zsh">Zsh</SelectItem>
                        <SelectItem value="sh">Sh</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-black text-green-400 font-mono text-sm rounded-lg p-4 h-80 overflow-y-auto mb-4 border border-gray-700">
                  {consoleOutput.map((line, index) => (
                    <div key={index} className="pb-1">
                      {line}
                    </div>
                  ))}
                </div>
                <form onSubmit={handleCommandSubmit} className="flex space-x-2">
                  <div className="flex-grow flex items-center bg-gray-700 rounded-md border border-gray-700">
                    <span className="px-3 text-gray-400">root@nextgen:~$</span>
                    <input
                      type="text"
                      value={command}
                      onChange={(e) => setCommand(e.target.value)}
                      placeholder="Enter command..."
                      className="flex-grow bg-transparent border-0 px-0 py-2 text-sm focus-visible:outline-none focus-visible:ring-0 text-white"
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500"
                  >
                    Send
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="apps" className="mt-6">
            <Card className="bg-gray-800 border-red-500/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileCode className="h-5 w-5 mr-2 text-blue-400" />
                  One-Click Applications
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Install applications with a single click
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-gray-700 border-gray-600">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-md flex items-center">
                          <svg className="h-5 w-5 mr-2 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M13.338 11.286l-.67-8.56 7.63 5.727-10.787-1.374L22.666 1 11.983 23l1.354-11.714z" />
                          </svg>
                          NGINX
                        </CardTitle>
                        <Badge className="bg-green-900/30 text-green-400 border-green-500/50">
                          Web Server
                        </Badge>
                      </div>
                      <CardDescription className="text-gray-400">
                        High-performance web server
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <Button className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500">Install</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-700 border-gray-600">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-md flex items-center">
                          <svg className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M10.483 12.482h3.034L12 8.831z M12 3.074L3.689 20.926h2.651l1.375-3.986h8.579l1.375 3.986h2.651L12 3.074z" />
                          </svg>
                          Docker
                        </CardTitle>
                        <Badge className="bg-blue-900/30 text-blue-400 border-blue-500/50">
                          Containers
                        </Badge>
                      </div>
                      <CardDescription className="text-gray-400">
                        Containerization platform
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <Button className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500">Install</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-700 border-gray-600">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-md flex items-center">
                          <svg className="h-5 w-5 mr-2 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 1.72.384 3.565.427 5.53zm3.92-4.08c-.378 2.045-.876 3.533-1.492 4.46-.482.716-1.01 1.073-1.583 1.073-.153 0-.34-.046-.566-.138v-.494c.11.017.24.026.386.026.268 0 .483-.075.647-.222.197-.18.295-.382.295-.605 0-.155-.077-.47-.23-.944L6.23 14.615h.91l.727 2.36c.164.536.233.91.205 1.123.4-1.064.678-2.227.835-3.483zm12.325 4.08h-2.63v-5.53h.885v4.85h1.745zm-3.32.135l-1.016-.5c.09-.076.177-.158.255-.25.433-.506.648-1.258.648-2.253 0-1.83-.718-2.746-2.155-2.746-.704 0-1.254.232-1.65.697-.43.508-.646 1.256-.646 2.245 0 .972.19 1.686.574 2.14.337.405.83.61 1.478.61.246 0 .48-.046.7-.138zm-2.322-3.815c0 1.367.28 2.05.84 2.05.233 0 .41-.08.526-.238.146-.197.22-.537.22-1.02 0-.936-.197-1.578-.592-1.927a.544.544 0 00-.4-.153c-.252 0-.44.08-.565.242-.152.193-.226.52-.226.98zm-3.244 4.22h.868c.027-.353.033-.602.033-.844v-3.41c0-.353-.008-.602-.033-.712h.868l-.033.487c.076-.22.196-.4.363-.54.228-.193.5-.29.82-.29.383 0 .67.13.856.387.187.258.28.6.28 1.022v3.055c0 .246.005.494.032.844h-.867c.022-.353.027-.602.027-.844v-2.812c0-.28-.054-.478-.164-.592a.607.607 0 00-.466-.175c-.196 0-.364.07-.505.215-.073.08-.158.233-.245.458v2.906c0 .242.005.496.033.844z" />
                          </svg>
                          Node.js
                        </CardTitle>
                        <Badge className="bg-purple-900/30 text-purple-400 border-purple-500/50">
                          Runtime
                        </Badge>
                      </div>
                      <CardDescription className="text-gray-400">
                        JavaScript runtime environment
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <Button className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500">Install</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-700 border-gray-600">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-md flex items-center">
                          <svg className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
                          </svg>
                          Tailwind CSS
                        </CardTitle>
                        <Badge className="bg-blue-900/30 text-blue-400 border-blue-500/50">
                          CSS Framework
                        </Badge>
                      </div>
                      <CardDescription className="text-gray-400">
                        Utility-first CSS framework
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <Button className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500">Install</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-700 border-gray-600">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-md flex items-center">
                          <svg className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16.405 5.676c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.87h-.927c-.03-1.562-.123-3.03-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01c-.103 1.323-.168 2.793-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 1.72.384 3.565.427 5.53zm5.497-5.422c-.603-.046-.674-.143-.674-.41V13c0-.664-.223-1.108-.674-1.325-.466-.217-1.1-.217-1.902-.217h-.294v5.863h.217c.86 0 1.313-.078 1.593-.194.387-.163.67-.415.67-1.325v-.54c0-.338-.037-.602-.297-.817-.214-.172-.412-.287-.732-.357.25-.085.448-.197.577-.35.193-.19.237-.457.237-.836v-.537c0-.24-.036-.394-.086-.587zm-3.545 3.515c0 .29.012.487.046.672h-.855c.03-.177.04-.38.04-.672v-2.656h-.254v3.328h.254V14.35zm3.29-3.742c-.23.163-.447.2-.674.2h-.24v1.687h.215c.29 0 .577.016.75-.154.158-.13.203-.338.203-.738v-.067c0-.257-.017-.45-.126-.6-.11-.16-.24-.24-.405-.24-.113 0-.21.047-.33.108l.17.017c.203 0 .215.16.215.333v.07c0 .167-.013.327-.217.327-.088 0-.132-.04-.132-.156v-.56c0-.165.01-.346.118-.52.19-.36.6-.12 1.35-.12.48 0 .87.134 1.123.537.252.337.3.977.3 1.522 0 .658-.075 1.437-.19 2.107-.116.654-.093 1.498-.093 2.352h-.803c-.03-.192-.04-.783-.04-1.044v-5.087c-.605-.084-1.184-.103-1.694-.013zm-3.855 5.105V13.7c0-.28-.013-.47-.053-.673h.855c-.04.204-.052.393-.052.673v.528c0 .786.026 1.598.086 1.946h-.86c.05-.39.027-.954.027-1.353zm10.1-2.95c-.347 0-.712.06-1.138.16l.052-.73c.064-.116.09-.306.09-.332 0-.12-.126-.412-.548-.412-.1 0-.25.03-.33.085l-.07.242c-.058.063-.117.153-.117.275v.38c0 .43 0 .865-.017 1.318-.016.382-.02.76-.054 1.142h.873c.008-.473.008-.946.008-1.405v-.34c0-.16.083-.203.152-.203.097 0 .14.058.14.187v.33c0 .46 0 .932.008 1.418h.874c-.054-1.143-.054-2.287-.054-3.43 0-.095-.09-.195-.23-.23-.14-.032-.2-.06-.333-.06zm0 .128c.17 0 .223.07.223.157v.744c-.45.33-.108.05-.18.05-.123 0-.198-.07-.198-.19v-.76c.002-.076.104-.088.156-.zm-9.15-4.578c.07-.192.098-.39.098-.582 0-.23-.06-.457-.196-.645-.153-.21-.44-.33-.76-.33-.303.007-.56.083-.783.247-.298.22-.41.562-.41.968 0 .595.28.934.754 1.03.31.06.74-.013 1.073-.2.098-.054.182-.07.182-.165 0-.06-.05-.108-.108-.14-.06-.032-.116-.103-.186-.072-.203.09-.42.16-.605.16-.313 0-.512-.14-.512-.523h1.312c.005-.07.04-.15.14-.342zm-1.255.047c.01-.318.19-.497.433-.497.239 0 .394.152.39.497zm1.953 1.098h.874V13.7c0-1.082-.552-1.67-1.546-1.67-.253 0-.53.047-.769.108-.299.074-.542.19-.733.328.06.25.297.39.486.175.117-.093.3-.168.498-.21.19-.04.334-.03.486-.03.357 0 .554.21.554.605v.282c-.175-.093-.397-.14-.676-.14-.654 0-1.08.407-1.08 1.027 0 .627.453 1.058 1.066 1.058.32 0 .556-.116.702-.384v.304zm-.022-1.138c0 .47-.362.604-.575.604-.255 0-.414-.156-.414-.407 0-.28.16-.443.414-.443.213 0 .423.1.575.247zm2.486 1.138h.873v-2.05c0-.107.062-.218.18-.218.103 0 .17.083.17.204v2.063h.873v-2.144c0-.306-.022-.697-.52-.697-.277 0-.503.157-.704.47v-1.812h-.873v4.183zm3.2-4.183h-.873v5.53h.874v-1.348zm3.9 2.233c-.19-.252-.452-.37-.743-.37-.647 0-1.055.433-1.055 1.142 0 .652.396 1.142 1.1 1.142.426 0 .826-.176.826-.46 0-.15-.235-.326-.44-.166-.076.06-.19.126-.338.126-.33 0-.544-.254-.544-.675 0-.337.187-.65.544-.65.115 0 .217.036.306.108.094.063.147.145.287.145.158 0 .287-.152.287-.3 0-.134-.08-.2-.23-.31zm2.25-2.233h-.874v3.11c-.132.236-.288.38-.518.38-.116 0-.19-.07-.19-.24v-1.2c0-.697-.257-1.03-.823-1.03-.318 0-.62.152-.82.375v-.29h-.89v3.016h.89v-2.12c.14-.152.274-.242.38-.242.14 0 .19.1.19.35v1.222c0 .19.01.38.022.574.036.357.27.564.614.564.318 0 .62-.152.82-.375v.304h.89z" />
                          </svg>
                          WordPress
                        </CardTitle>
                        <Badge className="bg-red-900/30 text-red-400 border-red-500/50">
                          CMS
                        </Badge>
                      </div>
                      <CardDescription className="text-gray-400">
                        Content management system
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <Button className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500">Install</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-700 border-gray-600">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-md flex items-center">
                          <svg className="h-5 w-5 mr-2 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
                          </svg>
                          phpMyAdmin
                        </CardTitle>
                        <Badge className="bg-yellow-900/30 text-yellow-400 border-yellow-500/50">
                          Database
                        </Badge>
                      </div>
                      <CardDescription className="text-gray-400">
                        MySQL database administration
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <Button className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500">Install</Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="network" className="mt-6">
            <Card className="bg-gray-800 border-red-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Globe className="h-5 w-5 mr-2 text-blue-400" />
                      Network Configuration
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Manage IP addresses and network settings
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-gray-700 border-gray-600">
                      <CardHeader className="pb-2">
                        <CardTitle>IP Addresses</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-3 bg-gray-800 rounded-md">
                            <div>
                              <div className="font-medium">IPv4 Address (Primary)</div>
                              <div className="text-sm text-gray-400">192.168.1.100</div>
                            </div>
                            <Badge className="bg-green-900/30 text-green-400 border-green-500/50">
                              Active
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-800 rounded-md">
                            <div>
                              <div className="font-medium">IPv6 Address</div>
                              <div className="text-sm text-gray-400">2001:0db8:85a3:0000:0000:8a2e:0370:7334</div>
                            </div>
                            <Badge className="bg-green-900/30 text-green-400 border-green-500/50">
                              Active
                            </Badge>
                          </div>
                          <Button className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500">
                            Request Additional IP
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gray-700 border-gray-600">
                      <CardHeader className="pb-2">
                        <CardTitle>Firewall</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div className="font-medium">Firewall Status</div>
                            <Badge className="bg-green-900/30 text-green-400 border-green-500/50">
                              Active
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="ssh-port">SSH Port</Label>
                            <Input 
                              id="ssh-port" 
                              value="22" 
                              className="bg-gray-800 border-gray-600 text-white" 
                            />
                          </div>
                          <div className="rounded-md border border-gray-600">
                            <div className="px-4 py-3 bg-gray-800 font-medium">Open Ports</div>
                            <table className="w-full">
                              <thead>
                                <tr className="border-b border-gray-600">
                                  <th className="text-left px-4 py-2 text-gray-400">Port</th>
                                  <th className="text-left px-4 py-2 text-gray-400">Protocol</th>
                                  <th className="text-left px-4 py-2 text-gray-400">Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-gray-600">
                                  <td className="px-4 py-2">22</td>
                                  <td className="px-4 py-2">TCP</td>
                                  <td className="px-4 py-2">SSH</td>
                                </tr>
                                <tr className="border-b border-gray-600">
                                  <td className="px-4 py-2">80</td>
                                  <td className="px-4 py-2">TCP</td>
                                  <td className="px-4 py-2">HTTP</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-2">443</td>
                                  <td className="px-4 py-2">TCP</td>
                                  <td className="px-4 py-2">HTTPS</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <Button className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500">
                            Add Port Rule
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card className="bg-gray-700 border-gray-600">
                    <CardHeader className="pb-2">
                      <CardTitle>Traffic Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="h-60 bg-gray-800 rounded-md flex items-center justify-center">
                          <div className="text-gray-400">Network Traffic Graph (Demo)</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-gray-800 rounded-md">
                            <div className="text-sm text-gray-400">Total Inbound</div>
                            <div className="text-xl font-bold">128.5 GB</div>
                          </div>
                          <div className="p-4 bg-gray-800 rounded-md">
                            <div className="text-sm text-gray-400">Total Outbound</div>
                            <div className="text-xl font-bold">85.2 GB</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="files" className="mt-6">
            <Card className="bg-gray-800 border-red-500/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Folder className="h-5 w-5 mr-2 text-yellow-400" />
                  File Manager
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Manage files and directories on your server
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-gray-700">
                  <div className="p-4 flex items-center justify-between bg-gray-700">
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-blue-500 text-blue-400 hover:bg-blue-500/20"
                      >
                        Upload
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-green-500 text-green-400 hover:bg-green-500/20"
                      >
                        New Folder
                      </Button>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-300 mr-2">
                        Current path: /home/user
                      </span>
                    </div>
                  </div>
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Size</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Modified</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Permissions</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center">
                            <Folder className="h-4 w-4 text-blue-400 mr-2" />
                            app
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          Directory
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          May 10, 2023
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          drwxr-xr-x
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                            Open
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center">
                            <Folder className="h-4 w-4 text-blue-400 mr-2" />
                            public
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          Directory
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          May 10, 2023
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          drwxr-xr-x
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                            Open
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center">
                            <FileCode className="h-4 w-4 text-yellow-400 mr-2" />
                            .env
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          0.2 KB
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          May 10, 2023
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          -rw-r--r--
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                            Edit
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center">
                            <FileCode className="h-4 w-4 text-yellow-400 mr-2" />
                            package.json
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          1.5 KB
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          May 10, 2023
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          -rw-r--r--
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                            Edit
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="backups" className="mt-6">
            <Card className="bg-gray-800 border-red-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Database className="h-5 w-5 mr-2 text-green-400" />
                      Backups
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Backup and restore your server
                    </CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500">
                    Create Backup
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-gray-700 border-gray-600">
                      <CardHeader className="pb-2">
                        <CardTitle>Backup Settings</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Automatic Backups</Label>
                            <Select defaultValue="weekly">
                              <SelectTrigger className="w-full bg-gray-800 border-gray-600 text-white">
                                <SelectValue placeholder="Select frequency" />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 text-white border-gray-700">
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="disabled">Disabled</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Retention Period</Label>
                            <Select defaultValue="30">
                              <SelectTrigger className="w-full bg-gray-800 border-gray-600 text-white">
                                <SelectValue placeholder="Select period" />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 text-white border-gray-700">
                                <SelectItem value="7">7 Days</SelectItem>
                                <SelectItem value="30">30 Days</SelectItem>
                                <SelectItem value="90">90 Days</SelectItem>
                                <SelectItem value="365">1 Year</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500">
                            Save Settings
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gray-700 border-gray-600">
                      <CardHeader className="pb-2">
                        <CardTitle>Usage</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Total Backups</span>
                              <span>3 backups</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Total Size</span>
                              <span>4.3 GB</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Storage Used</span>
                              <span>4.3 GB / 10 GB</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Storage</span>
                              <span>43%</span>
                            </div>
                            <Progress value={43} className="bg-gray-800 h-2">
                              <div className="h-full bg-gradient-to-r from-red-500 to-blue-500 rounded-full" style={{ width: '43%' }} />
                            </Progress>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="rounded-md border border-gray-700">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead className="bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Size</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Created</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-gray-800 divide-y divide-gray-700">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            Automatic Backup - 2025-05-11
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            1.6 GB
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            May 11, 2025
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <Badge className="bg-blue-900/30 text-blue-400 border-blue-500/50">
                              Automatic
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-blue-500 text-blue-400 hover:bg-blue-500/20"
                            >
                              Download
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-green-500 text-green-400 hover:bg-green-500/20"
                            >
                              Restore
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                              Delete
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            Automatic Backup - 2025-05-04
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            1.5 GB
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            May 4, 2025
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <Badge className="bg-blue-900/30 text-blue-400 border-blue-500/50">
                              Automatic
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-blue-500 text-blue-400 hover:bg-blue-500/20"
                            >
                              Download
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-green-500 text-green-400 hover:bg-green-500/20"
                            >
                              Restore
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
