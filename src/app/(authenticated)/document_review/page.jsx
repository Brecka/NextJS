"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import OrbitCarousel from "@/components/OrbitCarousel";
import PDFViewer from "@/components/PDFViewer";
import ActionPanel from "@/components/ActionPanel";

const initialDocs = [
  { id: 1, title: "CPR Cert", staff: "Jane Doe", file: "../pdfs/cpr-cert.pdf", status: "pending" },
  { id: 2, title: "Background Check", staff: "John Smith", file: "/pdfs/background-check.pdf", status: "pending" },
  { id: 3, title: "Onboarding", staff: "Ana Rivera", file: "/pdfs/onboarding.pdf", status: "pending" },
  { id: 4, title: "Annual Report", staff: "Lee Johnson", file: "/pdfs/annual-report.pdf", status: "pending" },
  { id: 5, title: "Policy Update", staff: "Chris Evans", file: "/pdfs/policy-update.pdf", status: "pending" },
  { id: 6, title: "Safety Audit", staff: "Maria Gomez", file: "/pdfs/safety-audit.pdf", status: "pending" },
];

export default function OrbitPDFLayout() {
  const [docs, setDocs] = useState(initialDocs);
  const [activeDoc, setActiveDoc] = useState(null);
  const [animatingDoc, setAnimatingDoc] = useState(null);

  const handleSelect = (doc) => setActiveDoc(doc);

  const handleReview = (status) => {
    setAnimatingDoc({ ...activeDoc, status });
    setTimeout(() => {
      setDocs((prev) =>
        prev.map((d) => (d.id === activeDoc.id ? { ...d, status } : d))
      );
      setActiveDoc(null);
      setTimeout(() => setAnimatingDoc(null), 800);
    }, 100);
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Main content layout */}
      <div className="flex justify-center items-start pt-44 px-6 gap-8 relative z-20">
        {/* PDF Viewer Centered */}
        <div className="flex-1 max-w-4xl mx-auto flex justify-center shadow-lg">
          {activeDoc ? (
            <div className="bg-white p-6 rounded-lg shadow-2xl border border-gray-300 max-w-3xl w-full aspect-[8.5/11]">
              <PDFViewer document={activeDoc} />
            </div>
          ) : (
            <div className="text-center text-gray-500 py-32">
              <p>Select a document from the orbit to begin review.</p>
            </div>
          )}
        </div>

        {/* Action Panel */}
        {activeDoc && (
          <div className="w-[250px]">
            <ActionPanel
              document={activeDoc}
              onApprove={() => handleReview("approved")}
              onFlag={() => handleReview("flagged")}
              onClose={() => setActiveDoc(null)}
            />
          </div>
        )}
      </div>

      {/* Orbit Carousel Behind PDF */}
      <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 mt-6 z-0 transition-opacity duration-300 ${activeDoc ? 'opacity-30 blur-sm' : 'opacity-100'}`}>
        <OrbitCarousel 
          docs={docs} 
          activeDoc={activeDoc} 
          onSelect={handleSelect} 
          cardStyle="bg-white p-4 rounded-md shadow-md border border-gray-200 transition-transform duration-300 hover:rotate-1 hover:-translate-y-1 hover:shadow-lg" 
        />
      </div>

      {/* Animate document to stack */}
      {animatingDoc && (
        <motion.div
          key={`anim-${animatingDoc.id}`}
          className="fixed bottom-6 right-6 w-[160px] h-[100px] z-30"
          initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          animate={{ opacity: 0.3, scale: 0.9, x: 20, y: 20 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="bg-white border border-gray-300 rounded-md shadow-md p-4 text-sm text-center">
            <p className="font-semibold">{animatingDoc.title}</p>
            <p className="text-xs text-gray-500">{animatingDoc.staff}</p>
            <p className="text-xs italic">{animatingDoc.status}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
