import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { mkdirSync, existsSync } from 'fs';
import XLSX from 'xlsx';

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file');
  const metadata = JSON.parse(formData.get('metadata') || '{}');

  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No valid file received' }, { status: 400 });
  }

  try {
    // Create uploads dir if it doesn’t exist
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }

    // Save file to disk
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filePath = path.join(uploadDir, file.name);
    await writeFile(filePath, buffer);

    // ✅ Optionally: parse Excel file
    if (file.name.endsWith('.xlsx')) {
      const workbook = XLSX.read(buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      console.log('📊 Parsed Excel Data:', data);
    }

    console.log('🧾 Metadata received:', metadata);

    return NextResponse.json({ message: '✅ Upload successful!' });
  } catch (error) {
    console.error('❌ Upload failed:', error);
    return NextResponse.json({ error: 'Failed to process file' }, { status: 500 });
  }
}
