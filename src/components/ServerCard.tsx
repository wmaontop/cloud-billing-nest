
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server as ServerType } from "@/lib/types";
import { Server as ServerIcon, Power, Settings } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { sendPowerAction } from "@/lib/pterodactyl-api";

interface ServerCardProps {
  server: ServerType;
}

const ServerCard = ({ server }: ServerCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState(server.status);
  const { toast } = useToast();

  const statusColors = {
    running: "bg-green-500",
    stopped: "bg-red-500",
    starting: "bg-yellow-500",
    stopping: "bg-yellow-500",
  };

  const handlePowerAction = async () => {
    setIsLoading(true);
    
    const action = serverStatus === "running" ? "stop" : "start";
    
    try {
      // Call the API function to send power action
      const success = await sendPowerAction(server.id, action as "start" | "stop");
      
      if (success) {
        // Update server status
        if (action === "start") {
          // Simulate a starting state briefly
          setServerStatus("starting");
          toast({
            title: "Server starting",
            description: `Your server "${server.name}" is starting up. Please wait...`,
          });
          
          // After a delay, update to running state
          setTimeout(() => {
            setServerStatus("running");
            toast({
              title: "Server started",
              description: `Your server "${server.name}" has been started successfully.`,
            });
          }, 2000);
        } else {
          // Simulate a stopping state briefly
          setServerStatus("stopping");
          toast({
            title: "Server stopping",
            description: `Your server "${server.name}" is shutting down. Please wait...`,
          });
          
          // After a delay, update to stopped state
          setTimeout(() => {
            setServerStatus("stopped");
            toast({
              title: "Server stopped",
              description: `Your server "${server.name}" has been stopped successfully.`,
            });
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

  return (
    <Card className="card-hover">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <ServerIcon className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">{server.name}</CardTitle>
        </div>
        <Badge
          className={`${statusColors[serverStatus as keyof typeof statusColors] || "bg-gray-500"} text-white`}
          variant="outline"
        >
          {serverStatus.charAt(0).toUpperCase() + serverStatus.slice(1)}
        </Badge>
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
        >
          <Power className="h-4 w-4 mr-2" />
          {isLoading 
            ? "Processing..." 
            : serverStatus === "running" 
              ? "Stop" 
              : serverStatus === "stopped" 
                ? "Start" 
                : serverStatus === "starting" 
                  ? "Starting..." 
                  : "Stopping..."}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServerCard;
