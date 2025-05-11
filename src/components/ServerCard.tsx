
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server } from "@/lib/types";
import { Server as ServerIcon, Power, Settings } from "lucide-react";

interface ServerCardProps {
  server: Server;
}

const ServerCard = ({ server }: ServerCardProps) => {
  const statusColors = {
    running: "bg-green-500",
    stopped: "bg-red-500",
    starting: "bg-yellow-500",
    stopping: "bg-yellow-500",
  };

  return (
    <Card className="card-hover">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <ServerIcon className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">{server.name}</CardTitle>
        </div>
        <Badge
          className={`${statusColors[server.status]} text-white`}
          variant="outline"
        >
          {server.status.charAt(0).toUpperCase() + server.status.slice(1)}
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
          variant={server.status === "running" ? "destructive" : "default"}
          size="sm"
        >
          <Power className="h-4 w-4 mr-2" />
          {server.status === "running" ? "Stop" : "Start"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServerCard;
