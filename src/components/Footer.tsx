
import { Link } from "react-router-dom";
import { Server } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Server className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold">NextGen Hosting</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Reliable hosting solutions for your game servers and websites. Fast, secure, and
              always available.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Products</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/game-servers"
                  className="text-muted-foreground hover:text-primary"
                >
                  Game Servers
                </Link>
              </li>
              <li>
                <Link
                  to="/web-hosting"
                  className="text-muted-foreground hover:text-primary"
                >
                  Web Hosting
                </Link>
              </li>
              <li>
                <Link
                  to="/vps"
                  className="text-muted-foreground hover:text-primary"
                >
                  VPS Hosting
                </Link>
              </li>
              <li>
                <Link
                  to="/dedicated"
                  className="text-muted-foreground hover:text-primary"
                >
                  Dedicated Servers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-primary"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-muted-foreground hover:text-primary"
                >
                  Blog
                </Link>
              </li>
              <li>
                <a
                  href="https://discord.gg/nextgenhosting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  Discord
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/terms"
                  className="text-muted-foreground hover:text-primary"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-muted-foreground hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/refund"
                  className="text-muted-foreground hover:text-primary"
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/legal"
                  className="text-muted-foreground hover:text-primary"
                >
                  Legal Documents
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NextGen Hosting. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              Twitter
            </a>
            <a
              href="https://discord.gg/nextgenhosting"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              Discord
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
