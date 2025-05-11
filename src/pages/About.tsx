
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-muted py-16">
        <div className="container">
          <h1 className="text-4xl font-bold text-center mb-4">About NextGen Hosting</h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Premium game server, VPS, and web hosting with top-tier performance.
          </p>
        </div>
      </div>
      
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              NextGen Hosting was founded with a simple mission: to provide high-quality, 
              reliable hosting services at affordable prices. We started as a small team 
              of gaming enthusiasts who were frustrated by the lack of quality hosting 
              options available.
            </p>
            <p className="text-muted-foreground mb-4">
              Since our inception, we've grown to become a leading provider of game server 
              hosting, VPS solutions, and web hosting services. Our team has expanded, but 
              our core values remain the same - delivering exceptional performance, 
              reliability, and customer service.
            </p>
            <p className="text-muted-foreground">
              Today, we serve thousands of customers worldwide, from individual gamers to 
              businesses of all sizes. Our state-of-the-art infrastructure and dedicated 
              support team ensure that our clients receive the best possible service.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              At NextGen Hosting, we're committed to providing top-tier hosting services 
              with exceptional performance and reliability. We believe that quality hosting 
              shouldn't break the bank, which is why we offer competitive pricing without 
              compromising on service.
            </p>
            <p className="text-muted-foreground mb-4">
              We're passionate about technology and constantly strive to innovate and improve 
              our services. Our team works tirelessly to ensure that our infrastructure is 
              always up-to-date with the latest advancements in the industry.
            </p>
            <p className="text-muted-foreground">
              Customer satisfaction is at the heart of everything we do. We take pride in 
              offering responsive, helpful support and building long-lasting relationships 
              with our clients. Whether you're a gamer, a blogger, or a business owner, 
              we're here to help you succeed online.
            </p>
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Why Choose NextGen Hosting?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">High Performance</h3>
              <p className="text-muted-foreground">
                Our servers are powered by the latest hardware and optimized for maximum performance.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">99.9% Uptime</h3>
              <p className="text-muted-foreground">
                We guarantee reliable service with minimal downtime, backed by our SLA.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">
                Our knowledgeable support team is available around the clock to assist you.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Pterodactyl Panel</h3>
              <p className="text-muted-foreground">
                Easy-to-use control panel for managing your game servers with just a few clicks.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">DDoS Protection</h3>
              <p className="text-muted-foreground">
                Enterprise-grade protection to keep your services safe from attacks.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Competitive Pricing</h3>
              <p className="text-muted-foreground">
                Quality hosting at affordable prices, with no hidden fees or surprises.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
