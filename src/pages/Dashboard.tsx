
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServerCard from "@/components/ServerCard";
import { Server, Invoice, Transaction } from "@/lib/types";
import { CreditCard, Server as ServerIcon, Plus, Database, Activity, RefreshCw } from "lucide-react";
import { getServers, syncServersFromPanel } from "@/lib/pterodactyl-api";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const [servers, setServers] = useState<Server[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();

  // Fetch servers on component mount and set up a refresh interval
  useEffect(() => {
    fetchServers(true);

    // Refresh servers every 30 seconds
    const interval = setInterval(() => {
      fetchServers(false);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const syncAllServers = async () => {
    setIsSyncing(true);
    try {
      const success = await syncServersFromPanel();
      if (success) {
        toast({
          title: "Server Synchronization Complete",
          description: "All servers have been synchronized with your Pterodactyl panel.",
        });
        await fetchServers(false);
      } else {
        throw new Error("Failed to sync servers");
      }
    } catch (error) {
      console.error("Error syncing servers:", error);
      toast({
        title: "Synchronization Failed",
        description: "Failed to sync servers with your panel. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const fetchServers = async (showLoading: boolean = true) => {
    if (showLoading) setIsLoading(true);
    try {
      const fetchedServers = await getServers();
      setServers(fetchedServers);
    } catch (error) {
      console.error("Error fetching servers:", error);
      if (showLoading) {
        toast({
          title: "Error",
          description: "Failed to load servers. Please try again.",
          variant: "destructive"
        });
      }
    } finally {
      if (showLoading) setIsLoading(false);
    }
  };

  const invoices: Invoice[] = [
    {
      id: "inv1",
      amount: 12.99,
      status: "paid",
      date: "2023-05-01",
      dueDate: "2023-05-15",
      items: [
        { name: "Standard Plan", quantity: 1, price: 12.99 }
      ]
    },
    {
      id: "inv2",
      amount: 12.99,
      status: "paid",
      date: "2023-04-01",
      dueDate: "2023-04-15",
      items: [
        { name: "Standard Plan", quantity: 1, price: 12.99 }
      ]
    }
  ];

  const transactions: Transaction[] = [
    {
      id: "trans1",
      amount: 12.99,
      status: "completed",
      date: "2023-05-01",
      method: "Credit Card",
      description: "Payment for Standard Plan"
    },
    {
      id: "trans2",
      amount: 12.99,
      status: "completed",
      date: "2023-04-01",
      method: "Credit Card",
      description: "Payment for Standard Plan"
    }
  ];

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Servers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <ServerIcon className="h-5 w-5 text-primary mr-2" />
                <span className="text-2xl font-bold">{servers.filter(s => s.status === "running").length}</span>
                <span className="text-muted-foreground text-sm ml-2">/ {servers.length} total</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Current Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Database className="h-5 w-5 text-primary mr-2" />
                <span className="text-2xl font-bold">Standard</span>
                <Link to="/billing" className="ml-auto">
                  <Button variant="outline" size="sm">Upgrade</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Next Invoice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 text-primary mr-2" />
                <span className="text-2xl font-bold">$12.99</span>
                <span className="text-muted-foreground text-sm ml-2">Due {formatDate("2023-06-01")}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="servers" className="w-full">
          <TabsList>
            <TabsTrigger value="servers">Servers</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="servers" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Servers</h2>
              <div className="flex gap-4">
                <Button variant="outline" onClick={syncAllServers} disabled={isSyncing}>
                  <RefreshCw className={`h-4 w-4 mr-2 ${isSyncing ? "animate-spin" : ""}`} />
                  {isSyncing ? "Syncing from Panel..." : "Sync from Panel"}
                </Button>
                <Button variant="outline" onClick={() => fetchServers(true)} disabled={isLoading}>
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                  {isLoading ? "Refreshing..." : "Refresh"}
                </Button>
                <Link to="/servers/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Server
                  </Button>
                </Link>
              </div>
            </div>
            
            {servers.length === 0 && !isLoading ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-muted-foreground mb-4">You don't have any servers yet</p>
                  <Link to="/servers/new">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Server
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isLoading ? (
                  <Card>
                    <CardContent className="pt-6 flex justify-center">
                      <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                    </CardContent>
                  </Card>
                ) : (
                  servers.map((server) => (
                    <ServerCard key={server.id} server={server} refreshServers={() => fetchServers(false)} />
                  ))
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="billing" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Billing & Invoices</h2>
              <Link to="/billing">
                <Button variant="outline">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Manage Billing
                </Button>
              </Link>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Invoices</CardTitle>
                  <CardDescription>
                    View your recent invoices and payment history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {invoices.map((invoice) => (
                      <div
                        key={invoice.id}
                        className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div>
                          <p className="font-medium">Invoice #{invoice.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(invoice.date)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${invoice.amount.toFixed(2)}</p>
                          <p
                            className={`text-sm ${
                              invoice.status === "paid"
                                ? "text-green-500"
                                : "text-amber-500"
                            }`}
                          >
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="activity" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Activity Log</h2>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your recent account activity and transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center">
                        <Activity className="h-5 w-5 text-primary mr-3" />
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(transaction.date)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${transaction.amount.toFixed(2)}</p>
                        <p
                          className={`text-sm ${
                            transaction.status === "completed"
                              ? "text-green-500"
                              : transaction.status === "pending"
                              ? "text-amber-500"
                              : "text-destructive"
                          }`}
                        >
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </p>
                      </div>
                    </div>
                  ))}
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

export default Dashboard;
