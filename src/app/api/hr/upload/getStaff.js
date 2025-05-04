// pages/api/hr/getStaff.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Fetch all staff from the database
      const staff = await prisma.staff.findMany();
      res.status(200).json(staff);
    } catch (error) {
      console.error('Error fetching staff data:', error);
      res.status(500).json({ error: 'Failed to fetch staff data' });
    }
  } else {
    // Return error for unsupported request methods
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
