// src/app/api/compliance/upload/route.js

export async function POST(request) {
  try {
    const data = await request.json();
    console.log('Received data:', data);

    // Here’s where you'd save to your database, S3, etc.
    // Example:
    // await prisma.document.create({ data });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing upload:', error);
    return new Response(JSON.stringify({ error: 'Failed to upload documents' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
