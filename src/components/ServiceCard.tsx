
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
}

const ServiceCard = ({ title, description, icon, href }: ServiceCardProps) => {
  return (
    <Card className="overflow-hidden border-border/40 hover:border-primary/50 transition-all duration-300">
      <CardHeader className="bg-muted/50 pb-8">
        <div className="feature-icon mb-4 mx-auto bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center">
          {icon}
        </div>
        <CardTitle className="text-center text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="text-muted-foreground text-center">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-center pb-6">
        <Link to={href} className="w-full">
          <Button variant="default" className="w-full">
            Learn More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
