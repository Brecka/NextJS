'use server'

import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function DocumentsPage({ params }) {
  const documents = await prisma.document.findMany({
    where: { departmentId: params.departmentId },
    orderBy: { uploadedAt: 'desc' },
  })

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <h1>Documents for Department {params.departmentId}</h1>

      {documents.length === 0 ? (
        <p>No documents uploaded yet.</p>
      ) : (
        <ul style={{ marginTop: '1rem' }}>
          {documents.map((doc) => (
            <li key={doc.id} style={{ marginBottom: '0.75rem' }}>
              <a href={doc.filePath} target="_blank" rel="noopener noreferrer">
                {doc.fileName}
              </a>
              <span style={{ marginLeft: '1rem', color: '#666' }}>
                Uploaded {new Date(doc.uploadedAt).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: '2rem' }}>
        <Link href={`/departments/${params.departmentId}/upload`}>
          Upload New Document
        </Link>
      </div>
    </div>
  )
}
