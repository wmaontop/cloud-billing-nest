
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plan } from "@/lib/types";

interface PricingTableProps {
  plans: Plan[];
}

const PricingTable = ({ plans }: PricingTableProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {plans.map((plan) => (
        <Card 
          key={plan.id} 
          className={`flex flex-col card-hover ${
            plan.name === "Standard" ? "border-primary shadow-md" : ""
          }`}
        >
          <CardHeader>
            <CardTitle className="text-xl">{plan.name}</CardTitle>
            <div className="mt-2">
              <span className="text-3xl font-bold">${plan.price}</span>
              <span className="text-muted-foreground">/{plan.cycle}</span>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="grid gap-4">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>{plan.cpu} vCPU Cores</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>{plan.ram} GB RAM</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>{plan.disk} GB SSD Storage</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>{plan.bandwidth} TB Bandwidth</span>
              </div>
              <div className="border-t my-2"></div>
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Link to={`/register?plan=${plan.id}`} className="w-full">
              <Button
                className="w-full"
                variant={plan.name === "Standard" ? "default" : "outline"}
              >
                Get Started
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PricingTable;
