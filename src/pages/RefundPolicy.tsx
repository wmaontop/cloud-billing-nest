
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />
      <div className="container py-12 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>
        <div className="space-y-6 text-gray-300">
          <p>
            This Refund Policy outlines the terms and conditions for refunds at NextGen Hosting.
          </p>
          <h2 className="text-xl font-semibold text-white mt-6">1. Eligibility for Refunds</h2>
          <p>
            Refunds are available within 72 hours of your initial purchase if you experience technical issues that our support team cannot resolve. Refunds are not available for domain name registrations, SSL certificates, or dedicated server setups.
          </p>
          <h2 className="text-xl font-semibold text-white mt-6">2. How to Request a Refund</h2>
          <p>
            To request a refund, please contact our support team at support@nextgenhosting.net with your account details and reason for the refund request.
          </p>
          <h2 className="text-xl font-semibold text-white mt-6">3. Processing Time</h2>
          <p>
            Refunds are typically processed within 5-7 business days after approval. The refund will be issued to the original payment method used for the purchase.
          </p>
          <h2 className="text-xl font-semibold text-white mt-6">4. Partial Refunds</h2>
          <p>
            In some cases, we may issue partial refunds for unused service time if you decide to cancel your service after the initial refund period.
          </p>
          <h2 className="text-xl font-semibold text-white mt-6">5. Cancelation vs. Refund</h2>
          <p>
            Canceling your service does not automatically qualify you for a refund. You must specifically request a refund according to the terms outlined in this policy.
          </p>
          <h2 className="text-xl font-semibold text-white mt-6">6. Special Circumstances</h2>
          <p>
            We evaluate refund requests outside of these guidelines on a case-by-case basis. Please contact our support team to discuss your specific situation.
          </p>
          <h2 className="text-xl font-semibold text-white mt-6">7. Changes to This Policy</h2>
          <p>
            We reserve the right to modify this Refund Policy at any time. Changes will be effective immediately upon posting to our website.
          </p>
          <h2 className="text-xl font-semibold text-white mt-6">8. Contact Information</h2>
          <p>
            If you have any questions about our Refund Policy, please contact us at billing@nextgenhosting.net.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RefundPolicy;
