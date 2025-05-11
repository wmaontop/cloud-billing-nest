
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Legal = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />
      <div className="container py-12 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Legal Documents</h1>
        <div className="space-y-8">
          <p className="text-gray-300">
            At NextGen Hosting, we are committed to transparency and legal compliance. Below you'll find all our legal documents and policies that govern the use of our services.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
              <h2 className="text-xl font-semibold mb-3">Terms of Service</h2>
              <p className="text-gray-300 mb-4">
                Our Terms of Service outline the rules and guidelines for using our hosting services, as well as your rights and responsibilities as a customer.
              </p>
              <Link to="/terms">
                <Button className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500">
                  Read Terms of Service
                </Button>
              </Link>
            </div>
            
            <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
              <h2 className="text-xl font-semibold mb-3">Privacy Policy</h2>
              <p className="text-gray-300 mb-4">
                Our Privacy Policy explains how we collect, use, and protect your personal information when you use our services or visit our website.
              </p>
              <Link to="/privacy">
                <Button className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500">
                  Read Privacy Policy
                </Button>
              </Link>
            </div>
            
            <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
              <h2 className="text-xl font-semibold mb-3">Refund Policy</h2>
              <p className="text-gray-300 mb-4">
                Our Refund Policy outlines the terms and conditions under which you may be eligible for a refund for our services.
              </p>
              <Link to="/refund">
                <Button className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500">
                  Read Refund Policy
                </Button>
              </Link>
            </div>
            
            <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
              <h2 className="text-xl font-semibold mb-3">Acceptable Use Policy</h2>
              <p className="text-gray-300 mb-4">
                Our Acceptable Use Policy defines what activities are permitted on our servers and networks to ensure security and performance for all customers.
              </p>
              <Button className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500">
                Read Acceptable Use Policy
              </Button>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mt-8">
            <h2 className="text-xl font-semibold mb-3">Legal Contacts</h2>
            <p className="text-gray-300">
              If you have any legal questions or concerns about our services or policies, please contact our legal department at legal@nextgenhosting.net.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Legal;
