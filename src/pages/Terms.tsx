
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />
      <div className="container py-12 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <div className="space-y-6 text-gray-300">
          <p>
            Welcome to NextGen Hosting. By using our services, you agree to comply with and be bound by the following terms and conditions.
          </p>
          <h2 className="text-xl font-semibold text-white mt-6">1. Service Agreement</h2>
          <p>
            NextGen Hosting provides game server hosting, VPS hosting, and web hosting services. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time.
          </p>
          <h2 className="text-xl font-semibold text-white mt-6">2. Account Responsibilities</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
          </p>
          <h2 className="text-xl font-semibold text-white mt-6">3. Acceptable Use</h2>
          <p>
            You agree not to use our services for any illegal purposes or in any manner that could damage, disable, overburden, or impair our servers or networks.
          </p>
          <h2 className="text-xl font-semibold text-white mt-6">4. Payment and Billing</h2>
          <p>
            Payment is due in advance for all services. If payment is not received by the due date, we reserve the right to suspend or terminate your services.
          </p>
          <h2 className="text-xl font-semibold text-white mt-6">5. Refunds</h2>
          <p>
            Refunds are handled according to our Refund Policy, which is incorporated by reference into these Terms of Service.
          </p>
          <h2 className="text-xl font-semibold text-white mt-6">6. Limitation of Liability</h2>
          <p>
            NextGen Hosting shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.
          </p>
          <h2 className="text-xl font-semibold text-white mt-6">7. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. It is your responsibility to check these terms periodically for changes.
          </p>
          <h2 className="text-xl font-semibold text-white mt-6">8. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at support@nextgenhosting.net.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
