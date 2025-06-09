'use client'
import React, { useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/esm/Page/AnnotationLayer.css"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

export default function PDFPreview({ file }) {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  return (
    <div className="flex flex-col items-center w-full">
      <Document
        file={file}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading={<div className="text-gray-400">Loading PDF…</div>}
        className="w-full"
      >
        <Page pageNumber={pageNumber} width={500} />
      </Document>
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => setPageNumber(p => Math.max(p - 1, 1))}
          disabled={pageNumber === 1}
          className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
        >Prev</button>
        <span>Page {pageNumber} of {numPages}</span>
        <button
          onClick={() => setPageNumber(p => Math.min(p + 1, numPages))}
          disabled={pageNumber === numPages}
          className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
        >Next</button>
      </div>
    </div>
  )
}
