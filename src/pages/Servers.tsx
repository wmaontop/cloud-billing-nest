
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
import { Terminal, RefreshCw, Settings, Database, HardDrive, Cpu, Power, MonitorSmartphone } from "lucide-react";

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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container py-8 flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold mr-3">{server.name}</h1>
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
            <Button size="sm" variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button
              size="sm"
              variant={server.status === "running" ? "destructive" : "default"}
            >
              <Power className="h-4 w-4 mr-2" />
              {server.status === "running" ? "Stop" : "Start"}
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                CPU Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Cpu className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">24%</span>
                </div>
                <Progress value={24} />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Memory Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Database className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">1.7 GB / 4 GB</span>
                </div>
                <Progress value={42} />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Disk Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <HardDrive className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">12 GB / 50 GB</span>
                </div>
                <Progress value={24} />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center">
                  <MonitorSmartphone className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm">{server.ip}:25565</span>
                </div>
                <Select defaultValue="minecraft">
                  <SelectTrigger id="game" className="w-full">
                    <SelectValue placeholder="Game" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="minecraft">Minecraft Java</SelectItem>
                    <SelectItem value="minecraft-bedrock">Minecraft Bedrock</SelectItem>
                    <SelectItem value="valheim">Valheim</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="console" className="w-full">
          <TabsList>
            <TabsTrigger value="console">Console</TabsTrigger>
            <TabsTrigger value="files">File Manager</TabsTrigger>
            <TabsTrigger value="backups">Backups</TabsTrigger>
            <TabsTrigger value="databases">Databases</TabsTrigger>
          </TabsList>
          
          <TabsContent value="console" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Terminal className="h-5 w-5 mr-2" />
                  Console
                </CardTitle>
                <CardDescription>
                  Server console and command interface
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-black text-green-400 font-mono text-sm rounded-lg p-4 h-80 overflow-y-auto mb-4">
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
                    className="flex-grow rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                  <Button type="submit">Send</Button>
                </form>
              </CardContent>
              <CardFooter>
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <div className="flex items-center mr-4">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                      <span>Connected</span>
                    </div>
                    <span>Last updated: just now</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="files" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>File Manager</CardTitle>
                <CardDescription>
                  Manage your server files and directories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="p-4 flex items-center justify-between bg-muted">
                    <div className="flex items-center">
                      <Button variant="outline" size="sm">
                        Upload
                      </Button>
                      <Button variant="ghost" size="sm" className="ml-2">
                        New Folder
                      </Button>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-muted-foreground mr-2">
                        Current path: /home/container
                      </span>
                    </div>
                  </div>
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Size</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Modified</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-background divide-y divide-border">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center">
                            <svg className="h-4 w-4 text-muted-foreground mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                            </svg>
                            world
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                          Folder
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                          May 10, 2023
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button variant="ghost" size="sm">
                            Open
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center">
                            <svg className="h-4 w-4 text-muted-foreground mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            server.properties
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                          1.2 KB
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                          May 10, 2023
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center">
                            <svg className="h-4 w-4 text-muted-foreground mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            eula.txt
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                          0.3 KB
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                          May 10, 2023
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button variant="ghost" size="sm">
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
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Backups</CardTitle>
                    <CardDescription>
                      Manage your server backups
                    </CardDescription>
                  </div>
                  <Button>
                    Create Backup
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Size</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Created</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-background divide-y divide-border">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          Auto Backup - 2023-05-10
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                          42.3 MB
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                          May 10, 2023
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                          <Button variant="outline" size="sm">
                            Restore
                          </Button>
                          <Button variant="ghost" size="sm">
                            Delete
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          Manual Backup - Initial Setup
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                          38.1 MB
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                          May 5, 2023
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                          <Button variant="outline" size="sm">
                            Restore
                          </Button>
                          <Button variant="ghost" size="sm">
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
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Databases</CardTitle>
                    <CardDescription>
                      Manage your server databases
                    </CardDescription>
                  </div>
                  <Button>
                    Create Database
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Host</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-background divide-y divide-border">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          s1_minecraft
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                          MySQL
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                          db.cloudhost.com
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="ghost" size="sm">
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
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Servers;
