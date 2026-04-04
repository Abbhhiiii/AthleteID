'use client'

import { useState } from 'react'

interface BrandRequest {
  id: number
  brandName: string
  email: string
  status: 'Pending' | 'Approved'
}

export default function AdminPage() {
  const [requests] = useState<BrandRequest[]>([
    { id: 1, brandName: 'Elite Sports', email: 'elite@sports.com', status: 'Pending' },
    { id: 2, brandName: 'Court Kings', email: 'court@kings.com', status: 'Approved' },
  ])

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">⚙️ Admin Panel</h1>
        <p className="text-gray-600 mt-2">Manage brand requests and approvals</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Brand Requests</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Brand Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900 font-medium">{request.brandName}</td>
                  <td className="py-3 px-4 text-gray-600">{request.email}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        request.status === 'Approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
