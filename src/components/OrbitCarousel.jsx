"use client"

import { motion } from "framer-motion"

export default function OrbitCarousel({ docs, activeDoc, onSelect }) {
  const radius = 220
  const centerX = 0
  const centerY = 0

  return (
    <div className="relative w-[500px] h-[500px]">
      {docs.map((doc, i) => {
        const angle = (360 / docs.length) * i
        const radians = (angle * Math.PI) / 180
        const x = centerX + radius * Math.cos(radians)
        const y = centerY + radius * Math.sin(radians)

        const isActive = activeDoc?.id === doc.id

        return (
          <motion.div
            key={doc.id}
            className={`absolute w-20 h-20 rounded-lg shadow-md flex items-center justify-center text-center cursor-pointer text-sm font-semibold transition
              ${isActive ? "bg-blue-600 text-white scale-110 z-20" : "bg-white text-gray-700 z-10"}
            `}
            style={{
              left: `calc(50% + ${x}px - 40px)`,
              top: `calc(50% + ${y}px - 40px)`,
            }}
            onClick={() => onSelect(doc)}
            whileHover={{ scale: 1.1 }}
          >
            {doc.title}
          </motion.div>
        )
      })}
    </div>
  )
}
