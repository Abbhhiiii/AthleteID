'use client'

import { useState } from 'react'
import Link from 'next/link'
import { dummyProducts, categories } from '@/lib/dummyData'

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = dummyProducts.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">📦 Products</h1>
          <p className="text-gray-600 mt-2">Manage and organize your product inventory</p>
        </div>
        <Link
          href="/dashboard/products/new"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
        >
          + Add New Product
        </Link>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
        <div>
          <input
            type="text"
            placeholder="Search products by name or brand..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-600">
          Showing {filteredProducts.length} of {dummyProducts.length} products
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center py-16">
            <p className="text-2xl text-gray-600">No products found</p>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:scale-105"
            >
              {/* Product Image */}
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/300x300?text=' + encodeURIComponent(product.name)
                  }}
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ₹{product.price.toLocaleString()}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 space-y-4">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-gray-500 text-sm font-medium">{product.brand}</p>
                      <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{product.name}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                </div>

                {/* Category & Rating */}
                <div className="flex items-center justify-between">
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">⭐</span>
                    <span className="font-semibold text-gray-900">{product.rating}</span>
                    <span className="text-gray-500 text-sm">({product.reviews})</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-gray-200">
                  <Link
                    href={`/dashboard/products/${product.id}/edit`}
                    className="flex-1 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg font-semibold hover:bg-blue-200 transition-colors text-center"
                  >
                    Edit
                  </Link>
                  <button className="flex-1 px-4 py-2 bg-red-100 text-red-600 rounded-lg font-semibold hover:bg-red-200 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
