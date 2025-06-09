"use client"

export default function ActionPanel({ document, onApprove, onFlag, onClose }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <h3 className="font-semibold text-gray-800 mb-2">Actions</h3>
      <p className="text-sm text-gray-500 mb-4">Submitted by: {document.staff}</p>

      <div className="flex flex-col gap-3">
        <button
          onClick={onApprove}
          className="bg-green-500 hover:bg-green-600 text-white py-2 rounded"
        >
          Approve
        </button>
        <button
          onClick={onFlag}
          className="bg-red-500 hover:bg-red-600 text-white py-2 rounded"
        >
          Flag
        </button>
        <button
          onClick={onClose}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded"
        >
          Back to Orbit
        </button>
      </div>
    </div>
  )
}
