'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { submitBrandRequest } from '@/lib/db'

export default function RequestPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    business_type: '',
    description: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await submitBrandRequest(formData)
      setSuccess(true)
      setTimeout(() => {
        router.push('/auth/signin')
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit request')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">Athlete ID</Link>
          <div className="flex gap-3">
            <Link
              href="/auth/signin"
              className="px-6 py-2 text-gray-700 font-medium hover:text-blue-600 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/"
              className="px-6 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Back
            </Link>
          </div>
        </div>
      </nav>

      {/* Form Container */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Brand Approval Request</h1>
            <p className="text-lg text-gray-600">Join the Athlete ID platform and start selling to athletes worldwide</p>
          </div>

          {success ? (
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
              <div className="text-5xl mb-4">✓</div>
              <p className="text-green-900 font-bold text-lg mb-2">Request submitted successfully!</p>
              <p className="text-green-700 mb-4">We'll review your application and send you a sign-in code via email.</p>
              <p className="text-green-600 text-sm">Redirecting to sign in...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-red-700 font-medium">
                  ⚠️ {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Brand Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Your brand name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="contact@brand.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Business Type *
                </label>
                <select
                  name="business_type"
                  value={formData.business_type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  <option value="">Select a category</option>
                  <option value="sports_apparel">Sports Apparel</option>
                  <option value="equipment">Equipment</option>
                  <option value="footwear">Footwear</option>
                  <option value="accessories">Accessories</option>
                  <option value="nutrition">Nutrition</option>
                  <option value="technology">Technology</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Brand Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                  placeholder="Tell us about your brand, products, and why athletes would love your products..."
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
                <p className="font-semibold mb-2">📋 What happens next:</p>
                <ul className="space-y-1 ml-4">
                  <li>✓ We review your application within 24 hours</li>
                  <li>✓ You receive a unique sign-in code via email</li>
                  <li>✓ Sign in and start adding your products</li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-lg"
              >
                {loading ? '⏳ Submitting...' : '📨 Submit Brand Request'}
              </button>

              <p className="text-center text-gray-600 text-sm">
                Already have a code?{' '}
                <Link href="/auth/signin" className="text-blue-600 font-semibold hover:underline">
                  Sign in here
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
