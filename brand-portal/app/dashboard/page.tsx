'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getProducts, getOrders } from '@/lib/db'
import { getAuthState } from '@/lib/auth'

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({
    products: [],
    orders: [],
  })

  useEffect(() => {
    async function fetchData() {
      const auth = getAuthState()
      if (auth?.brandId) {
        try {
          const [products, orders] = await Promise.all([
            getProducts(auth.brandId),
            getOrders(auth.brandId)
          ])
          setData({ products, orders })
        } catch (err) {
          console.error('Failed to fetch dashboard data', err)
        }
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const totalRevenue = data.orders.reduce((acc, order) => {
    // In a real app we'd get the price from the product
    return acc + (order.amount || 0)
  }, 0)

  return (
    <div className="space-y-8 pb-12">
      <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
      <p className="text-gray-600">Welcome back!</p>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-2xl font-bold mb-4">Products ({data.products.length})</h2>
          <p className="text-gray-600">Browse and manage your {data.products.length} products</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-2xl font-bold mb-4">Orders ({data.orders.length})</h2>
          <p className="text-gray-600">Track your {data.orders.length} orders</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-2xl font-bold mb-4">Revenue</h2>
          <p className="text-gray-600">₹{(totalRevenue / 100000).toFixed(1)}L total</p>
        </div>
      </div>

      <div className="flex gap-4">
        <Link href="/dashboard/products" className="flex-1 bg-blue-600 text-white rounded-lg p-4 hover:bg-blue-700 text-center font-bold">
          View Products →
        </Link>
        <Link href="/dashboard/orders" className="flex-1 bg-green-600 text-white rounded-lg p-4 hover:bg-green-700 text-center font-bold">
          View Orders →
        </Link>
      </div>
    </div>
  )
}
