'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAuthState, clearAuthState } from '@/lib/auth'
import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    const auth = getAuthState()
    if (!auth?.isAuthenticated) {
      router.push('/auth/signin')
    } else {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const handleLogout = () => {
    clearAuthState()
    router.push('/auth/signin')
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onLogout={handleLogout} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Premium Header with Gradient */}
        <header className="sticky top-0 z-40 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-xl">
          <div className="px-4 md:px-8 py-5 flex justify-between items-center">
            {/* Left Side */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden p-2 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-xl font-bold">🏅</div>
                <h1 className="text-2xl font-bold hidden md:block">Athlete ID</h1>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-2 bg-blue-500 bg-opacity-30 px-4 py-2 rounded-lg">
                <span className="text-sm font-semibold">🎯 Seller Mode</span>
              </div>
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold">My Brand</p>
                <p className="text-xs opacity-80 text-blue-100">Premium Seller</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-medium transition-all hover:shadow-lg text-sm flex items-center gap-2"
              >
                <span>🚪</span>
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>

          {/* Breadcrumb/Status Bar */}
          <div className="border-t border-blue-500 border-opacity-30 px-4 md:px-8 py-2 bg-blue-600 bg-opacity-50">
            <p className="text-xs text-blue-100">📊 Dashboard · Manage Products & Orders · Real-time Analytics</p>
          </div>
        </header>

        {/* Main Content Area with Gradient Background */}
        <main className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
