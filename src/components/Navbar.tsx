
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Server, CreditCard, User as UserIcon, LogOut, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-900 sticky top-0 z-50 w-full border-b border-gray-800">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Server className="h-6 w-6 text-red-500" />
            <span className="text-xl font-semibold text-white">NextGen Hosting</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-red-400 ${
              isActive("/") ? "text-red-500" : "text-gray-300"
            }`}
          >
            Home
          </Link>
          <Link
            to="/pricing"
            className={`text-sm font-medium transition-colors hover:text-red-400 ${
              isActive("/pricing") ? "text-red-500" : "text-gray-300"
            }`}
          >
            Pricing
          </Link>
          <Link
            to="/game-servers"
            className={`text-sm font-medium transition-colors hover:text-red-400 ${
              isActive("/game-servers") ? "text-red-500" : "text-gray-300"
            }`}
          >
            Game Servers
          </Link>
          <Link
            to="/vps"
            className={`text-sm font-medium transition-colors hover:text-red-400 ${
              isActive("/vps") ? "text-red-500" : "text-gray-300"
            }`}
          >
            VPS
          </Link>
          <Link
            to="/web-hosting"
            className={`text-sm font-medium transition-colors hover:text-red-400 ${
              isActive("/web-hosting") ? "text-red-500" : "text-gray-300"
            }`}
          >
            Web Hosting
          </Link>
          <Link
            to="/about"
            className={`text-sm font-medium transition-colors hover:text-red-400 ${
              isActive("/about") ? "text-red-500" : "text-gray-300"
            }`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`text-sm font-medium transition-colors hover:text-red-400 ${
              isActive("/contact") ? "text-red-500" : "text-gray-300"
            }`}
          >
            Contact
          </Link>
        </div>

        <div className="hidden md:flex md:items-center md:space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="outline" className="text-white border-red-500 hover:bg-red-500/20">
                  Dashboard
                </Button>
              </Link>
              {isAdmin && (
                <Link to="/admin">
                  <Button size="icon" variant="outline" className="text-white border-blue-500 hover:bg-blue-500/20">
                    <Shield className="h-5 w-5 text-blue-500" />
                  </Button>
                </Link>
              )}
              <Button 
                onClick={handleLogout}
                variant="ghost" 
                size="icon"
                className="text-gray-300 hover:text-white"
              >
                <LogOut className="h-5 w-5" />
              </Button>
              <div className="text-sm text-gray-300">
                {user?.firstName} {user?.lastName}
              </div>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" className="text-white border-red-500 hover:bg-red-500/20">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500">Register</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-300"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-gray-900">
          <div className="container flex flex-col space-y-4 py-4">
            <Link
              to="/"
              className={`text-sm font-medium ${
                isActive("/") ? "text-red-500" : "text-gray-300"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/pricing"
              className={`text-sm font-medium ${
                isActive("/pricing") ? "text-red-500" : "text-gray-300"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="/game-servers"
              className={`text-sm font-medium ${
                isActive("/game-servers") ? "text-red-500" : "text-gray-300"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Game Servers
            </Link>
            <Link
              to="/vps"
              className={`text-sm font-medium ${
                isActive("/vps") ? "text-red-500" : "text-gray-300"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              VPS
            </Link>
            <Link
              to="/web-hosting"
              className={`text-sm font-medium ${
                isActive("/web-hosting") ? "text-red-500" : "text-gray-300"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Web Hosting
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium ${
                isActive("/about") ? "text-red-500" : "text-gray-300"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium ${
                isActive("/contact") ? "text-red-500" : "text-gray-300"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="border-t border-gray-800 pt-4">
              {isAuthenticated ? (
                <div className="flex flex-col space-y-3">
                  <div className="text-sm text-gray-300 mb-2">
                    Logged in as {user?.firstName} {user?.lastName}
                  </div>
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500">
                      Dashboard
                    </Button>
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full text-white border-blue-500 hover:bg-blue-500/20">
                        <Shield className="h-4 w-4 mr-2 text-blue-500" /> Admin Panel
                      </Button>
                    </Link>
                  )}
                  <Button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full text-white border-red-500 hover:bg-red-500/20"
                  >
                    <LogOut className="h-4 w-4 mr-2" /> Log out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link to="/login">
                    <Button
                      variant="outline"
                      className="w-full text-white border-red-500 hover:bg-red-500/20"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button
                      className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
