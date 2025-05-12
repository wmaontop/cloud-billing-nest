
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server as ServerType } from "@/lib/types";
import { Server as ServerIcon, Power, Settings, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { sendPowerAction, getServerPowerStatus } from "@/lib/pterodactyl-api";

interface ServerCardProps {
  server: ServerType;
  refreshServers?: () => void;
}

const ServerCard = ({ server, refreshServers }: ServerCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState(server.status);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Update status when server prop changes
    setServerStatus(server.status);
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
      setServerStatus(status);
    } catch (error) {
      console.error("Error refreshing server status:", error);
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
            description: `Your server "${server.name}" is starting up. Please wait...`,
          });
          
          // After a delay, update to running state and refresh servers
          setTimeout(() => {
            setServerStatus("running");
            toast({
              title: "Server started",
              description: `Your server "${server.name}" has been started successfully.`,
            });
            // Refresh the server list if available
            if (refreshServers) {
              refreshServers();
            }
          }, 2000);
        } else {
          // Simulate a stopping state briefly
          setServerStatus("stopping");
          toast({
            title: "Server stopping",
            description: `Your server "${server.name}" is shutting down. Please wait...`,
          });
          
          // After a delay, update to stopped state and refresh servers
          setTimeout(() => {
            setServerStatus("stopped");
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
      default:
        return serverStatus.charAt(0).toUpperCase() + serverStatus.slice(1);
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
    <Card className="card-hover transition-all duration-200 hover:shadow-md hover:border-blue-500/30">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <ServerIcon className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">{server.name}</CardTitle>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 rounded-full" 
            onClick={refreshStatus}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-3 w-3 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
          <Badge
            className={`${statusColors[serverStatus as keyof typeof statusColors] || "bg-gray-500"} text-white`}
            variant="outline"
          >
            {getStatusLabel()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">CPU</p>
            <p>{server.cpu} vCores</p>
          </div>
          <div>
            <p className="text-muted-foreground">RAM</p>
            <p>{server.ram} GB</p>
          </div>
          <div>
            <p className="text-muted-foreground">Storage</p>
            <p>{server.disk} GB</p>
          </div>
          <div>
            <p className="text-muted-foreground">IP Address</p>
            <p>{server.ip}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link to={`/servers/${server.id}`}>
          <Button variant="outline" size="sm">
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
