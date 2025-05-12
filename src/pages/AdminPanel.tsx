
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Server, Shield, Users, Database, Settings, CreditCard, Trash, Edit, RefreshCw } from "lucide-react";
import { getEggs, getServers, createServer, syncServersFromPanel } from "@/lib/pterodactyl-api";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem('ngHostingUsers');
    return storedUsers ? JSON.parse(storedUsers) : [];
  });
  
  const [servers, setServers] = useState([]);
  const [eggs, setEggs] = useState([]);
  const [isLoadingServers, setIsLoadingServers] = useState(false);
  const [isLoadingEggs, setIsLoadingEggs] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  
  // API settings
  const [apiKey, setApiKey] = useState("");
  const [apiUrl, setApiUrl] = useState("");

  // Panel settings
  const [panelName, setPanelName] = useState("NextGen Hosting");
  const [panelUrl, setPanelUrl] = useState("https://panel.nextgenhosting.net");
  const [discordUrl, setDiscordUrl] = useState("https://discord.gg/nextgenhosting");
  
  // Load API settings from localStorage
  useEffect(() => {
    const storedSettings = localStorage.getItem('ngHostingApiSettings');
    
    if (storedSettings) {
      const settings = JSON.parse(storedSettings);
      setApiKey(settings.apiKey || "");
      setApiUrl(settings.apiUrl || "");
    } else {
      // Default values
      setApiKey("ptla_Zmu6YYkofIx0zhZn4BO2WFg7Lvp1X9m1I2lc4rHoOvg");
      setApiUrl("https://gamepanel.nextgenhosting.net");
    }

    // Load panel settings
    const storedPanelSettings = localStorage.getItem('ngHostingPanelSettings');
    if (storedPanelSettings) {
      const settings = JSON.parse(storedPanelSettings);
      setPanelName(settings.panelName || "NextGen Hosting");
      setPanelUrl(settings.panelUrl || "https://panel.nextgenhosting.net");
      setDiscordUrl(settings.discordUrl || "https://discord.gg/nextgenhosting");
    }
  }, []);
  
  // Load servers and eggs when API settings are available
  useEffect(() => {
    if (apiKey && apiUrl) {
      fetchServers();
      fetchEggs();
    }
  }, [apiKey, apiUrl]);
  
  const fetchServers = async () => {
    setIsLoadingServers(true);
    try {
      const serverData = await getServers();
      setServers(serverData);
    } catch (error) {
      console.error("Error fetching servers:", error);
      toast({
        title: "Error fetching servers",
        description: "Please check your API settings and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingServers(false);
    }
  };
  
  const fetchEggs = async () => {
    setIsLoadingEggs(true);
    try {
      const eggData = await getEggs();
      setEggs(eggData);
    } catch (error) {
      console.error("Error fetching eggs:", error);
      toast({
        title: "Error fetching templates",
        description: "Please check your API settings and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingEggs(false);
    }
  };

  const handleSyncFromPanel = async () => {
    setIsSyncing(true);
    try {
      const success = await syncServersFromPanel();
      
      if (success) {
        // Refresh the server list
        const serverData = await getServers();
        setServers(serverData);
        
        toast({
          title: "Servers synchronized",
          description: "All servers have been successfully synchronized from the Pterodactyl panel.",
        });
      } else {
        throw new Error('Failed to sync servers');
      }
    } catch (error) {
      console.error("Error syncing servers:", error);
      toast({
        title: "Sync failed",
        description: "Failed to synchronize servers from the Pterodactyl panel. Please check your API settings and try again.",
        variant: "destructive"
      });
    } finally {
      setIsSyncing(false);
    }
  };
  
  const handleSaveApiSettings = () => {
    localStorage.setItem('ngHostingApiSettings', JSON.stringify({ apiKey, apiUrl }));
    
    toast({
      title: "API settings saved",
      description: "Your NextGen Panel API settings have been saved successfully.",
    });
    
    // Refresh data with new API settings
    fetchServers();
    fetchEggs();
  };

  const handleSavePanelSettings = () => {
    localStorage.setItem('ngHostingPanelSettings', JSON.stringify({ 
      panelName,
      panelUrl,
      discordUrl
    }));
    
    toast({
      title: "Panel settings saved",
      description: "Your NextGen Hosting panel settings have been saved successfully.",
    });
  };

  const handleEditUser = (userId) => {
    // In a real app, this would open a modal for editing
    toast({
      title: "Edit user",
      description: "User editing functionality would open here.",
    });
  };

  const handleDeleteUser = (userId, email) => {
    // Remove user from local state
    const updatedUsers = users.filter(user => user.email !== email);
    setUsers(updatedUsers);
    
    // Update localStorage
    localStorage.setItem('ngHostingUsers', JSON.stringify(updatedUsers));
    
    toast({
      title: "User deleted",
      description: `User ${email} has been deleted successfully.`,
    });
  };

  const handleEditEgg = (eggId) => {
    // In a real app, this would open a modal for editing
    toast({
      title: "Edit template",
      description: "Template editing functionality would open here.",
    });
  };

  const handleEditPricePlan = (plan) => {
    toast({
      title: "Edit pricing plan",
      description: `Editing ${plan} pricing plan.`,
    });
  };

  const handleConfigurePayPal = () => {
    toast({
      title: "Configure PayPal",
      description: "PayPal integration configuration would open here.",
    });
  };

  // Navigate to Custom VPS page
  const goToCustomVPS = () => {
    navigate('/custom-vps');
  };
  
  // Calculate total monthly revenue (simplified calculation)
  const calculateMonthlyRevenue = () => {
    return servers.length * 9.99; // Basic calculation - $9.99 per server
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />
      
      <div className="container py-8 flex-grow">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-gray-400">Welcome back, {user?.firstName} {user?.lastName}</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
              onClick={goToCustomVPS}
            >
              Custom VPS Panel
            </Button>
            <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-md">
              <Shield className="h-5 w-5 text-blue-400" />
              <span className="text-blue-400 font-medium">Administrator</span>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-5 mb-8 bg-gray-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">Users</TabsTrigger>
            <TabsTrigger value="servers" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">Servers</TabsTrigger>
            <TabsTrigger value="billing" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">Billing</TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-gray-800 border-red-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 text-red-400 mr-2" />
                    Users
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage your users
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{users.length}</div>
                  <p className="text-gray-400">Total registered users</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Server className="h-5 w-5 text-blue-400 mr-2" />
                    Servers
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage your servers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{servers.length}</div>
                  <p className="text-gray-400">Active servers</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="mt-2 text-blue-400 border-blue-400 hover:bg-blue-900/20"
                    onClick={handleSyncFromPanel}
                    disabled={isSyncing}
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${isSyncing ? "animate-spin" : ""}`} />
                    {isSyncing ? "Syncing..." : "Sync from Panel"}
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-green-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 text-green-400 mr-2" />
                    Revenue
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Monthly revenue
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${calculateMonthlyRevenue().toFixed(2)}</div>
                  <p className="text-gray-400">This month</p>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-gray-800 border-red-500/20">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription className="text-gray-400">
                  Latest actions on your platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-700 pb-4">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-blue-400 mr-3" />
                      <div>
                        <p className="font-medium">API Integration active</p>
                        <p className="text-sm text-gray-400">
                          NextGen Panel connection established
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">Just now</div>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-700 pb-4">
                    <div className="flex items-center">
                      <Server className="h-5 w-5 text-green-400 mr-3" />
                      <div>
                        <p className="font-medium">Servers synchronized</p>
                        <p className="text-sm text-gray-400">
                          {servers.length} servers loaded from NextGen Panel
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">Just now</div>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-700 pb-4">
                    <div className="flex items-center">
                      <Settings className="h-5 w-5 text-yellow-400 mr-3" />
                      <div>
                        <p className="font-medium">Panel initialized</p>
                        <p className="text-sm text-gray-400">
                          NextGen Hosting panel was set up
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">Recently</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users">
            <Card className="bg-gray-800 border-red-500/20">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your platform users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-gray-700">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {users.length > 0 ? (
                        users.map((user: any, index: number) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {user.firstName} {user.lastName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {user.isAdmin ? 
                                <span className="px-2 py-1 text-xs rounded-full bg-blue-900 text-blue-300">Admin</span> : 
                                <span className="px-2 py-1 text-xs rounded-full bg-gray-700 text-gray-300">User</span>
                              }
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-blue-400 hover:text-blue-300"
                                onClick={() => handleEditUser(index)}
                              >
                                <Edit className="h-4 w-4 mr-1" /> Edit
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-400 hover:text-red-300"
                                onClick={() => handleDeleteUser(index, user.email)}
                              >
                                <Trash className="h-4 w-4 mr-1" /> Delete
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-400">
                            No users found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="servers">
            <Card className="bg-gray-800 border-red-500/20 mb-6">
              <CardHeader>
                <CardTitle>NextGen Panel API Settings</CardTitle>
                <CardDescription className="text-gray-400">
                  Configure your NextGen panel integration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-url" className="text-gray-300">Panel URL</Label>
                    <Input 
                      id="api-url" 
                      value={apiUrl}
                      onChange={(e) => setApiUrl(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="api-key" className="text-gray-300">Admin API Key</Label>
                    <Input 
                      id="api-key" 
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    <p className="text-sm text-gray-400">
                      This key is used to create and manage servers on your NextGen panel.
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <Button 
                      onClick={handleSaveApiSettings}
                      className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500"
                    >
                      Save API Settings
                    </Button>
                    <Button 
                      onClick={handleSyncFromPanel}
                      variant="outline"
                      className="border-blue-500 text-blue-400 hover:bg-blue-900/20"
                      disabled={isSyncing || !apiKey || !apiUrl}
                    >
                      <RefreshCw className={`h-4 w-4 mr-2 ${isSyncing ? "animate-spin" : ""}`} />
                      {isSyncing ? "Syncing Servers..." : "Sync All Servers From Panel"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border-red-500/20 mb-6">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Servers</CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage all synchronized servers
                  </CardDescription>
                </div>
                <Button 
                  onClick={fetchServers}
                  variant="outline" 
                  size="sm"
                  className="text-blue-400 border-blue-400"
                  disabled={isLoadingServers}
                >
                  {isLoadingServers ? "Refreshing..." : "Refresh Servers"}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-gray-700">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">CPU</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">RAM</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Storage</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">IP</th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {servers.length > 0 ? (
                        servers.map((server: any, index: number) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {server.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                server.status === "running" 
                                  ? "bg-green-900/50 text-green-300" 
                                  : server.status === "starting" || server.status === "stopping"
                                    ? "bg-yellow-900/50 text-yellow-300"
                                    : "bg-red-900/50 text-red-300"
                              }`}>
                                {server.status.charAt(0).toUpperCase() + server.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{server.cpu} vCores</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{server.ram} GB</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{server.disk} GB</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{server.ip}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-400">
                            {isLoadingServers ? "Loading servers..." : "No servers found"}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border-red-500/20">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Server Templates</CardTitle>
                  <CardDescription className="text-gray-400">
                    Configure game server templates
                  </CardDescription>
                </div>
                <Button 
                  onClick={fetchEggs}
                  variant="outline" 
                  size="sm"
                  className="text-blue-400 border-blue-400"
                  disabled={isLoadingEggs}
                >
                  {isLoadingEggs ? "Syncing..." : "Sync Templates"}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-gray-700">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Game</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Egg</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nest</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {eggs.length > 0 ? (
                        eggs.map((egg: any, index: number) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {egg.name.split(' ')[0]}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {egg.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              Nest #{egg.nest}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-blue-400 hover:text-blue-300"
                                onClick={() => handleEditEgg(egg.id)}
                              >
                                <Edit className="h-4 w-4 mr-1" /> Edit
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-400">
                            {isLoadingEggs ? "Loading templates..." : "No templates found"}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing">
            <Card className="bg-gray-800 border-red-500/20">
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
                <CardDescription className="text-gray-400">
                  Configure payment methods and pricing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border border-gray-700 rounded-md">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-md bg-blue-900 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013 1.787-.026 3.015-.524 4.769 1.289-1.02 1.553-2.7 1.131-4.228z"/>
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium">PayPal</h3>
                        <p className="text-sm text-gray-400">Enable PayPal payments</p>
                      </div>
                    </div>
                    <Button 
                      onClick={handleConfigurePayPal}
                      className="bg-blue-600 hover:bg-blue-500"
                    >
                      Configure
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Game Server Pricing</h3>
                    <div className="rounded-md border border-gray-700">
                      <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Plan</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">CPU</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">RAM</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Storage</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-700">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              Starter
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">1 Core</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">2 GB</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">20 GB</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">$5.99/mo</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-blue-400 hover:text-blue-300"
                                onClick={() => handleEditPricePlan('Starter')}
                              >
                                <Edit className="h-4 w-4 mr-1" /> Edit
                              </Button>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              Standard
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">2 Cores</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">4 GB</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">50 GB</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">$12.99/mo</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-blue-400 hover:text-blue-300"
                                onClick={() => handleEditPricePlan('Standard')}
                              >
                                <Edit className="h-4 w-4 mr-1" /> Edit
                              </Button>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              Premium
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">4 Cores</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">8 GB</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">100 GB</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">$24.99/mo</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-blue-400 hover:text-blue-300"
                                onClick={() => handleEditPricePlan('Premium')}
                              >
                                <Edit className="h-4 w-4 mr-1" /> Edit
                              </Button>
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
          
          <TabsContent value="settings">
            <Card className="bg-gray-800 border-red-500/20">
              <CardHeader>
                <CardTitle>Panel Settings</CardTitle>
                <CardDescription className="text-gray-400">
                  Configure your hosting panel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="panel-name" className="text-gray-300">Panel Name</Label>
                    <Input 
                      id="panel-name" 
                      value={panelName}
                      onChange={(e) => setPanelName(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="panel-url" className="text-gray-300">Panel URL</Label>
                    <Input 
                      id="panel-url" 
                      value={panelUrl}
                      onChange={(e) => setPanelUrl(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="discord-url" className="text-gray-300">Discord URL</Label>
                    <Input 
                      id="discord-url" 
                      value={discordUrl}
                      onChange={(e) => setDiscordUrl(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleSavePanelSettings}
                    className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500"
                  >
                    Save Settings
                  </Button>
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

export default AdminPanel;
