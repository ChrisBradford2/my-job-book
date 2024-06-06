import { Inter } from "next/font/google";
import Head from "next/head";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Head>
        <title>My Job Book</title>
        <meta name="description" content="Your ultimate tool for managing job applications efficiently." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Hero Section */}
      <section className="bg-blue-600 dark:bg-blue-700 text-white">
        <div className="container mx-auto py-20 text-center px-4">
          <h1 className="text-4xl font-bold mb-4">Welcome to My Job Book</h1>
          <p className="text-lg mb-8">Your ultimate tool for managing job applications efficiently.</p>
          <a href="/dashboard" className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200">
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-4">Track Applications</h3>
            <p>Keep a record of all your job applications and their statuses in one place.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-4">Automated Reminders</h3>
            <p>Never miss a follow-up opportunity with our automated reminders.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-4">Detailed Insights</h3>
            <p>Get insights into your job application process and improve your chances.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gray-200 dark:bg-gray-800 py-16">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8">Join thousands of users who have streamlined their job application process.</p>
          <a href="/register" className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700">
            Sign Up Now
          </a>
        </div>
      </section>
    </div>
  );
}
