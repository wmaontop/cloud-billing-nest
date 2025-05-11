
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Invoice, Plan, Transaction } from "@/lib/types";
import { CreditCard, Calendar, AlertCircle } from "lucide-react";

const Billing = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");

  // Mock data
  const currentPlan: Plan = {
    id: "standard",
    name: "Standard",
    price: 12.99,
    cycle: "monthly",
    cpu: 2,
    ram: 4,
    disk: 50,
    bandwidth: 2,
    features: [
      "All Starter Features",
      "Multiple Game Servers",
      "DDoS Protection",
      "Modpack Installation",
      "Priority Support"
    ],
  };
  
  const availablePlans: Plan[] = [
    {
      id: "starter",
      name: "Starter",
      price: 5.99,
      cycle: "monthly",
      cpu: 1,
      ram: 2,
      disk: 20,
      bandwidth: 1,
      features: [
        "Minecraft Server",
        "24/7 Support",
        "99.9% Uptime",
        "Automated Backups"
      ],
    },
    {
      id: "standard",
      name: "Standard",
      price: 12.99,
      cycle: "monthly",
      cpu: 2,
      ram: 4,
      disk: 50,
      bandwidth: 2,
      features: [
        "All Starter Features",
        "Multiple Game Servers",
        "DDoS Protection",
        "Modpack Installation",
        "Priority Support"
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: 24.99,
      cycle: "monthly",
      cpu: 4,
      ram: 8,
      disk: 100,
      bandwidth: 5,
      features: [
        "All Standard Features",
        "Dedicated Resources",
        "Custom Domain",
        "Database Access",
        "API Access",
        "24/7 Phone Support"
      ],
    },
  ];

  const invoices: Invoice[] = [
    {
      id: "INV-001",
      amount: 12.99,
      status: "paid",
      date: "2023-05-01",
      dueDate: "2023-05-15",
      items: [
        { name: "Standard Plan (Monthly)", quantity: 1, price: 12.99 }
      ]
    },
    {
      id: "INV-002",
      amount: 12.99,
      status: "paid",
      date: "2023-04-01",
      dueDate: "2023-04-15",
      items: [
        { name: "Standard Plan (Monthly)", quantity: 1, price: 12.99 }
      ]
    },
    {
      id: "INV-003",
      amount: 12.99,
      status: "paid",
      date: "2023-03-01",
      dueDate: "2023-03-15",
      items: [
        { name: "Standard Plan (Monthly)", quantity: 1, price: 12.99 }
      ]
    }
  ];

  const transactions: Transaction[] = [
    {
      id: "TXN-001",
      amount: 12.99,
      status: "completed",
      date: "2023-05-01",
      method: "Credit Card (**** 1234)",
      description: "Payment for Standard Plan"
    },
    {
      id: "TXN-002",
      amount: 12.99,
      status: "completed",
      date: "2023-04-01",
      method: "Credit Card (**** 1234)",
      description: "Payment for Standard Plan"
    },
    {
      id: "TXN-003",
      amount: 12.99,
      status: "completed",
      date: "2023-03-01",
      method: "Credit Card (**** 1234)",
      description: "Payment for Standard Plan"
    }
  ];

  const handleUpdatePaymentMethod = (e: React.FormEvent) => {
    e.preventDefault();
    // This would connect to a payment processor in a real app
    console.log("Updating payment method:", {
      cardNumber,
      cardName,
      expiry: `${expiryMonth}/${expiryYear}`,
      cvv
    });
    // Show success message
  };

  const handlePlanChange = (planId: string) => {
    console.log(`Changing to plan: ${planId}`);
    // This would update the subscription in a real app
  };

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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold">Billing & Payments</h1>
          <Button variant="outline">
            <CreditCard className="h-4 w-4 mr-2" />
            Add Credit
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Current Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <span className="text-2xl font-bold">$0.00</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Billing Cycle
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-primary mr-2" />
                <span className="text-2xl font-bold">Monthly</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Next Payment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 text-primary mr-2" />
                <span className="text-2xl font-bold">${currentPlan.price}</span>
                <span className="text-muted-foreground text-sm ml-2">Due {formatDate("2023-06-01")}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="subscription" className="w-full">
          <TabsList>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="subscription" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>
                  Manage your subscription plan and billing cycle
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 border rounded-lg bg-muted/50">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-bold">{currentPlan.name} Plan</p>
                      <p className="text-muted-foreground">${currentPlan.price}/{currentPlan.cycle}</p>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      Active
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <p className="font-medium mb-2">Plan Features:</p>
                    <ul className="space-y-2">
                      {currentPlan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <svg
                            className="h-4 w-4 text-primary mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Change Plan</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {availablePlans.map((plan) => (
                      <Card key={plan.id} className={currentPlan.id === plan.id ? "border-primary" : ""}>
                        <CardHeader>
                          <CardTitle>{plan.name}</CardTitle>
                          <p className="text-2xl font-bold">${plan.price}<span className="text-sm font-normal text-muted-foreground">/{plan.cycle}</span></p>
                        </CardHeader>
                        <CardContent className="text-sm">
                          <ul className="space-y-2">
                            <li>{plan.cpu} vCPU</li>
                            <li>{plan.ram} GB RAM</li>
                            <li>{plan.disk} GB Storage</li>
                            <li>{plan.bandwidth} TB Bandwidth</li>
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button
                            variant={currentPlan.id === plan.id ? "outline" : "default"}
                            className="w-full"
                            onClick={() => handlePlanChange(plan.id)}
                            disabled={currentPlan.id === plan.id}
                          >
                            {currentPlan.id === plan.id ? "Current Plan" : "Select Plan"}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8 p-4 border rounded-lg flex items-center bg-amber-50">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                  <p className="text-sm">
                    Changing your plan will take effect immediately. You may be charged or credited for the difference in price.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payment-methods" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Add or update your payment methods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 border rounded-lg bg-muted/50 mb-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <p className="font-medium">Visa ending in 1234</p>
                        <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      Default
                    </div>
                  </div>
                </div>
                
                <form onSubmit={handleUpdatePaymentMethod} className="space-y-4">
                  <h3 className="text-lg font-medium">Add New Payment Method</h3>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="card-name">Name on Card</Label>
                      <Input
                        id="card-name"
                        placeholder="John Doe"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry-month">Expiry Month</Label>
                        <Select
                          value={expiryMonth}
                          onValueChange={setExpiryMonth}
                        >
                          <SelectTrigger id="expiry-month">
                            <SelectValue placeholder="MM" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => {
                              const month = i + 1;
                              return (
                                <SelectItem 
                                  key={month} 
                                  value={month.toString().padStart(2, '0')}
                                >
                                  {month.toString().padStart(2, '0')}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="expiry-year">Expiry Year</Label>
                        <Select
                          value={expiryYear}
                          onValueChange={setExpiryYear}
                        >
                          <SelectTrigger id="expiry-year">
                            <SelectValue placeholder="YY" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 10 }, (_, i) => {
                              const year = new Date().getFullYear() + i;
                              return (
                                <SelectItem 
                                  key={year} 
                                  value={year.toString().slice(-2)}
                                >
                                  {year}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Button type="submit" className="mt-4">
                    Add Payment Method
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="invoices" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Invoices</CardTitle>
                <CardDescription>
                  View and download your invoices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Invoice</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-background divide-y divide-border">
                      {invoices.map((invoice) => (
                        <tr key={invoice.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {invoice.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                            {formatDate(invoice.date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            ${invoice.amount.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                invoice.status === "paid"
                                  ? "bg-green-100 text-green-800"
                                  : invoice.status === "unpaid"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                            <Button variant="ghost" size="sm">
                              Download
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="transactions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>
                  View your payment transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Method</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-background divide-y divide-border">
                      {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {transaction.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                            {formatDate(transaction.date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {transaction.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                            {transaction.method}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            ${transaction.amount.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                transaction.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : transaction.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
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

export default Billing;
