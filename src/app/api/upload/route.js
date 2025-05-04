import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'
import { prisma } from '@/lib/prisma'  // Ensure Prisma Client is properly set up

export async function POST(req) {
  try {
    // Parse the form data from the request
    const formData = await req.formData()
    const file = formData.get('file')  // The file uploaded
    const departmentId = formData.get('departmentId')  // Department ID

    // Ensure file and departmentId are present
    if (!file || !departmentId) {
      return new Response(
        JSON.stringify({ error: 'File and departmentId are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Convert the file into a buffer to save it to the server
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create a unique filename for the uploaded file
    const filename = `${Date.now()}-${file.name}`
    const filePath = path.join(process.cwd(), 'public', 'uploads', filename)

    // Write the file to the server's local storage
    await writeFile(filePath, buffer)

    // Save file metadata into the Prisma database
    await prisma.document.create({
      data: {
        departmentId,
        fileName: file.name,
        filePath: `/uploads/${filename}`,  // Path to access file publicly
        uploadedAt: new Date(),  // Timestamp of upload
      },
    })

    // Return success response
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Upload error:', error)
    return new Response(
      JSON.stringify({ error: 'Upload failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
