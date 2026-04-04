'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getAuthState } from '@/lib/auth'

interface SidebarProps {
  isOpen: boolean
  onLogout: () => void
}

export default function Sidebar({ isOpen, onLogout }: SidebarProps) {
  const pathname = usePathname()
  const auth = getAuthState()

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊', badge: null },
    { href: '/dashboard/products', label: 'Products', icon: '📦', badge: '15' },
    { href: '/dashboard/orders', label: 'Orders', icon: '🛒', badge: '5' },
  ]

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => {
            // Close sidebar on mobile
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static left-0 top-0 h-screen w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white transition-all duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Athlete ID
          </h1>
          <p className="text-gray-400 text-sm mt-1">Brand Portal</p>
          {auth && (
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-3">
                <p className="text-xs text-blue-200">Account</p>
                <p className="text-sm font-semibold text-white truncate mt-1">{auth.brandName}</p>
                <p className="text-xs text-blue-200 truncate">{auth.email}</p>
              </div>
            </div>
          )}
        </div>

        <nav className="p-4 space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2 mb-3">Main Menu</p>
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive(item.href)
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-2.5 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Quick Actions */}
        <div className="px-4 py-4 border-t border-gray-700">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 py-2 mb-3">Quick Actions</p>
          <Link
            href="/dashboard/products/new"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-green-600 to-green-700 text-white font-medium hover:shadow-lg transition-all mb-2"
          >
            <span className="text-xl">➕</span>
            <span>Add Product</span>
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium hover:shadow-lg transition-all"
          >
            <span className="text-xl">📈</span>
            <span>View Analytics</span>
          </Link>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 space-y-2 bg-gradient-to-t from-gray-900 to-transparent">
          <button
            onClick={onLogout}
            className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2 hover:shadow-lg"
          >
            <span>🚪</span>
            <span>Sign Out</span>
          </button>
          <p className="text-xs text-gray-500 text-center pt-2">© 2026 Athlete ID</p>
        </div>
      </aside>
    </>
  )
}
