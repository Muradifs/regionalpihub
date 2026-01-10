// app/privacy/page.tsx
export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="space-y-6 text-gray-600 dark:text-gray-300">
        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">1. Introduction</h2>
          <p>Welcome to Regional Pi Hub. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our application via the Pi Browser.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">2. Data We Collect</h2>
          <p>We collect and process the following data:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Pi Network Info:</strong> Your Pi username and unique user ID (UID) provided securely through the Pi SDK authentication process.</li>
            <li><strong>Location Data:</strong> With your explicit permission, we collect your approximate location to connect you with your regional community.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">3. How We Use Your Data</h2>
          <p>We use your data to:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Authenticate you as a verified Pi Network user.</li>
            <li>Display relevant content based on your region (e.g., Balkan region content).</li>
            <li>Facilitate community interactions within the hub.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">4. Data Security</h2>
          <p>We implement appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">5. Contact Us</h2>
          <p>If you have any questions about this privacy policy, please contact us through the community channels.</p>
        </section>
      </div>
    </div>
  )
}