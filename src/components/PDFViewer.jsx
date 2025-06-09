"use client"

import { useState } from "react"
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react"

export default function PDFViewer({ document }) {
  const [zoom, setZoom] = useState(1.0)

  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded shadow p-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg text-gray-800">{document.title}</h2>
        <div className="flex gap-2 items-center">
          <button onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}><ZoomOut className="w-5 h-5" /></button>
          <span className="text-sm">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom(Math.min(2.0, zoom + 0.1))}><ZoomIn className="w-5 h-5" /></button>
          <button onClick={() => setZoom(1.0)}><RotateCcw className="w-5 h-5" /></button>
        </div>
      </div>

      {/* Replace with actual PDF embed if needed */}
      <div className="flex-1 flex items-center justify-center overflow-auto">
        <div
          className="bg-gray-50 border border-dashed border-gray-300 rounded w-full"
          style={{
            height: `${800 * zoom}px`,
            transform: `scale(${zoom})`,
            transformOrigin: "top center"
          }}
        >
          <div className="text-center pt-16 text-gray-500 text-sm">PDF Placeholder</div>
        </div>
      </div>
    </div>
  )
}
