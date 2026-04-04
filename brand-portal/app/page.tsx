'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { isAuthenticated } from '@/lib/auth'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/dashboard')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">Athlete ID</div>
          <div className="flex gap-3">
            <Link
              href="/auth/signin"
              className="px-6 py-2 text-gray-700 font-medium hover:text-blue-600 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/auth/request"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Request Access
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Sell Your Sports Products to Millions of Athletes
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join the Athlete ID Brand Portal. Get approved, list your products, and start reaching passionate athletes worldwide. Manage orders, track shipments, and grow your business.
            </p>
            <div className="flex gap-4">
              <Link
                href="/auth/request"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl inline-block"
              >
                Get Started Free
              </Link>
              <Link
                href="#features"
                className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors inline-block"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl h-96 flex items-center justify-center text-white text-6xl">
            🏅
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Brand Portal</h2>
            <p className="text-xl text-gray-600">Everything you need to manage and grow your sports brand</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '⚡',
                title: 'Quick Approval',
                description: 'Submit your brand details and get approved quickly. Receive your unique sign-in code via email.',
                color: 'from-blue-500 to-blue-600',
              },
              {
                icon: '📦',
                title: 'Manage Products',
                description: 'Add unlimited products with images, descriptions, pricing, and categories. Edit or delete anytime.',
                color: 'from-purple-500 to-purple-600',
              },
              {
                icon: '📊',
                title: 'Track Orders',
                description: 'Monitor incoming orders in real-time. Update delivery status and manage customer relationships.',
                color: 'from-green-500 to-green-600',
              },
              {
                icon: '🖼️',
                title: 'Image Upload',
                description: 'Upload product images directly from your computer. Integrated with Cloudinary for fast delivery.',
                color: 'from-pink-500 to-pink-600',
              },
              {
                icon: '🔒',
                title: 'Secure Access',
                description: 'Email and code-based sign-in keeps your account secure. No passwords to remember.',
                color: 'from-indigo-500 to-indigo-600',
              },
              {
                icon: '📈',
                title: 'Analytics Ready',
                description: 'Track sales, orders, and performance metrics. Get insights to grow your business.',
                color: 'from-orange-500 to-orange-600',
              },
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg hover:shadow-xl p-8 transition-all">
                <div className={`inline-block w-16 h-16 rounded-lg bg-gradient-to-br ${feature.color} text-white text-3xl flex items-center justify-center mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600">Get started in 4 simple steps</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            { num: '1', title: 'Request', desc: 'Submit your brand details' },
            { num: '2', title: 'Approve', desc: 'Admin reviews and approves' },
            { num: '3', title: 'Sign In', desc: 'Use email + code to access' },
            { num: '4', title: 'Sell', desc: 'Add products and manage orders' },
          ].map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white font-bold text-2xl flex items-center justify-center mx-auto mb-4">
                {step.num}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Grow Your Brand?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of brands selling on Athlete ID. Get started in minutes.
          </p>
          <Link
            href="/auth/request"
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
          >
            Request Brand Access
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>&copy; 2026 Athlete ID. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
