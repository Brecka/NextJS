"use client"

import React from "react"
import { motion } from "framer-motion"
import PDFPreview from "./PDFPreview"

export default function DocumentReviewPanel({ doc, onApprove, onFlag, onBack }) {
  return (
    <motion.div
      key={doc.id}
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      transition={{ type: "spring", stiffness: 110 }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-5xl z-20"
    >
      <motion.div
        layoutId={`doc-card-${doc.id}`}
        className="bg-white rounded-lg shadow-xl p-6"
      >
        <div className="font-bold text-lg mb-2">{doc.title}</div>
        <PDFPreview file={doc.file} />
        <div className="flex gap-4 mt-6 justify-center">
          <button
            onClick={onApprove}
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Approve
          </button>
          <button
            onClick={onFlag}
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Flag
          </button>
          <button
            onClick={onBack}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Back to Orbit
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
