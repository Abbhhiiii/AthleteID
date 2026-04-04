'use client'

import { useEffect, useState } from 'react'
import { getAuthState } from '@/lib/auth'
import { dummyProducts, dummyOrders } from '@/lib/dummyData'

export default function TestPage() {
  const [auth, setAuth] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const authState = getAuthState()
    console.log('Auth State:', authState)
    setAuth(authState)
    setLoading(false)
  }, [])

  if (loading) return <div className="p-8">Loading...</div>

  if (!auth) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">❌ No Auth State Found</h1>
        <p className="mb-4">Auth state is null. Please sign in first.</p>
        <a href="/auth/signin" className="text-blue-600 underline">Go to Sign In</a>
      </div>
    )
  }

  const brandProducts = dummyProducts.filter((p) => p.brand === auth.brandName)
  const brandOrders = dummyOrders.filter((o) => o.brand === auth.brandName)
  const allProductBrands = new Set(dummyProducts.map((p) => p.brand))
  const allOrderBrands = new Set(dummyOrders.map((o) => o.brand))

  return (
    <div className="p-8 space-y-8">
      <div className="bg-green-100 border-2 border-green-500 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-green-900 mb-4">✅ Brand Isolation Test</h1>
        
        <div className="space-y-2 mb-6">
          <p><strong>Logged in as:</strong> {auth.brandName}</p>
          <p><strong>Brand ID:</strong> {auth.brandId}</p>
          <p><strong>Email:</strong> {auth.email}</p>
        </div>

        <hr className="my-6" />

        <div className="grid md:grid-cols-2 gap-8">
          {/* Products Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">📦 Products</h2>
            <div className="bg-white p-4 rounded-lg mb-4">
              <p className="text-lg font-semibold text-blue-600">
                Your Products: <span className="text-2xl">{brandProducts.length}</span>
              </p>
            </div>

            <h3 className="font-bold mb-2">Your Products:</h3>
            <div className="bg-blue-50 p-4 rounded-lg max-h-64 overflow-y-auto">
              {brandProducts.length === 0 ? (
                <p className="text-gray-600">No products found</p>
              ) : (
                <ul className="space-y-2">
                  {brandProducts.map((p) => (
                    <li key={p.id} className="bg-white p-2 rounded border border-blue-200">
                      <strong>ID {p.id}:</strong> {p.name} (₹{p.price})
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <h3 className="font-bold mt-4 mb-2">All Products in System:</h3>
            <p className="text-sm text-gray-600 mb-2">Total: {dummyProducts.length}</p>
            <p className="text-sm mb-2">Brands: {Array.from(allProductBrands).join(', ')}</p>
            <div className="space-y-1 text-sm">
              {Array.from(allProductBrands).map((brand) => {
                const count = dummyProducts.filter((p) => p.brand === brand).length
                const isYourBrand = brand === auth.brandName
                return (
                  <p key={brand} className={isYourBrand ? 'font-bold text-blue-600' : 'text-gray-600'}>
                    {brand}: {count} products {isYourBrand ? '(YOUR BRAND)' : ''}
                  </p>
                )
              })}
            </div>
          </div>

          {/* Orders Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">🛒 Orders</h2>
            <div className="bg-white p-4 rounded-lg mb-4">
              <p className="text-lg font-semibold text-green-600">
                Your Orders: <span className="text-2xl">{brandOrders.length}</span>
              </p>
            </div>

            <h3 className="font-bold mb-2">Your Orders:</h3>
            <div className="bg-green-50 p-4 rounded-lg max-h-64 overflow-y-auto">
              {brandOrders.length === 0 ? (
                <p className="text-gray-600">No orders found</p>
              ) : (
                <ul className="space-y-2">
                  {brandOrders.map((o) => (
                    <li key={o.id} className="bg-white p-2 rounded border border-green-200">
                      <strong>{o.id}:</strong> {o.customer} - ₹{o.amount} ({o.status})
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <h3 className="font-bold mt-4 mb-2">All Orders in System:</h3>
            <p className="text-sm text-gray-600 mb-2">Total: {dummyOrders.length}</p>
            <p className="text-sm mb-2">Brands: {Array.from(allOrderBrands).join(', ')}</p>
            <div className="space-y-1 text-sm">
              {Array.from(allOrderBrands).map((brand) => {
                const count = dummyOrders.filter((o) => o.brand === brand).length
                const isYourBrand = brand === auth.brandName
                return (
                  <p key={brand} className={isYourBrand ? 'font-bold text-green-600' : 'text-gray-600'}>
                    {brand}: {count} orders {isYourBrand ? '(YOUR BRAND)' : ''}
                  </p>
                )
              })}
            </div>
          </div>
        </div>

        <hr className="my-6" />

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Verification Check:</h3>
          <ul className="space-y-1 text-sm">
            <li>
              ✅ Filtering by brand name: <code className="bg-white px-2 py-1">{auth.brandName}</code>
            </li>
            <li>
              {brandProducts.some((p) => p.brand !== auth.brandName) ? (
                <span className="text-red-600">❌ Your products list contains OTHER BRANDS!</span>
              ) : (
                <span className="text-green-600">✅ Your products list contains ONLY your brand</span>
              )}
            </li>
            <li>
              {brandOrders.some((o) => o.brand !== auth.brandName) ? (
                <span className="text-red-600">❌ Your orders list contains OTHER BRANDS!</span>
              ) : (
                <span className="text-green-600">✅ Your orders list contains ONLY your brand</span>
              )}
            </li>
          </ul>
        </div>

        <div className="mt-6">
          <a href="/dashboard" className="text-blue-600 underline">← Back to Dashboard</a>
        </div>
      </div>
    </div>
  )
}
