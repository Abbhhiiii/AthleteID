'use client'

import { useEffect, useState } from 'react'
import { getAuthState } from '@/lib/auth'
import Link from 'next/link'
import { dummyProducts, dummyOrders, dummyAnalytics, categories } from '@/lib/dummyData'

interface Product {
  id: number
  name: string
  brand: string
  price: number
  image: string
  category: string
  description: string
  rating: number
  reviews: number
}

interface Order {
  id: string
  customer: string
  product: string
  amount: number
  status: string
  date: string
}

export default function DashboardPage() {
  const auth = getAuthState()
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setProducts(dummyProducts)
      setOrders(dummyOrders)
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const stats = [
    {
      label: 'Total Products',
      value: dummyAnalytics.totalProducts,
      icon: '📦',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Total Orders',
      value: dummyAnalytics.totalOrders,
      icon: '🛒',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Total Revenue',
      value: `₹${(dummyAnalytics.totalRevenue / 100000).toFixed(1)}L`,
      icon: '💰',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      label: 'Avg Order Value',
      value: `₹${dummyAnalytics.averageOrderValue}`,
      icon: '📊',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
    },
  ]

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Section */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome back! 👋
        </h1>
        <p className="text-gray-600 mt-2 text-lg">Here&apos;s a summary of your brand performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className={`${stat.bgColor} rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`text-3xl bg-gradient-to-br ${stat.color} text-white rounded-lg p-3`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Products Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold">📦 Your Products</h2>
            <Link
              href="/dashboard/products/new"
              className="px-4 py-2 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              + Add
            </Link>
          </div>
          <div className="p-6">
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {products.slice(0, 8).map((product) => (
                <div key={product.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{product.name}</p>
                    <p className="text-sm text-gray-600">₹{product.price.toLocaleString()}</p>
                  </div>
                  <Link
                    href={`/dashboard/products/${product.id}/edit`}
                    className="ml-4 text-blue-600 hover:text-blue-700 font-medium text-sm whitespace-nowrap"
                  >
                    Edit →
                  </Link>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link
                href="/dashboard/products"
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                View All {dummyProducts.length} Products →
              </Link>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold">🛒 Recent Orders</h2>
            <span className="bg-white text-green-600 px-3 py-1 rounded-full font-bold">
              {orders.length}
            </span>
          </div>
          <div className="p-6">
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {orders.map((order) => (
                <div key={order.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{order.customer}</p>
                    <p className="text-sm text-gray-600">{order.id}</p>
                  </div>
                  <div className="ml-4 text-right">
                    <span className={`block px-3 py-1 rounded-full font-semibold text-xs ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'Shipped'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                    <p className="text-sm font-bold text-gray-900 mt-1">₹{order.amount.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Analytics & Performance */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-6 py-4">
          <h2 className="text-2xl font-bold">📈 Performance Metrics</h2>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
              <p className="text-gray-600 text-sm">Top Product</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{dummyAnalytics.topProduct}</p>
              <p className="text-xs text-gray-600 mt-2">Best performing item</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
              <p className="text-gray-600 text-sm">Top Category</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{dummyAnalytics.topCategory}</p>
              <p className="text-xs text-gray-600 mt-2">Most sales</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
              <p className="text-gray-600 text-sm">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{dummyAnalytics.conversionRate}%</p>
              <p className="text-xs text-gray-600 mt-2">Store conversion</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid md:grid-cols-4 gap-4">
        <Link href="/dashboard/products" className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-all hover:scale-105">
          <div className="text-3xl mb-2">📦</div>
          <h3 className="font-bold text-gray-900">Products</h3>
          <p className="text-sm text-gray-600 mt-1">{products.length} products</p>
        </Link>
        <Link href="/dashboard/orders" className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-all hover:scale-105">
          <div className="text-3xl mb-2">🛒</div>
          <h3 className="font-bold text-gray-900">Orders</h3>
          <p className="text-sm text-gray-600 mt-1">{orders.length} orders</p>
        </Link>
        <Link href="/dashboard/products/new" className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-all hover:scale-105">
          <div className="text-3xl mb-2">➕</div>
          <h3 className="font-bold text-gray-900">Add Product</h3>
          <p className="text-sm text-gray-600 mt-1">Create new item</p>
        </Link>
        <Link href="/dashboard" className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-all hover:scale-105">
          <div className="text-3xl mb-2">⚙️</div>
          <h3 className="font-bold text-gray-900">Settings</h3>
          <p className="text-sm text-gray-600 mt-1">Manage brand</p>
        </Link>
      </div>
    </div>
  )
}
