
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server as ServerType } from "@/lib/types";
import { Server as ServerIcon, Power, Settings, RefreshCw, Cpu, Memory, HardDrive, Network } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { sendPowerAction, getServerPowerStatus } from "@/lib/pterodactyl-api";
import { Progress } from "@/components/ui/progress";

interface ServerCardProps {
  server: ServerType;
  refreshServers?: () => void;
}

// Define the proper status type to fix TypeScript errors
type ServerStatus = "running" | "stopped" | "starting" | "stopping" | "suspended" | "error";

const ServerCard = ({ server, refreshServers }: ServerCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState<ServerStatus>(server.status as ServerStatus);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [resources, setResources] = useState({
    cpu: Math.floor(Math.random() * 80), // Simulated CPU usage percentage
    ram: Math.floor(Math.random() * 70), // Simulated RAM usage percentage
    disk: Math.floor(Math.random() * 50), // Simulated Disk usage percentage
  });
  const { toast } = useToast();

  useEffect(() => {
    // Update status when server prop changes
    setServerStatus(server.status as ServerStatus);
    
    // If server is running, simulate resource usage updates
    if (server.status === "running") {
      const interval = setInterval(() => {
        setResources({
          cpu: Math.floor(Math.random() * 80),
          ram: Math.floor(Math.random() * 70),
          disk: Math.floor(Math.random() * 50),
        });
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [server]);

  const statusColors = {
    running: "bg-green-500",
    stopped: "bg-red-500",
    starting: "bg-yellow-500",
    stopping: "bg-yellow-500",
    suspended: "bg-purple-500",
    error: "bg-orange-500",
  };

  const refreshStatus = async () => {
    try {
      setIsRefreshing(true);
      const status = await getServerPowerStatus(server.id);
      setServerStatus(status as ServerStatus);
      
      // If server is running, update resource usage simulation
      if (status === "running") {
        setResources({
          cpu: Math.floor(Math.random() * 80),
          ram: Math.floor(Math.random() * 70),
          disk: Math.floor(Math.random() * 50),
        });
      }
      
      toast({
        title: "Status Refreshed",
        description: `Server status: ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      });
    } catch (error) {
      console.error("Error refreshing server status:", error);
      toast({
        title: "Refresh Failed",
        description: "Could not refresh server status",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handlePowerAction = async () => {
    setIsLoading(true);
    
    const action = serverStatus === "running" ? "stop" : "start";
    
    try {
      // Call the API function to send power action
      const success = await sendPowerAction(server.id, action as "start" | "stop" | "restart");
      
      if (success) {
        // Update server status
        if (action === "start") {
          // Simulate a starting state briefly
          setServerStatus("starting");
          toast({
            title: "Server starting",
            description: `Your server "${server.name}" is starting up. This may take a moment...`,
          });
          
          // After a delay, update to running state and refresh servers
          setTimeout(() => {
            setServerStatus("running");
            // Initialize resource usage for a newly started server
            setResources({
              cpu: Math.floor(Math.random() * 30),
              ram: Math.floor(Math.random() * 40),
              disk: Math.floor(Math.random() * 50),
            });
            toast({
              title: "Server started",
              description: `Your server "${server.name}" has been started successfully.`,
            });
            // Refresh the server list if available
            if (refreshServers) {
              refreshServers();
            }
          }, 3000);
        } else {
          // Simulate a stopping state briefly
          setServerStatus("stopping");
          toast({
            title: "Server stopping",
            description: `Your server "${server.name}" is shutting down. This may take a moment...`,
          });
          
          // After a delay, update to stopped state and refresh servers
          setTimeout(() => {
            setServerStatus("stopped");
            // Reset resource usage for stopped server
            setResources({
              cpu: 0,
              ram: 0,
              disk: resources.disk, // Keep disk usage as storage persists
            });
            toast({
              title: "Server stopped",
              description: `Your server "${server.name}" has been stopped successfully.`,
            });
            // Refresh the server list if available
            if (refreshServers) {
              refreshServers();
            }
          }, 2000);
        }
      } else {
        throw new Error(`Failed to ${action} server`);
      }
    } catch (error) {
      console.error("Error with server action:", error);
      toast({
        title: "Operation failed",
        description: `Failed to ${action} the server. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusLabel = () => {
    switch (serverStatus) {
      case "running":
        return "Running";
      case "starting":
        return "Starting...";
      case "stopping":
        return "Stopping...";
      case "stopped":
        return "Stopped";
      case "suspended":
        return "Suspended";
      case "error":
        return "Error";
      default:
        return "Unknown";
    }
  };

  const getPowerButtonText = () => {
    if (isLoading) return "Processing...";
    if (serverStatus === "running") return "Stop";
    if (serverStatus === "stopped") return "Start";
    if (serverStatus === "starting") return "Starting...";
    if (serverStatus === "stopping") return "Stopping...";
    return "Power";
  };

  return (
    <Card className="card-hover transition-all duration-200 hover:shadow-lg border-gray-700 bg-gray-800 hover:border-blue-500/30">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-2">
          <ServerIcon className="h-5 w-5 text-blue-400" />
          <CardTitle className="text-lg text-white">{server.name}</CardTitle>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 rounded-full hover:bg-gray-700" 
            onClick={refreshStatus}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-3 w-3 text-gray-400 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
          <Badge
            className={`${statusColors[serverStatus] || "bg-gray-500"} text-white`}
            variant="outline"
          >
            {getStatusLabel()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <p className="text-gray-400">CPU</p>
              <p className="text-white">{server.cpu} vCores</p>
            </div>
            <div>
              <p className="text-gray-400">RAM</p>
              <p className="text-white">{server.ram} GB</p>
            </div>
            <div>
              <p className="text-gray-400">Storage</p>
              <p className="text-white">{server.disk} GB</p>
            </div>
            <div>
              <p className="text-gray-400">IP Address</p>
              <p className="text-white">{server.ip}</p>
            </div>
          </div>
          
          {serverStatus === "running" && (
            <div className="space-y-3 pt-2 border-t border-gray-700">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center">
                    <Cpu className="h-3 w-3 text-blue-400 mr-1" />
                    <span className="text-gray-400">CPU Usage</span>
                  </div>
                  <span className="text-white">{resources.cpu}%</span>
                </div>
                <Progress value={resources.cpu} className="h-1" />
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center">
                    <Memory className="h-3 w-3 text-green-400 mr-1" />
                    <span className="text-gray-400">RAM Usage</span>
                  </div>
                  <span className="text-white">{resources.ram}%</span>
                </div>
                <Progress value={resources.ram} className="h-1" />
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center">
                    <HardDrive className="h-3 w-3 text-amber-400 mr-1" />
                    <span className="text-gray-400">Disk Usage</span>
                  </div>
                  <span className="text-white">{resources.disk}%</span>
                </div>
                <Progress value={resources.disk} className="h-1" />
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between bg-gray-900/50 rounded-b-lg pt-3">
        <Link to={`/servers/${server.id}`}>
          <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
            <Settings className="h-4 w-4 mr-2" />
            Manage
          </Button>
        </Link>
        <Button
          variant={serverStatus === "running" ? "destructive" : "default"}
          size="sm"
          onClick={handlePowerAction}
          disabled={isLoading || serverStatus === "starting" || serverStatus === "stopping"}
          className={serverStatus === "stopped" ? "bg-green-600 hover:bg-green-700" : ""}
        >
          <Power className="h-4 w-4 mr-2" />
          {getPowerButtonText()}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServerCard;
