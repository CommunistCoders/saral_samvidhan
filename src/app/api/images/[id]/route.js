// src/app/api/images/[id]/route.js
import { getBucket } from '@/lib/dbConnect';
import { ObjectId } from 'mongodb'; // Import ObjectId if using MongoDB ObjectID

export async function GET(req, { params }) {
  const { id } = params;
  try {
    const bucket = await getBucket();
    
    // Use ObjectId for MongoDB ObjectID-based retrieval
    const downloadStream = bucket.openDownloadStream(new ObjectId(id));

    return new Response(downloadStream, {
      headers: {
        'Content-Type': 'image/jpeg',
      },
    });
  } catch (error) {
    console.error('Error retrieving image:', error);
    return new Response('Image not found', { status: 404 });
  }
}
