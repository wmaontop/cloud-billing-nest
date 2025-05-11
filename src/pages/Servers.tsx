
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Server } from "@/lib/types";
import { 
  Terminal, 
  RefreshCw, 
  Settings, 
  Database, 
  HardDrive, 
  Cpu, 
  Power, 
  MonitorSmartphone, 
  Puzzle, 
  Users, 
  FileCode,
  Folder,
  Download,
  UploadCloud,
  Trash2,
  Play,
  PauseCircle,
  Save
} from "lucide-react";

const Servers = () => {
  const { id } = useParams<{ id: string }>();
  const [consoleOutput, setConsoleOutput] = useState<string[]>([
    "Starting server...",
    "[INFO] Checking for updates...",
    "[INFO] Server version: 1.19.2",
    "[INFO] Loading properties...",
    "[INFO] Starting Minecraft server on 0.0.0.0:25565",
    "[INFO] Preparing level \"world\"",
    "[INFO] Done! For help, type \"help\""
  ]);
  const [command, setCommand] = useState("");
  const [serverType, setServerType] = useState("minecraft");

  // Mock data
  const server: Server = {
    id: id || "server1",
    name: "Minecraft Server",
    status: "running",
    cpu: 2,
    ram: 4,
    disk: 50,
    ip: "123.456.789.0",
    pterodactylId: "ptero1",
    planId: "standard"
  };
  
  const mockPlugins = [
    { name: "EssentialsX", version: "2.19.0", status: "enabled", author: "EssentialsX Team" },
    { name: "WorldEdit", version: "7.2.10", status: "enabled", author: "EngineHub" },
    { name: "LuckPerms", version: "5.4.0", status: "enabled", author: "Luck" },
    { name: "Vault", version: "1.7.3", status: "enabled", author: "Sleaker" },
  ];
  
  const mockPlayers = [
    { name: "Player1", rank: "Admin", playtime: "24h 35m", status: "online" },
    { name: "Player2", rank: "Moderator", playtime: "12h 15m", status: "offline" },
    { name: "Player3", rank: "Member", playtime: "48h 20m", status: "offline" },
  ];
  
  const mockFivemResources = [
    { name: "es_extended", status: "running", author: "ESX Framework" },
    { name: "mysql-async", status: "running", author: "brouznouf" },
    { name: "esx_policejob", status: "running", author: "ESX Framework" },
    { name: "esx_ambulancejob", status: "stopped", author: "ESX Framework" },
  ];

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    // Add the command to console output
    setConsoleOutput((prev) => [...prev, `> ${command}`]);
    
    // Mock command response
    setTimeout(() => {
      if (command.toLowerCase().includes("help")) {
        setConsoleOutput((prev) => [...prev, "[INFO] Available commands: help, list, stop, restart"]);
      } else if (command.toLowerCase().includes("list")) {
        setConsoleOutput((prev) => [...prev, "[INFO] There are 0/20 players online:"]);
      } else {
        setConsoleOutput((prev) => [...prev, `[INFO] Unknown command: ${command}`]);
      }
    }, 500);

    setCommand("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />
      
      <div className="container py-8 flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold mr-3 text-white">{server.name}</h1>
            <Badge
              className={`${
                server.status === "running"
                  ? "bg-green-500"
                  : server.status === "stopped"
                  ? "bg-red-500"
                  : "bg-yellow-500"
              } text-white`}
              variant="outline"
            >
              {server.status.charAt(0).toUpperCase() + server.status.slice(1)}
            </Badge>
          </div>

          <div className="flex space-x-3 mt-4 md:mt-0">
            <Button size="sm" variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/20">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button
              size="sm"
              variant={server.status === "running" ? "destructive" : "default"}
              className={server.status === "running" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
            >
              <Power className="h-4 w-4 mr-2" />
              {server.status === "running" ? "Stop" : "Start"}
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
                  <span className="text-sm font-medium">24%</span>
                </div>
                <Progress value={24} className="bg-gray-700 h-2">
                  <div className="h-full bg-gradient-to-r from-red-500 to-blue-500 rounded-full" style={{ width: '24%' }} />
                </Progress>
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
                  <span className="text-sm font-medium">1.7 GB / 4 GB</span>
                </div>
                <Progress value={42} className="bg-gray-700 h-2">
                  <div className="h-full bg-gradient-to-r from-red-500 to-blue-500 rounded-full" style={{ width: '42%' }} />
                </Progress>
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
                  <span className="text-sm font-medium">12 GB / 50 GB</span>
                </div>
                <Progress value={24} className="bg-gray-700 h-2">
                  <div className="h-full bg-gradient-to-r from-red-500 to-blue-500 rounded-full" style={{ width: '24%' }} />
                </Progress>
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
              <div className="space-y-3">
                <div className="flex items-center">
                  <MonitorSmartphone className="h-4 w-4 text-purple-400 mr-2" />
                  <span className="text-sm">{server.ip}:25565</span>
                </div>
                <Select 
                  defaultValue="minecraft" 
                  value={serverType}
                  onValueChange={setServerType}
                >
                  <SelectTrigger id="game" className="w-full bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Game" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 text-white border-gray-700">
                    <SelectItem value="minecraft">Minecraft Java</SelectItem>
                    <SelectItem value="fivem">FiveM</SelectItem>
                    <SelectItem value="rust">Rust</SelectItem>
                    <SelectItem value="ark">ARK</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="console" className="w-full">
          <TabsList className="bg-gray-800 mb-6">
            <TabsTrigger value="console" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">Console</TabsTrigger>
            <TabsTrigger value="files" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">File Manager</TabsTrigger>
            {serverType === "minecraft" && (
              <>
                <TabsTrigger value="plugins" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">Plugins</TabsTrigger>
                <TabsTrigger value="players" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">Players</TabsTrigger>
              </>
            )}
            {serverType === "fivem" && (
              <>
                <TabsTrigger value="resources" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">Resources</TabsTrigger>
                <TabsTrigger value="fivemplayers" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">Players</TabsTrigger>
              </>
            )}
            <TabsTrigger value="backups" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">Backups</TabsTrigger>
            <TabsTrigger value="databases" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">Databases</TabsTrigger>
          </TabsList>
          
          <TabsContent value="console" className="mt-6">
            <Card className="bg-gray-800 border-red-500/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Terminal className="h-5 w-5 mr-2 text-red-400" />
                  Console
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Server console and command interface
                </CardDescription>
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
                  <input
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    placeholder="Type a command..."
                    className="flex-grow rounded-md border border-gray-700 bg-gray-700 px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500 text-white"
                  />
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500"
                  >
                    Send
                  </Button>
                </form>
              </CardContent>
              <CardFooter>
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center text-sm text-gray-400">
                    <div className="flex items-center mr-4">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                      <span>Connected</span>
                    </div>
                    <span>Last updated: just now</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-blue-500 text-blue-400 hover:bg-blue-500/20"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="files" className="mt-6">
            <Card className="bg-gray-800 border-red-500/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Folder className="h-5 w-5 mr-2 text-red-400" />
                  File Manager
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your server files and directories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-gray-700">
                  <div className="p-4 flex items-center justify-between bg-gray-700">
                    <div className="flex items-center">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-blue-500 text-blue-400 hover:bg-blue-500/20"
                      >
                        <UploadCloud className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="ml-2 text-gray-300"
                      >
                        <Folder className="h-4 w-4 mr-2" />
                        New Folder
                      </Button>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-300 mr-2">
                        Current path: /home/container
                      </span>
                    </div>
                  </div>
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Size</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Modified</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center">
                            <Folder className="h-4 w-4 text-blue-400 mr-2" />
                            world
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          Folder
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          May 10, 2023
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
                            server.properties
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          1.2 KB
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          May 10, 2023
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
                            eula.txt
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          0.3 KB
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          May 10, 2023
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
          
          {/* Minecraft Plugins Tab */}
          <TabsContent value="plugins" className="mt-6">
            <Card className="bg-gray-800 border-red-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Puzzle className="h-5 w-5 mr-2 text-green-400" />
                      Minecraft Plugins Manager
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Manage and configure server plugins
                    </CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500">
                    Install New Plugin
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="rounded-md border border-gray-700">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead className="bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Plugin</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Version</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Author</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-gray-800 divide-y divide-gray-700">
                        {mockPlugins.map((plugin, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <div className="flex items-center">
                                <Puzzle className="h-4 w-4 text-green-400 mr-2" />
                                <span className="font-medium">{plugin.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {plugin.version}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {plugin.author}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge variant="outline" className="bg-green-900/30 text-green-400 border-green-500/50">
                                {plugin.status}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                                Configure
                              </Button>
                              <Button variant="ghost" size="sm" className="text-yellow-400 hover:text-yellow-300">
                                Disable
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                                Remove
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Plugin Marketplace</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-gray-700 border-gray-600">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md">CoreProtect</CardTitle>
                          <CardDescription className="text-gray-400">Block logging and anti-grief plugin</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm text-gray-300 mb-2">
                            Version: 20.4
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="bg-blue-900/30 text-blue-400 border-blue-500/50">
                              Popular
                            </Badge>
                            <Button 
                              size="sm"
                              className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500"
                            >
                              Install
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-gray-700 border-gray-600">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md">GriefPrevention</CardTitle>
                          <CardDescription className="text-gray-400">Land claim and grief protection plugin</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm text-gray-300 mb-2">
                            Version: 16.18.1
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="bg-blue-900/30 text-blue-400 border-blue-500/50">
                              Recommended
                            </Badge>
                            <Button 
                              size="sm"
                              className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500"
                            >
                              Install
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-gray-700 border-gray-600">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md">DiscordSRV</CardTitle>
                          <CardDescription className="text-gray-400">Discord integration for Minecraft</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm text-gray-300 mb-2">
                            Version: 1.26.0
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="bg-blue-900/30 text-blue-400 border-blue-500/50">
                              New
                            </Badge>
                            <Button 
                              size="sm"
                              className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500"
                            >
                              Install
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Minecraft Players Tab */}
          <TabsContent value="players" className="mt-6">
            <Card className="bg-gray-800 border-red-500/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-400" />
                  Player Manager
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Manage players, permissions, and whitelists
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="rounded-md border border-gray-700">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead className="bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Player</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Rank</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Playtime</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-gray-800 divide-y divide-gray-700">
                        {mockPlayers.map((player, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <div className="flex items-center">
                                <img 
                                  src={`https://crafatar.com/avatars/${index}?size=24&overlay`} 
                                  alt={player.name} 
                                  className="h-6 w-6 rounded mr-2" 
                                />
                                <span className="font-medium">{player.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge variant="outline" className={
                                player.rank === "Admin" 
                                  ? "bg-red-900/30 text-red-400 border-red-500/50" 
                                  : player.rank === "Moderator" 
                                    ? "bg-blue-900/30 text-blue-400 border-blue-500/50" 
                                    : "bg-gray-700 text-gray-300 border-gray-600"
                              }>
                                {player.rank}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {player.playtime}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className={`h-2.5 w-2.5 rounded-full mr-2 ${player.status === "online" ? "bg-green-500" : "bg-gray-500"}`}></div>
                                <span className="text-sm">{player.status}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                                Permissions
                              </Button>
                              {player.status === "online" && (
                                <Button variant="ghost" size="sm" className="text-yellow-400 hover:text-yellow-300">
                                  Kick
                                </Button>
                              )}
                              <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                                Ban
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-gray-700 border-gray-600">
                      <CardHeader>
                        <CardTitle>Whitelist Manager</CardTitle>
                        <CardDescription className="text-gray-400">
                          Manage whitelisted players
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex space-x-2 mb-4">
                          <input
                            type="text"
                            placeholder="Enter player username"
                            className="flex-grow rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500 text-white"
                          />
                          <Button className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500">
                            Add
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 bg-gray-800 rounded">
                            <span>Player1</span>
                            <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-gray-800 rounded">
                            <span>Player2</span>
                            <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gray-700 border-gray-600">
                      <CardHeader>
                        <CardTitle>OPs Manager</CardTitle>
                        <CardDescription className="text-gray-400">
                          Manage operator permissions
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex space-x-2 mb-4">
                          <input
                            type="text"
                            placeholder="Enter player username"
                            className="flex-grow rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500 text-white"
                          />
                          <Button className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500">
                            Add
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 bg-gray-800 rounded">
                            <span>Player1</span>
                            <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* FiveM Resources Tab */}
          <TabsContent value="resources" className="mt-6">
            <Card className="bg-gray-800 border-red-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <FileCode className="h-5 w-5 mr-2 text-blue-400" />
                      FiveM Resources Manager
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Manage and configure server resources
                    </CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500">
                    Install New Resource
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="rounded-md border border-gray-700">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead className="bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Resource</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Author</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-gray-800 divide-y divide-gray-700">
                        {mockFivemResources.map((resource, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <div className="flex items-center">
                                <FileCode className="h-4 w-4 text-blue-400 mr-2" />
                                <span className="font-medium">{resource.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {resource.author}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge variant="outline" className={
                                resource.status === "running" 
                                  ? "bg-green-900/30 text-green-400 border-green-500/50" 
                                  : "bg-red-900/30 text-red-400 border-red-500/50"
                              }>
                                {resource.status}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                                Configure
                              </Button>
                              {resource.status === "running" ? (
                                <Button variant="ghost" size="sm" className="text-yellow-400 hover:text-yellow-300">
                                  <PauseCircle className="h-4 w-4 mr-1" />
                                  Stop
                                </Button>
                              ) : (
                                <Button variant="ghost" size="sm" className="text-green-400 hover:text-green-300">
                                  <Play className="h-4 w-4 mr-1" />
                                  Start
                                </Button>
                              )}
                              <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                                Remove
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Server Configuration</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="bg-gray-700 border-gray-600">
                        <CardHeader className="pb-2">
                          <CardTitle>Server Config (server.cfg)</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-gray-800 p-4 rounded-md font-mono text-sm h-48 overflow-y-auto mb-4 border border-gray-600">
                            <pre className="text-gray-300">
                              # Server Config{"\n"}
                              set sv_hostname "NextGen FiveM Server"{"\n"}
                              set sv_maxclients 32{"\n"}
                              set steam_webApiKey ""{"\n"}
                              set sv_licenseKey ""{"\n"}
                              {"\n"}
                              # Load ESX{"\n"}
                              ensure mysql-async{"\n"}
                              ensure es_extended{"\n"}
                              {"\n"}
                              # Load ESX Jobs{"\n"}
                              ensure esx_policejob{"\n"}
                              ensure esx_ambulancejob{"\n"}
                            </pre>
                          </div>
                          <Button className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 w-full">
                            <Save className="h-4 w-4 mr-2" />
                            Save Configuration
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-gray-700 border-gray-600">
                        <CardHeader className="pb-2">
                          <CardTitle>Resource Installer</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              placeholder="GitHub URL or resource name"
                              className="flex-grow rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500 text-white"
                            />
                            <Button className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500">
                              <Download className="h-4 w-4 mr-2" />
                              Install
                            </Button>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-2">Popular Resources</h4>
                            <div className="space-y-2">
                              <Button variant="outline" size="sm" className="mr-2 border-blue-500 text-blue-400 hover:bg-blue-500/20">
                                ESX Framework
                              </Button>
                              <Button variant="outline" size="sm" className="mr-2 border-blue-500 text-blue-400 hover:bg-blue-500/20">
                                vMenu
                              </Button>
                              <Button variant="outline" size="sm" className="mr-2 border-blue-500 text-blue-400 hover:bg-blue-500/20">
                                QBCore
                              </Button>
                              <Button variant="outline" size="sm" className="border-blue-500 text-blue-400 hover:bg-blue-500/20">
                                LambdaMenu
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="fivemplayers" className="mt-6">
            <Card className="bg-gray-800 border-red-500/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-400" />
                  FiveM Player Manager
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Manage players, permissions, and bans
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-gray-700">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Player</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Steam</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ping</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center mr-2">
                              <span className="font-medium text-xs">JD</span>
                            </div>
                            <span className="font-medium">John_Doe</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">1</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          STEAM_0:1:123456789
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          25ms
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                            Message
                          </Button>
                          <Button variant="ghost" size="sm" className="text-yellow-400 hover:text-yellow-300">
                            Kick
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                            Ban
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                              <span className="font-medium text-xs">JS</span>
                            </div>
                            <span className="font-medium">Jane_Smith</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">2</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          STEAM_0:0:987654321
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          32ms
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                            Message
                          </Button>
                          <Button variant="ghost" size="sm" className="text-yellow-400 hover:text-yellow-300">
                            Kick
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                            Ban
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Ban Management</h3>
                  <div className="rounded-md border border-gray-700">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead className="bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Player</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Reason</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Admin</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Expires</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-gray-800 divide-y divide-gray-700">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex items-center">
                              <span className="font-medium">Banned_User</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            Cheating
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            Admin1
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            Permanent
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                              Unban
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
                      <Database className="h-5 w-5 mr-2 text-indigo-400" />
                      Backups
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Manage your server backups
                    </CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500">
                    Create Backup
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-gray-700">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Size</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Created</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          Auto Backup - 2023-05-10
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          42.3 MB
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          May 10, 2023
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
                          Manual Backup - Initial Setup
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          38.1 MB
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          May 5, 2023
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
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="databases" className="mt-6">
            <Card className="bg-gray-800 border-red-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Database className="h-5 w-5 mr-2 text-blue-400" />
                      Databases
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Manage your server databases
                    </CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500">
                    Create Database
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-gray-700">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Host</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          s1_minecraft
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          MySQL
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          db.cloudhost.com
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-blue-500 text-blue-400 hover:bg-blue-500/20"
                          >
                            View Details
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                            Delete
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Database Connection Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-gray-700 border-gray-600">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md">Connection Details</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Host:</span>
                            <span>db.cloudhost.com</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Port:</span>
                            <span>3306</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Username:</span>
                            <span>s1_minecraft</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Password:</span>
                            <span>••••••••••••</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Database:</span>
                            <span>s1_minecraft</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gray-700 border-gray-600">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md">phpMyAdmin</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-300 mb-4">
                          Access your database through phpMyAdmin for direct management.
                        </p>
                        <Button className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500">
                          Open phpMyAdmin
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Servers;
