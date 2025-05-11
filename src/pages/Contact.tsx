
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-muted py-16">
        <div className="container">
          <h1 className="text-4xl font-bold text-center mb-4">Contact Us</h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Have questions or need help? We're here for you. Reach out to our team.
          </p>
        </div>
      </div>
      
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <p className="text-muted-foreground mb-6">
              Fill out the form and our team will get back to you as soon as possible.
              We typically respond within 24 hours.
            </p>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="first-name" className="text-sm font-medium">
                    First Name
                  </label>
                  <Input id="first-name" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="last-name" className="text-sm font-medium">
                    Last Name
                  </label>
                  <Input id="last-name" placeholder="Doe" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <Input id="email" type="email" placeholder="johndoe@example.com" required />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input id="subject" placeholder="How can we help you?" required />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Please describe your issue or question..."
                  rows={5}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6">Support Information</h2>
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sales Inquiries</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">
                    For questions about our services, pricing, or custom plans.
                  </p>
                  <p className="font-medium">sales@nextgenhosting.net</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Technical Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">
                    For help with existing services or technical issues.
                  </p>
                  <p className="font-medium">support@nextgenhosting.net</p>
                  <p className="mt-2 text-sm">
                    Response time: &lt;12 hours (standard) / &lt;4 hours (premium)
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Billing Department</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">
                    For payment issues, invoices, or account questions.
                  </p>
                  <p className="font-medium">billing@nextgenhosting.net</p>
                </CardContent>
              </Card>
              
              <div className="bg-muted p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Live Chat Support</h3>
                <p className="text-muted-foreground mb-4">
                  Our live chat support is available during business hours.
                </p>
                <p className="text-sm text-muted-foreground">
                  Hours: Monday-Friday, 9AM-9PM ET | Saturday-Sunday, 10AM-6PM ET
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
