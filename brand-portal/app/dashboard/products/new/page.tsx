'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAuthState } from '@/lib/auth'
import { createProduct } from '@/lib/db'
import Image from 'next/image'

// Mock upload function
async function uploadToCloudinary(file: File, folder: string) {
  return Promise.resolve({ secure_url: URL.createObjectURL(file) })
}

export default function NewProductPage() {
  const auth = getAuthState()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  })
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const preview = URL.createObjectURL(file)
      setImagePreview(preview)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!auth?.brandId) return

    setLoading(true)
    setError('')

    try {
      let imageUrl: string | undefined

      if (image) {
        const uploadResponse = await uploadToCloudinary(image, `athlete-id-brand/${auth.brandId}`)
        imageUrl = uploadResponse.secure_url
      }

      await createProduct({
        brand_id: auth.brandId,
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        image_url: imageUrl,
      })

      router.push('/dashboard/products')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">📸 Add New Product</h1>
        <p className="text-gray-600 mt-2">Fill in the details and upload an image for your product</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg overflow-hidden">
        {error && (
          <div className="bg-red-50 border-b-2 border-red-200 p-6 text-red-700 font-medium">
            ⚠️ {error}
          </div>
        )}

        <div className="p-8 space-y-8">
          {/* Product Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-4">
              Product Image
            </label>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Upload Area */}
              <div>
                <label htmlFor="image" className="block">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer">
                    <div className="text-center">
                      <div className="text-5xl mb-4">📸</div>
                      <p className="text-gray-900 font-semibold mb-1">Click to upload</p>
                      <p className="text-gray-600 text-sm">or drag and drop</p>
                      <p className="text-gray-500 text-xs mt-2">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                </label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              {/* Image Preview */}
              {imagePreview ? (
                <div className="flex flex-col items-center justify-center">
                  <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null)
                      setImagePreview('')
                    }}
                    className="mt-4 px-4 py-2 bg-red-100 text-red-600 rounded-lg font-medium hover:bg-red-200 transition-colors"
                  >
                    ✕ Remove Image
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center bg-gray-50 rounded-lg h-64">
                  <p className="text-gray-500">No image selected</p>
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Product Details */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-4">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="e.g., Pro Running Shoes"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-4">
              Product Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              placeholder="Describe your product features, benefits, and what makes it special..."
            />
          </div>

          {/* Price and Category Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-4">
                Price ($) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                step="0.01"
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="99.99"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-4">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                <option value="">Select category</option>
                <option value="apparel">Sports Apparel</option>
                <option value="footwear">Footwear</option>
                <option value="equipment">Equipment</option>
                <option value="nutrition">Nutrition & Supplements</option>
                <option value="accessories">Accessories</option>
                <option value="technology">Technology</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="border-t border-gray-200 pt-8 flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-lg"
            >
              {loading ? '⏳ Creating Product...' : '✨ Create Product'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/dashboard/products')}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
