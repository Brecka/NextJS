'use client'
import React from "react"

export default function MomentumTracker({ docs, viewingDoc }) {
  return (
    <div className="flex gap-2 mt-6 mb-2 justify-center">
      {docs.map((doc, i) => (
        <div
          key={doc.id}
          className={`
            w-3 h-3 rounded-full
            ${doc.status === "approved" ? "bg-green-400" : doc.status === "flagged" ? "bg-red-400" : "bg-gray-300"}
            ${viewingDoc && viewingDoc.id === doc.id ? "ring-2 ring-blue-400" : ""}
          `}
          style={{ opacity: viewingDoc && viewingDoc.id === doc.id ? 1 : 0.7 }}
        />
      ))}
    </div>
  )
}
