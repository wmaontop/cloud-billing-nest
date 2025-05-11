
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />
      <div className="container py-12 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="space-y-6 text-gray-300">
          <p>
            At NextGen Hosting, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.
          </p>
          <h2 className="text-xl font-semibold text-white mt-6">1. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, such as when you create an account, place an order, or contact customer support. This may include your name, email address, billing information, and other contact details.
          </p>
          <h2 className="text-xl font-semibold text-white mt-6">2. How We Use Your Information</h2>
          <p>
            We use your information to provide and improve our services, process payments, communicate with you about your account and our services, and for security purposes.
          </p>
          <h2 className="text-xl font-semibold text-white mt-6">3. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>
          <h2 className="text-xl font-semibold text-white mt-6">4. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our website and to hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>
          <h2 className="text-xl font-semibold text-white mt-6">5. Third-Party Disclosure</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to outside parties unless we provide you with advance notice or are required by law to do so.
          </p>
          <h2 className="text-xl font-semibold text-white mt-6">6. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal information. You can manage most of your account information through your account settings.
          </p>
          <h2 className="text-xl font-semibold text-white mt-6">7. Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </p>
          <h2 className="text-xl font-semibold text-white mt-6">8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@nextgenhosting.net.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
