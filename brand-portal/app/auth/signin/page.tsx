'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getBrandByEmail, type Brand } from '@/lib/db'
import { setAuthState } from '@/lib/auth'

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: '',
    signInCode: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001'}/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          code: formData.signInCode,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Sign in failed')
      }

      const data = await response.json()
      
      setAuthState({
        brandId: data.brandId,
        brandName: data.brandName,
        email: data.email,
        isAuthenticated: true,
      })
      
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed')
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
              href="/auth/request"
              className="px-6 py-2 text-gray-700 font-medium hover:text-blue-600 transition-colors"
            >
              Request Access
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

      {/* Sign In Form */}
      <div className="max-w-md mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to your brand account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-red-700 font-medium">
                ⚠️ {error}
              </div>
            )}

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
                Sign-In Code *
              </label>
              <input
                type="text"
                name="signInCode"
                value={formData.signInCode}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition font-mono text-lg tracking-widest"
                placeholder="XXXX-XXXX-XXXX"
              />
              <p className="text-xs text-gray-500 mt-2">Check your email for the code sent by our admin team</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-lg"
            >
              {loading ? '⏳ Signing in...' : '🔓 Sign In'}
            </button>
          </form>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <p className="text-center text-gray-600 text-sm">
              Don't have an account?{' '}
              <Link href="/auth/request" className="text-blue-600 font-semibold hover:underline">
                Request access
              </Link>
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 text-sm text-blue-900">
          <p className="font-semibold mb-3">🔒 Secure Sign-In</p>
          <ul className="space-y-2 ml-4 mb-4">
            <li>✓ No password needed</li>
            <li>✓ Email + code authentication</li>
            <li>✓ Codes expire after 24 hours</li>
          </ul>
          
          <hr className="my-4 border-blue-200" />
          
          <p className="font-semibold mb-2">📝 Demo Credentials (For Testing)</p>
          <div className="bg-white rounded p-3 font-mono text-xs space-y-1 mb-2">
            <div><span className="text-gray-600">Email:</span> <span className="font-bold text-blue-700">demo@athleteid.com</span></div>
            <div><span className="text-gray-600">Code:</span> <span className="font-bold text-blue-700">demo123</span></div>
          </div>
          <p className="text-xs text-blue-700">👆 Copy & paste to test the dashboard</p>
        </div>
      </div>
    </div>
  )
}
