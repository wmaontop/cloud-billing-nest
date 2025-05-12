
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server as ServerType } from "@/lib/types";
import { Server as ServerIcon, Power, Settings } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
      // Get the stored API settings
      const apiSettings = localStorage.getItem('ngHostingApiSettings');
      if (!apiSettings) {
        throw new Error("API settings not found");
      }
      
      const { apiUrl, apiKey } = JSON.parse(apiSettings);
      
      // In a production environment, this would call the Pterodactyl API
      // For now, we'll simulate the API call
      console.log(`Sending ${action} action to server ${server.id} via Pterodactyl API`);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update server status
      const newStatus = action === "start" ? "running" : "stopped";
      setServerStatus(newStatus);
      
      toast({
        title: `Server ${action === "start" ? "started" : "stopped"}`,
        description: `Your server "${server.name}" has been ${action === "start" ? "started" : "stopped"} successfully.`,
      });
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
          className={`${statusColors[serverStatus]} text-white`}
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
          disabled={isLoading}
        >
          <Power className="h-4 w-4 mr-2" />
          {isLoading ? "Processing..." : serverStatus === "running" ? "Stop" : "Start"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServerCard;
