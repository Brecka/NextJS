// app/api/uploadDocuments/route.js

export async function POST(request) {
    try {
      const data = await request.json();
      console.log('Received data:', data);
  
      // You can now store this data in the database or process it
      // For example, save it to the Prisma database:
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
  