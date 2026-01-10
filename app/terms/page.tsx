// app/terms/page.tsx
export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      
      <div className="space-y-6 text-gray-600 dark:text-gray-300">
        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">1. Agreement to Terms</h2>
          <p>By accessing Regional Pi Hub through the Pi Browser, you agree to be bound by these Terms of Service and comply with all applicable Pi Network policies.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">2. User Conduct</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Use the application for any illegal purpose.</li>
            <li>Harass, abuse, or harm other community members.</li>
            <li>Attempt to manipulate the voting or proposal systems.</li>
            <li>Post false or misleading information.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">3. Pi Network Compliance</h2>
          <p>This application is built on the Pi Network platform. You acknowledge that your use of the application is also subject to the Pi Network Terms of Service and Developer Terms.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">4. Disclaimer</h2>
          <p>The application is provided "as is". We make no warranties, expressed or implied, regarding the operation of the services or the information available through them.</p>
        </section>
      </div>
    </div>
  )
}